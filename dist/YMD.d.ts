export declare enum DateFormatStyle {
    YMD = 0,
    DMY = 1,
    DMY_NO_PAD = 2,
    LONG = 3
}
export declare type YMDFormatter = (ymd: YMD) => string;
declare type DefaultYMDFormatKey = "MDY" | "MDY_NO_PAD" | "LONG";
export declare const DefaultYMDFormatters: Record<DefaultYMDFormatKey, YMDFormatter>;
/** work with just a date without having to think about timezones (and without the bulk of momentjs) */
export declare class YMD {
    ymdString: string;
    /**
     * @param ymdString date string formatted like "1999-12-31"
     */
    constructor(ymdString: string);
    toDate(): Date;
    static fromDate(date: Date): YMD;
    static getDefaultFormatter(key: DefaultYMDFormatKey): YMDFormatter;
}
export {};
