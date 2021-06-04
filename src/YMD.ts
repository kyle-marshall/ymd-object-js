
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

/** work with just a date without having to think about timezones (and without the bulk of momentjs) */
export class YMD {
    public y: number = 1970;
    public m: number = 1;
    public d: number = 1;
    constructor(ymd: string | {y: number, m: number, d: number}) {
        if (ymd == null) return;
        if (typeof ymd == "string") {
            if (!YMD_STRING_PATTERN.test(ymd)) {
                throw new Error(ERR_BAD_YMD_STRING);
            }
            const [y,m,d] = ymd.split("-").map(v => parseInt(v));
            Object.assign(this, {y, m, d});
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
