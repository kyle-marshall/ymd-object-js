"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YMD = exports.DefaultYMDFormatters = exports.DateFormatStyle = void 0;
var DateFormatStyle;
(function (DateFormatStyle) {
    // e.g. "2000-01-31"
    DateFormatStyle[DateFormatStyle["YMD"] = 0] = "YMD";
    // e.g. "01/31/2000"
    DateFormatStyle[DateFormatStyle["DMY"] = 1] = "DMY";
    // e.g. "1/31/2000"
    DateFormatStyle[DateFormatStyle["DMY_NO_PAD"] = 2] = "DMY_NO_PAD";
    // e.g. "Mon, 31 Jan 2000"
    DateFormatStyle[DateFormatStyle["LONG"] = 3] = "LONG";
})(DateFormatStyle = exports.DateFormatStyle || (exports.DateFormatStyle = {}));
var unPad = function (digits) { return digits.replace(/^0*/, ""); };
exports.DefaultYMDFormatters = {
    MDY: function (ymd) {
        var _a = ymd.ymdString.split("-"), y = _a[0], m = _a[1], d = _a[2];
        return [m, d, y].join("/");
    },
    MDY_NO_PAD: function (ymd) {
        var _a = ymd.ymdString.split("-"), y = _a[0], m = _a[1], d = _a[2];
        return [m, d, y].map(function (v) { return unPad(v); }).join("/");
    },
    LONG: function (ymd) {
        var utcString = ymd.toDate().toUTCString();
        return utcString.substring(0, utcString.indexOf("00:") - 1);
    }
};
/** work with just a date without having to think about timezones (and without the bulk of momentjs) */
var YMD = /** @class */ (function () {
    /**
     * @param ymdString date string formatted like "1999-12-31"
     */
    function YMD(ymdString) {
        this.ymdString = ymdString;
    }
    YMD.prototype.toDate = function () {
        return new Date(this.ymdString + "T00:00Z");
    };
    YMD.fromDate = function (date) {
        return new YMD(date.toISOString().split("T")[0]);
    };
    YMD.getDefaultFormatter = function (key) {
        return exports.DefaultYMDFormatters[key];
    };
    return YMD;
}());
exports.YMD = YMD;
