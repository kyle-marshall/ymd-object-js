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
/** work with just a date without having to think about timezones (and without the bulk of momentjs) */
var YMD = /** @class */ (function () {
    function YMD(ymd) {
        this.y = 1970;
        this.m = 1;
        this.d = 1;
        if (ymd == null)
            return;
        if (typeof ymd == "string") {
            if (ymd.length === 10) {
                var _a = ymd.split("-").map(function (v) { return parseInt(v); }), y = _a[0], m = _a[1], d = _a[2];
                Object.assign(this, { y: y, m: m, d: d });
            }
        }
        else {
            Object.assign(this, ymd);
        }
    }
    YMD.prototype.toString = function (formatKey) {
        if (formatKey === void 0) { formatKey = "YMD"; }
        return exports.DefaultYMDFormatters[formatKey](this);
    };
    YMD.prototype.toDate = function () {
        return new Date(this.toString() + "T00:00Z");
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
