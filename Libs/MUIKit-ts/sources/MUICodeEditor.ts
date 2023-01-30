
import { UIView } from "./UIView";
import { UICoreLayerAddStyle } from "./MIOUI_CoreLayer";

import * as ace from 'brace';
import 'brace/mode/javascript';
import 'brace/mode/sql';
import 'brace/mode/php';
import 'brace/mode/python';
import 'brace/mode/swift';
import 'brace/mode/typescript';
import 'brace/theme/monokai';
import 'brace/theme/xcode';

export enum UICodeEditorLanguage {
    None,
    SQL,
    Javascript,    
    PHP,
    Swift,
    Python,
    TypeScript
}

export class UICodeEditor extends UIView 
{
    private editorView:UIView = null;
    private editor = null;

    initWithLayer(layer, owner, options?) {
        super.initWithLayer(layer, owner, options);
    
        this.editorView = new UIView();
        this.editorView.init();
        UICoreLayerAddStyle(this.editorView.layer, "view");
        this.editorView.layer.style.position = "absolute";
        this.addSubview(this.editorView);

        this.editor = ace.edit(this.editorView.layer);
        this.editor.setTheme("ace/theme/xcode");    
        this.editor.$blockScrolling = Infinity;
    }    

    layoutSubviews(){
        this.editor.resize();
    }

    set text(value){
        this.editor.setValue(value);
        this.editor.clearSelection();
    }

    get text(){
        return this.editor.getValue();
    }

    set language(value:UICodeEditorLanguage){

        switch (value){
            case UICodeEditorLanguage.SQL:
                this.editor.session.setMode("ace/mode/sql");
                break;

            case UICodeEditorLanguage.Javascript:
                this.editor.session.setMode("ace/mode/javascript");
                break;

            case UICodeEditorLanguage.PHP:
                this.editor.session.setMode("ace/mode/php");
                break;

            case UICodeEditorLanguage.Python:
                this.editor.session.setMode("ace/mode/python");
                break;

            case UICodeEditorLanguage.Swift:
                this.editor.session.setMode("ace/mode/swift");
                break;

            case UICodeEditorLanguage.TypeScript:
                this.editor.session.setMode("ace/mode/typescript");
                break;

            default:
                this.editor.session.setMode("ace/mode/plain_text");
                break;
        }
    }

}