"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YMD = exports.DefaultYMDFormatters = void 0;
exports.DefaultYMDFormatters = {
    YMD: function (ymd) {
        var y = ymd.y, m = ymd.m, d = ymd.d;
        return [y, m, d].map(function (v) { return ("" + v).padStart(2, "0"); }).join("-");
    },
    MDY: function (ymd) {
        var y = ymd.y, m = ymd.m, d = ymd.d;
        return [m, d, y].map(function (v) { return ("" + v).padStart(2, "0"); }).join("/");
    },
    MDY_NO_PAD: function (ymd) {
        var y = ymd.y, m = ymd.m, d = ymd.d;
        return [m, d, y].map(function (v) { return "" + v; }).join("/");
    },
    LONG: function (ymd) {
        var utcString = ymd.toDate().toUTCString();
        return utcString.substring(0, utcString.indexOf("00:") - 1);
    }
};
var YMD_STRING_PATTERN = /^[1-2][0-9]{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1]))$/;
var ERR_BAD_YMD_STRING = "Bad YMD string format.";
var YMD = /** @class */ (function () {
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
    function YMD(ymd) {
        this.y = 1970;
        this.m = 1;
        this.d = 1;
        if (ymd == null)
            return;
        if (typeof ymd == "string") {
            this.setFromString(ymd);
        }
        else {
            var y = ymd.y, m = ymd.m, d = ymd.d;
            Object.assign(this, { y: y, m: m, d: d });
        }
    }
    /**
     * converts the YMD to a string
     * (default format is like "2020-01-31")
     */
    YMD.prototype.toString = function (formatKey) {
        if (formatKey === void 0) { formatKey = "YMD"; }
        return exports.DefaultYMDFormatters[formatKey](this);
    };
    /**
     * @param date some Date object
     * @param utc set false if you want to create Date at midnight local time instead of UTC
     */
    YMD.prototype.toDate = function (utc) {
        if (utc === void 0) { utc = true; }
        var iso = this.toString() + "T00:00Z";
        if (utc)
            return new Date(iso);
        return new Date(iso.substring(0, iso.length - 1));
    };
    /**
     * set values from a string formatted like "2020-01-31"
     */
    YMD.prototype.setFromString = function (ymdString) {
        if (!YMD_STRING_PATTERN.test(ymdString)) {
            throw new Error(ERR_BAD_YMD_STRING);
        }
        var _a = ymdString.split("-").map(function (v) { return parseInt(v); }), y = _a[0], m = _a[1], d = _a[2];
        Object.assign(this, { y: y, m: m, d: d });
    };
    /**
     * set values from a vanilla js Date object
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    YMD.prototype.setFromDate = function (date, utc) {
        if (utc === void 0) { utc = true; }
        if (utc) {
            this.setFromString(date.toISOString().split("T")[0]);
            return;
        }
        this.y = date.getFullYear();
        this.m = date.getMonth() + 1;
        this.d = date.getDate();
    };
    /**
     * create a YMD object from a vanilla js Date object
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    YMD.fromDate = function (date, utc) {
        if (utc === void 0) { utc = true; }
        var ymd = new YMD();
        ymd.setFromDate(date, utc);
        return ymd;
    };
    /**
     * create a YMD object from a string formatted like "2020-01-31"
     */
    YMD.fromString = function (ymdString) {
        var ymd = new YMD();
        ymd.setFromString(ymdString);
        return ymd;
    };
    /**
     * @param utc set false if you want to use the local date instead of UTC date
     */
    YMD.today = function (utc) {
        if (utc === void 0) { utc = true; }
        return YMD.fromDate(new Date(), utc);
    };
    YMD.getDefaultFormatter = function (key) {
        return exports.DefaultYMDFormatters[key];
    };
    return YMD;
}());
exports.YMD = YMD;
