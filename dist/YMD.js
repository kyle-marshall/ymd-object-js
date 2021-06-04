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
    function YMD(ymd) {
        this.y = 1970;
        this.m = 1;
        this.d = 1;
        if (ymd == null)
            return;
        if (typeof ymd == "string") {
            if (!YMD_STRING_PATTERN.test(ymd)) {
                throw new Error(ERR_BAD_YMD_STRING);
            }
            var _a = ymd.split("-").map(function (v) { return parseInt(v); }), y = _a[0], m = _a[1], d = _a[2];
            Object.assign(this, { y: y, m: m, d: d });
        }
        else {
            Object.assign(this, ymd);
        }
    }
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
     * @param date some Date object
     * @param utc set false if you want to use the local date instead of UTC date
     */
    YMD.fromDate = function (date, utc) {
        if (utc === void 0) { utc = true; }
        if (utc)
            return new YMD(date.toISOString().split("T")[0]);
        return new YMD({
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate()
        });
    };
    YMD.getDefaultFormatter = function (key) {
        return exports.DefaultYMDFormatters[key];
    };
    return YMD;
}());
exports.YMD = YMD;
