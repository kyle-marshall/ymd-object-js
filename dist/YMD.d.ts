export declare type YMDFormatter = (ymd: YMD) => string;
declare type DefaultYMDFormatKey = "YMD" | "MDY" | "MDY_NO_PAD" | "LONG";
export declare const DefaultYMDFormatters: Record<DefaultYMDFormatKey, YMDFormatter>;
export declare type YMDConstructable = string | {
    y: number;
    m: number;
    d: number;
};
export declare class YMD {
    y: number;
    m: number;
    d: number;
    /**
     * construct a YMD using a string like "2020-01-31"
     * or an object like {y: 2020, m: 1, d: 31 }
     *
     * Defaults to 1970-01-01
     *
     * If you want to get today's date or create from a vanilla js Date,
     * use static methods `today()` or `fromDate(date: Date, utc?: boolean)` instead
     * @param ymd
     * @returns
     */
    constructor(ymd?: YMDConstructable);
    /**
     * converts the YMD to a string
     * (default format is like "2020-01-31")
     */
    toString(formatKey?: DefaultYMDFormatKey): string;
    /**
     * @param date some Date object
     * @param utc set false if you want to create Date at midnight local time instead of UTC
     */
    toDate(utc?: boolean): Date;
    /**
     * set values from a string formatted like "2020-01-31"
     */
    setFromString(ymdString: string): void;
    /**
     * set values from a vanilla js Date object
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    setFromDate(date: Date, utc?: boolean): void;
    /**
     * create a YMD object from a vanilla js Date object
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    static fromDate(date: Date, utc?: boolean): YMD;
    /**
     * create a YMD object from a string formatted like "2020-01-31"
     */
    static fromString(ymdString: string): YMD;
    /**
     * @param utc set false if you want to use the local date instead of UTC date
     */
    static today(utc?: boolean): YMD;
    static getDefaultFormatter(key: DefaultYMDFormatKey): YMDFormatter;
}
export {};
