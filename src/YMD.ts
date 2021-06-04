export enum DateFormatStyle {
    // e.g. "2000-01-31"
    YMD,
    // e.g. "01/31/2000"
    DMY,
    // e.g. "1/31/2000"
    DMY_NO_PAD,
    // e.g. "Mon, 31 Jan 2000"
    LONG
}

const unPad = (digits: string) => digits.replace(/^0*/, "");

export type YMDFormatter = (ymd: YMD) => string;

type DefaultYMDFormatKey = "MDY" | "MDY_NO_PAD" | "LONG";

export const DefaultYMDFormatters: Record<DefaultYMDFormatKey, YMDFormatter> = {
    MDY: (ymd) => {
        const [y, m, d] = ymd.ymdString.split("-");
        return [m, d, y].join("/")
    },
    MDY_NO_PAD: (ymd) => {
        const [y, m, d] = ymd.ymdString.split("-");
        return [m, d, y].map(v => unPad(v)).join("/")
    },
    LONG: (ymd) => {
        const utcString = ymd.toDate().toUTCString();
        return utcString.substring(0, utcString.indexOf("00:") - 1);
    }
}


/** work with just a date without having to think about timezones (and without the bulk of momentjs) */
export class YMD {
    /**
     * @param ymdString date string formatted like "1999-12-31"
     */
    constructor(public ymdString: string) {}

    toDate() {
        return new Date(`${this.ymdString}T00:00Z`);
    }

    static fromDate(date: Date) {
        return new YMD(date.toISOString().split("T")[0]);
    }

    static getDefaultFormatter(key: DefaultYMDFormatKey) {
        return DefaultYMDFormatters[key];
    }
}
