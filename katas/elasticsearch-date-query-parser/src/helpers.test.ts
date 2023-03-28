import {
  getDateOfNextDay,
  getDateOfNextMonth,
  getDateOfNextYear,
  getDateOfPrevDay,
  getDateOfPrevMonth,
  getDateOfPrevYear,
} from "./helpers";

/**
 * I have mocked the Date object to point at '01 May 2020 00:00:00 GMT'
 * as the current date to simplify the testing
 */
const now = Date.parse("01 May 2020 00:00:00 GMT");
jest.spyOn(Date, "now").mockImplementation(() => now);

test("Test of rounding MONTH dates helper functions", async () => {
  {
    const testDate = new Date(Date.parse("27 Mar 2023 11:54:20 GMT"));
    const dPrev = getDateOfPrevMonth(testDate);
    expect(dPrev.toUTCString()).toEqual("Wed, 01 Mar 2023 00:00:00 GMT");
    const dNext = getDateOfNextMonth(testDate);
    expect(dNext.toUTCString()).toEqual("Sat, 01 Apr 2023 00:00:00 GMT");
  }
});

test("Test of rounding YEAR dates helper functions", async () => {
  {
    const testDate = Date.parse("27 Mar 2023 11:54:20 GMT");
    const dPrev = getDateOfPrevYear(new Date(testDate));
    expect(dPrev.toUTCString()).toEqual("Sun, 01 Jan 2023 00:00:00 GMT");
    const dNext = getDateOfNextYear(new Date(testDate));
    expect(dNext.toUTCString()).toEqual("Mon, 01 Jan 2024 00:00:00 GMT");
  }
});

test("Test of rounding Day dates helper functions", async () => {
  {
    const testDate = new Date(Date.parse("01 May 2020 00:00:00 GMT"));
    const dPrev = getDateOfPrevDay(new Date(testDate));
    expect(dPrev.toUTCString()).toEqual("Fri, 01 May 2020 00:00:00 GMT");
    const dNext = getDateOfNextDay(new Date(testDate));
    expect(dNext.toUTCString()).toEqual("Sat, 02 May 2020 00:00:00 GMT");
  }
  {
    const testDate = new Date(Date.parse("01 Mar 2023 11:54:20 GMT"));
    const dPrev = getDateOfPrevDay(testDate);
    expect(dPrev.toUTCString()).toEqual("Wed, 01 Mar 2023 00:00:00 GMT");
    const dNext = getDateOfNextDay(testDate);
    expect(dNext.toUTCString()).toEqual("Thu, 02 Mar 2023 00:00:00 GMT");
  }
  {
    const testDate = new Date(Date.parse("28 Feb 2023 12:04:20 GMT"));
    const dPrev = getDateOfPrevDay(testDate);
    expect(dPrev.toUTCString()).toEqual("Tue, 28 Feb 2023 00:00:00 GMT");
    const dNext = getDateOfNextDay(testDate);
    expect(dNext.toUTCString()).toEqual("Wed, 01 Mar 2023 00:00:00 GMT");
  }
});
