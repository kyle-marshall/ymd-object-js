
import { YMD } from "../index";

test("Date Conversion", () => {
    const original = new YMD("2000-01-31");
    const normalDate = original.toDate();
    expect(normalDate.toISOString()).toBe("2000-01-31T00:00:00.000Z");
    const backToYMD = YMD.fromDate(normalDate);
    expect(backToYMD.toString()).toBe(original.toString());
});