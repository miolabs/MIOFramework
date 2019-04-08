import { NSObject } from "./NSObject";
export declare class NSLocale extends NSObject {
    languageIdentifier: string;
    countryIdentifier: string;
    static currentLocale(): any;
    static _setCurrentLocale(localeIdentifier: string): void;
    initWithLocaleIdentifier(identifer: string): void;
    readonly decimalSeparator: string;
    readonly currencySymbol: string;
    readonly currencyCode: string;
    readonly groupingSeparator: string;
}
