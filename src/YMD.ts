export type YMDFormatter = (ymd: YMD) => string;

type DefaultYMDFormatKey = "YMD" | "MDY" | "MDY_NO_PAD" | "LONG";

export const DefaultYMDFormatters: Record<DefaultYMDFormatKey, YMDFormatter> = {
    YMD: (ymd) => {
        const {y, m, d} = ymd;
        return [y, m, d].map(v => `${v}`.padStart(2, "0")).join("-");
    },
    MDY: (ymd) => {
        const {y, m, d} = ymd;
        return [m, d, y].map(v => `${v}`.padStart(2, "0")).join("/");
    },
    MDY_NO_PAD: (ymd) => {
        const {y, m, d} = ymd;
        return [m, d, y].map(v => `${v}`).join("/");
    },
    LONG: (ymd) => {
        const utcString = ymd.toDate().toUTCString();
        return utcString.substring(0, utcString.indexOf("00:") - 1);
    }
}

const YMD_STRING_PATTERN = /^[1-2][0-9]{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/;
const ERR_BAD_YMD_STRING = "Bad YMD string format.";

// something which can be passed into the YMD constructor
export type YMDConstructable = string | { y: number, m: number, d: number };

export class YMD {
    public y: number = 1970;
    public m: number = 1;
    public d: number = 1;

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
    constructor(ymd?: YMDConstructable) {
        if (ymd == null) return;
        if (typeof ymd == "string") {
            this.setFromString(ymd);
        }
        else {
            const {y, m, d} = ymd;
            Object.assign(this, {y, m, d});
        }
    }

    /** 
     * converts the YMD to a string
     * (default format is like "2020-01-31")
     */
    toString(formatKey: DefaultYMDFormatKey = "YMD"): string {
        return DefaultYMDFormatters[formatKey](this);
    }

    /**
     * @param date some Date object
     * @param utc set false if you want to create Date at midnight local time instead of UTC
     */
    toDate(utc: boolean = true): Date {
        const iso = `${this.toString()}T00:00Z`;
        if (utc) return new Date(iso);
        return new Date(iso.substring(0, iso.length-1));
    }

    /**
     * set values from a string formatted like "2020-01-31"
     */
    setFromString(ymdString: string) {
        if (!YMD_STRING_PATTERN.test(ymdString)) {
            throw new Error(ERR_BAD_YMD_STRING);
        }
        const [y,m,d] = ymdString.split("-").map(v => parseInt(v));
        Object.assign(this, {y, m, d});
    }

    /**
     * set values from a vanilla js Date object
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    setFromDate(date: Date, utc: boolean = true) {
        if (utc) {
            this.setFromString(date.toISOString().split("T")[0]);
            return;
        }
        this.y = date.getFullYear();
        this.m = date.getMonth() + 1;
        this.d = date.getDate();
    }

    /**
     * create a YMD object from a vanilla js Date object
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    static fromDate(date: Date, utc: boolean = true): YMD {
        const ymd = new YMD();
        ymd.setFromDate(date, utc);
        return ymd;
    }

    /**
     * create a YMD object from a string formatted like "2020-01-31"
     */
    static fromString(ymdString: string): YMD {
        const ymd = new YMD();
        ymd.setFromString(ymdString);
        return ymd;
    }

    /**
     * @param utc set false if you want to use the local date instead of UTC date
     */
    static today(utc: boolean = true) {
        return YMD.fromDate(new Date(), utc);
    }

    static getDefaultFormatter(key: DefaultYMDFormatKey): YMDFormatter {
        return DefaultYMDFormatters[key];
    }
}
