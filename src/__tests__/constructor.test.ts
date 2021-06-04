
import { YMD } from "../index";

test("Constructor", () => {
    const ymdObj = {
        y: 2010,
        m: 5,
        d: 15
    };
    const ymdStr = "2010-05-15";

    const a = new YMD(ymdStr);
    expect(a.toString()).toBe(ymdStr);

    const b = new YMD(ymdObj);
    expect(b.toString()).toBe(ymdStr);

    expect(() => new YMD("tacos")).toThrowError();
    expect(() => new YMD("2010-1-1")).toThrowError();
    expect(() => new YMD("20CC-01-01")).toThrowError();
});