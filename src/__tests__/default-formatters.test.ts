
import { YMD } from "../index";

test("Default Formatters", () => {
    const ymd = new YMD("2000-01-31");
    
    const mdyFormatter = YMD.getDefaultFormatter("MDY");
    expect(mdyFormatter(ymd)).toBe("01/31/2000");

    const mdyFormatter2 = YMD.getDefaultFormatter("MDY_NO_PAD");
    expect(mdyFormatter2(ymd)).toBe("1/31/2000");

    const longFormatter = YMD.getDefaultFormatter("LONG");
    expect(longFormatter(ymd)).toBe("Mon, 31 Jan 2000");
});