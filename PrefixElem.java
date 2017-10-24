import org.antlr.v4.runtime.ParserRuleContext;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class PrefixElem {
    public String code;
    public String accessor;
    public Instance type;
    public String functionCallParams;
    public boolean isOptional;
    public PrefixElem(String code, String accessor, Instance type, String functionCallParams) { this.code = code; this.accessor = accessor; this.type = type; this.functionCallParams = functionCallParams; this.isOptional = false; }

    static public PrefixElem get(ParserRuleContext rChild, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, ArrayList<ParserRuleContext> chain, int chainPos, Instance lType, Instance rType, Visitor visitor) {

        if(chainPos == 0 && WalkerUtil.isDirectDescendant(SwiftParser.Parenthesized_expressionContext.class, rChild)) {
            if(isTuple(rChild)) {
                return getTuple(rChild, visitor, rType);
            }
            else {
                Expression parenthesized = new Expression(((SwiftParser.Primary_expressionContext) rChild).parenthesized_expression().expression_element_list().expression_element(0).expression(), rType, visitor);
                return new PrefixElem("(" + parenthesized.code + ")", "", parenthesized.type, null);
            }
        }
        if(chainPos == 0 && WalkerUtil.isDirectDescendant(SwiftParser.Array_literalContext.class, rChild)) {
            return getArray(rChild, rType, functionCallParams, visitor);
        }
        if(chainPos == 0 && WalkerUtil.isDirectDescendant(SwiftParser.Dictionary_literalContext.class, rChild)) {
            return getDictionary(rChild, rType, functionCallParams, visitor);
        }
        if(chainPos == 0 && rChild instanceof SwiftParser.Primary_expressionContext && ((SwiftParser.Primary_expressionContext) rChild).generic_argument_clause() != null) {
            return getTemplatedConstructor(rChild, rType, functionCallParams, visitor);
        }
        if(chainPos == 0 && WalkerUtil.isDirectDescendant(SwiftParser.LiteralContext.class, rChild)) {
            return getLiteral(rChild, rType, visitor);
        }
        if(chainPos == 0 && WalkerUtil.isDirectDescendant(SwiftParser.Closure_expressionContext.class, rChild)) {
            return getClosure(rChild, rType, functionCallParams, visitor);
        }
        return getBasic(rChild, functionCallParams, chain, chainPos, lType, rType, visitor);
    }

    static private boolean isTuple(ParserRuleContext rChild) {
        SwiftParser.Expression_element_listContext tupleLiteral = ((SwiftParser.Primary_expressionContext) rChild).parenthesized_expression().expression_element_list();
        List<SwiftParser.Expression_elementContext> elementList = tupleLiteral.expression_element();
        if(elementList.size() <= 1) return false;
        return true;
    }
    static public PrefixElem getTuple(ParserRuleContext rChild, Visitor visitor, Instance type) {
        SwiftParser.Expression_element_listContext tupleLiteral = ((SwiftParser.Primary_expressionContext) rChild).parenthesized_expression().expression_element_list();
        List<SwiftParser.Expression_elementContext> elementList = tupleLiteral.expression_element();
        LinkedHashMap<String, Instance> types = new LinkedHashMap<String, Instance>();

        ArrayList<String> keys = null;
        keys = new ArrayList<String>(((ClassDefinition)type.definition()).properties.keySet());

        for(int i = 0, elementI = 0; i < tupleLiteral.getChildCount(); i++) {
            if(!(tupleLiteral.getChild(i) instanceof SwiftParser.Expression_elementContext)) continue;
            SwiftParser.Expression_elementContext child = (SwiftParser.Expression_elementContext) tupleLiteral.getChild(i);
            String index = child.identifier() != null ? child.identifier().getText() : Integer.toString(elementI);
            if(type == null) types.put(index, Type.infer(child.expression(), visitor));
            elementI++;
        }

        if(type == null) {
            ClassDefinition tupleDefinition = new ClassDefinition(null, null, types, new ArrayList<String>());
            type = new Instance(tupleDefinition);
        }
        String code = getTupleCode(keys, elementList, type, visitor);

        return new PrefixElem(code, "", type, null);
    }
    static public String getTupleCode(ArrayList<String> keys, List<SwiftParser.Expression_elementContext> elementList, Instance type, Visitor visitor) {
        String code = "";
        if(visitor.targetLanguage.equals("ts")) {
            code += "{";
            for(int i = 0; i < elementList.size(); i++) {
                String key = keys != null ? keys.get(i) : elementList.get(i).identifier() != null ? elementList.get(i).identifier().getText() : i + "";
                String val = visitor.visit(elementList.get(i).expression());
                if(i > 0) code += ",";
                code += "'" + key + "':" + val;
            }
            code += "}";
        }
        else {
            code += "new InitializableHashMap<String, Object>(";
            for(int i = 0; i < elementList.size(); i++) {
                String key = keys != null ? keys.get(i) : elementList.get(i).identifier() != null ? elementList.get(i).identifier().getText() : i + "";
                String val = visitor.visit(elementList.get(i).expression());
                if(i > 0) code += ",";
                code += "new Pair<String, " + type.getProperty(key).targetType(visitor.targetLanguage) + ">(\"" + key + "\", " + val + ")";
            }
            code += ")";
        }
        return code;
    }

    static private PrefixElem getArray(ParserRuleContext rChild, Instance type, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, Visitor visitor) {

        SwiftParser.Array_literalContext arrayLiteral = ((SwiftParser.Primary_expressionContext) rChild).literal_expression().array_literal();

        if(arrayLiteral.array_literal_items() != null && type == null) {
            SwiftParser.ExpressionContext wrappedExpression = arrayLiteral.array_literal_items().array_literal_item(0).expression();
            Instance wrappedType = functionCallParams != null ? new Instance(wrappedExpression.getText()) : Type.infer(wrappedExpression, visitor);
            type = new Instance("Array");
            type.generics = new ArrayList<Instance>();
            type.generics.add(wrappedType);
        }

        String code = getArrayCode(arrayLiteral, rChild, type, functionCallParams, visitor);

        return new PrefixElem(code, "", type, null);
    }

    static private String getArrayCode(SwiftParser.Array_literalContext arrayLiteral, ParserRuleContext rChild, Instance type, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, Visitor visitor) {

        String repeatedElement = null, arraySize = "";
        if(functionCallParams != null) {
            if(functionCallParams.size() == 2 && functionCallParams.get(0) instanceof SwiftParser.Expression_elementContext && ((SwiftParser.Expression_elementContext) functionCallParams.get(0)).identifier().getText().equals("repeating") && functionCallParams.get(1) instanceof SwiftParser.Expression_elementContext && ((SwiftParser.Expression_elementContext) functionCallParams.get(1)).identifier().getText().equals("count")) {
                arraySize = visitor.visit(((SwiftParser.Expression_elementContext) functionCallParams.get(1)).expression());
                repeatedElement = visitor.visit(((SwiftParser.Expression_elementContext) functionCallParams.get(0)).expression());
            }
        }

        if(visitor.targetLanguage.equals("ts")) {
            if(functionCallParams != null) {
                return "new Array(" + arraySize + ")" + (repeatedElement != null ? ".fill(" + repeatedElement + ")" : "");
            }
            else {
                String code = visitor.visit(rChild);
                if(type != null && type.uniqueId().equals("Set")) code = "new Set(" + code + ")";
                return code;
            }
        }
        else {
            if(functionCallParams != null) {
                if(repeatedElement != null) {
                    return "new " + type.targetType(visitor.targetLanguage, true, false) + "(Collections.nCopies(" + arraySize + ", " + repeatedElement + "))";
                }
                return "new " + type.targetType(visitor.targetLanguage, true, false) + "(" + arraySize + ")";
            }
            else if(arrayLiteral.array_literal_items() != null) {
                List<SwiftParser.Array_literal_itemContext> values = arrayLiteral.array_literal_items().array_literal_item();
                String valuesList = "";
                for(int i = 0; i < values.size(); i++) {
                    valuesList += (i > 0 ? ", " : "") + values.get(i).getText();
                }
                return "new " + type.targetType(visitor.targetLanguage, true, false) + "(Arrays.asList(" + valuesList + "))";
            }
            else {
                return "new " + type.targetType(visitor.targetLanguage, true, false) + "()";
            }
        }
    }

    static private PrefixElem getDictionary(ParserRuleContext rChild, Instance type, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, Visitor visitor) {

        SwiftParser.Dictionary_literalContext dictionaryLiteral = ((SwiftParser.Primary_expressionContext) rChild).literal_expression().dictionary_literal();
        String code;

        if(WalkerUtil.isDirectDescendant(SwiftParser.Empty_dictionary_literalContext.class, dictionaryLiteral)) {
            code = visitor.targetLanguage.equals("ts") ? "{}" : "new " + type.targetType(visitor.targetLanguage, true, false) + "()";
        }
        else {
            List<SwiftParser.ExpressionContext> keyVal = dictionaryLiteral.dictionary_literal_items().dictionary_literal_item(0).expression();
            if(type == null) {
                type = new Instance("Dictionary");
                type.generics = new ArrayList<Instance>();
                type.generics.add(Type.infer(keyVal.get(0), visitor));
                type.generics.add(Type.infer(keyVal.get(1), visitor));
            }
            code = getDictionaryInitializerCode(dictionaryLiteral, type, visitor);
        }

        return new PrefixElem(code, "", type, null);
    }

    static private String getDictionaryInitializerCode(SwiftParser.Dictionary_literalContext dictionaryLiteral, Instance dictionaryType, Visitor visitor) {
        if(visitor.targetLanguage.equals("ts")) {
            return '{' + visitor.visitWithoutStrings(dictionaryLiteral, "[]") + '}';
        }
        else {
            String diamond = dictionaryType.generics.get(0).targetType(visitor.targetLanguage) + ", " + dictionaryType.generics.get(1).targetType(visitor.targetLanguage);
            String code = "new " + dictionaryType.targetType(visitor.targetLanguage, true, false) + "(";
            List<SwiftParser.Dictionary_literal_itemContext> items = dictionaryLiteral.dictionary_literal_items().dictionary_literal_item();
            for(int i = 0; i < items.size(); i++) {
                code += (i > 0 ? ", " : "") + "new Pair<" + diamond + ">(" + visitor.visitChildren(items.get(i).expression(0)) + ", " + visitor.visitChildren(items.get(i).expression(1)) + ")";
            }
            code += ")";
            return code;
        }
    }

    static private PrefixElem getTemplatedConstructor(ParserRuleContext rChild, Instance type, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, Visitor visitor) {

        SwiftParser.Generic_argument_clauseContext template = ((SwiftParser.Primary_expressionContext) rChild).generic_argument_clause();
        String typeStr = visitor.visit(rChild.getChild(0)).trim();

        if(typeStr.equals("Set")) {
            if(type == null) {
                type = new Instance("Set");
                type.generics = new ArrayList<Instance>();
                type.generics.add(new Instance(template.generic_argument_list().generic_argument(0).getText()));
            }
            return new PrefixElem(visitor.targetLanguage.equals("ts") ? "new Set()" : "new " + type.targetType(visitor.targetLanguage, true, false) + "()", "", type, null);
        }

        return null;
    }

    static private PrefixElem getLiteral(ParserRuleContext rChild, Instance type, Visitor visitor) {
        String code = visitor.visit(rChild);
        if(WalkerUtil.isDirectDescendant(SwiftParser.Nil_literalContext.class, rChild)) {
            type = new Instance("Void");
            code = "null ";
        }
        else {
            if(WalkerUtil.isDirectDescendant(SwiftParser.Integer_literalContext.class, rChild)) type = new Instance("Int");
            else if(WalkerUtil.isDirectDescendant(SwiftParser.Numeric_literalContext.class, rChild)) type = new Instance("Double");
            else if(WalkerUtil.isDirectDescendant(SwiftParser.String_literalContext.class, rChild)) type = new Instance("String");
            else if(WalkerUtil.isDirectDescendant(SwiftParser.Boolean_literalContext.class, rChild)) type = new Instance("Bool");
        }
        return new PrefixElem(code, "", type, null);
    }

    static private PrefixElem getClosure(ParserRuleContext rChild, Instance type, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, Visitor visitor) {
        return new PrefixElem(FunctionUtil.closureExpression(((SwiftParser.Primary_expressionContext) rChild).closure_expression(), type, functionCallParams, visitor), "", type, null);
    }

    static private PrefixElem getBasic(ParserRuleContext rChild, List<ParserRuleContext/*Expression_elementContext or Closure_expressionContext*/> functionCallParams, ArrayList<ParserRuleContext> chain, int chainPos, Instance lType, Instance rType, Visitor visitor) {
        String code = null, accessor = ".", functionCallParamsStr = null;
        Instance type = null;
        if(rChild instanceof SwiftParser.Explicit_member_expressionContext) {
            code = ((SwiftParser.Explicit_member_expressionContext) rChild).identifier().getText();
            accessor = ".";
        }
        else if(rChild instanceof SwiftParser.Primary_expressionContext) {
            code = ((SwiftParser.Primary_expressionContext) rChild).identifier() != null ? ((SwiftParser.Primary_expressionContext) rChild).identifier().getText() : visitor.visit(rChild);
            accessor = ".";
        }
        else if(rChild instanceof SwiftParser.Initializer_expressionContext) {
            code = "init";
            accessor = ".";
        }
        else if(rChild instanceof SwiftParser.Subscript_expressionContext) {
            code = visitor.visit(((SwiftParser.Subscript_expressionContext) rChild).expression_list());
            accessor = "[]";
        }
        else if(rChild instanceof SwiftParser.Explicit_member_expression_numberContext) {
            code = visitor.visitWithoutStrings(rChild, "?.");
            accessor = "[]";
        }
        else if(rChild instanceof SwiftParser.Explicit_member_expression_number_doubleContext) {
            String[] split = visitor.visit(rChild).split("\\.");
            int pos = 1, i = chainPos;
            while(i > 0 && chain.get(i - 1) instanceof SwiftParser.Explicit_member_expression_number_doubleContext) {i--; pos = pos == 1 ? 2 : 1;}
            code = split[pos].replaceAll("\\?", "");
            accessor = "[]";
        }
        else {
            code = visitor.visit(rChild);
        }

        if(visitor.targetLanguage.equals("java") && lType != null && (lType.uniqueId().equals("Array") || lType.uniqueId().equals("Dictionary") || lType.uniqueId().equals("Tuple"))) {
            if(lType.uniqueId().equals("Tuple")) {
                accessor = "((" + lType.getProperty(code.trim()).targetType(visitor.targetLanguage) + ")).get(\"\")";
            }
            else {
                accessor = ".get()";
            }
        }

        if(functionCallParams != null) {
            EntityCache.CacheBlockAndObject classDefinition = visitor.cache.find(code, rChild);
            boolean isInitializer = lType == null && classDefinition != null && classDefinition.object instanceof ClassDefinition;
            functionCallParamsStr = "";

            String augment = FunctionUtil.augmentFromCall(code, functionCallParams, rChild, isInitializer ? (ClassDefinition)classDefinition.object : lType != null && lType.definition() instanceof ClassDefinition ? (ClassDefinition)lType.definition() : null, isInitializer, visitor);
            if(isInitializer) {
                functionCallParamsStr += '"' + (augment == null ? "" : augment) + '"';
            }
            else {
                code += augment;
            }

            for(int i = 0; i < functionCallParams.size(); i++) {
                functionCallParamsStr += (functionCallParamsStr.length() > 0 ? ", " : "") + visitor.visit(functionCallParams.get(i));
            }
        }
        else if(rType instanceof FunctionDefinition) {
            code += FunctionUtil.augmentFromCall(code, (FunctionDefinition) rType, rChild, visitor);
        }

        if(type == null) {
            String varName = code.trim();
            Object/*Instance/Definition*/ instanceOrDefinition;
            if(lType == null) {
                EntityCache.CacheBlockAndObject cache = visitor.cache.findLoose(varName, chain.get(0));
                instanceOrDefinition = cache.object;
                if(EntityCache.isStructureBlock(cache.block)) {
                    code = "this." + code;
                }
                else if(varName.equals("self")) {
                    code = "this";
                }
            }
            else {
                instanceOrDefinition = lType.getProperty(varName);
            }
            if(functionCallParams != null) {
                if(instanceOrDefinition instanceof FunctionDefinition) type = ((FunctionDefinition)instanceOrDefinition).result;
                else {
                    type = new Instance((Definition)instanceOrDefinition);
                }
            }
            else type = (Instance)instanceOrDefinition;
        }

        if(WalkerUtil.isDirectDescendant(SwiftParser.Implicit_parameterContext.class, rChild)) {
            code = "arguments[" + code.substring(1) + "]";
        }

        return new PrefixElem(code, accessor, type, functionCallParamsStr);
    }
}
