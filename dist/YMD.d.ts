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
    /**
     * @param date some Date object
     * @param utc set false if you want to create Date at midnight local time instead of UTC
     */
    toDate(utc?: boolean): Date;
    /**
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    static fromDate(date: Date, utc?: boolean): YMD;
    static getDefaultFormatter(key: DefaultYMDFormatKey): YMDFormatter;
}
export {};
