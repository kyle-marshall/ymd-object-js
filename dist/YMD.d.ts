export declare type YMDFormatter = (ymd: YMD) => string;
declare type DefaultYMDFormatKey = "YMD" | "MDY" | "MDY_NO_PAD" | "LONG";
export declare const DefaultYMDFormatters: Record<DefaultYMDFormatKey, YMDFormatter>;
export declare class YMD {
    y: number;
    m: number;
    d: number;
    constructor(ymd: string | {
        y: number;
        m: number;
        d: number;
    });
    toString(formatKey?: DefaultYMDFormatKey): string;
    toDate(): Date;
    static fromDate(date: Date): YMD;
    static getDefaultFormatter(key: DefaultYMDFormatKey): YMDFormatter;
}
export {};
