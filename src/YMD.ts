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


/** work with just a date without having to think about timezones (and without the bulk of momentjs) */
export class YMD {
    public y: number = 1970;
    public m: number = 1;
    public d: number = 1;
    constructor(ymd: string | {y: number, m: number, d: number}) {
        if (ymd == null) return;
        if (typeof ymd == "string") {
            if (ymd.length === 10) {
                const [y, m, d] = ymd.split("-").map(v => parseInt(v));
                Object.assign(this, {y, m, d});
            }
        }
        else {
            Object.assign(this, ymd);
        }
    }

    toString(formatKey: DefaultYMDFormatKey = "YMD") {
        return DefaultYMDFormatters[formatKey](this);
    }

    toDate() {
        return new Date(`${this.toString()}T00:00Z`);
    }

    static fromDate(date: Date) {
        return new YMD(date.toISOString().split("T")[0]);
    }

    static getDefaultFormatter(key: DefaultYMDFormatKey) {
        return DefaultYMDFormatters[key];
    }
}
