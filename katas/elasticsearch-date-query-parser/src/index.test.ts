import { parseDate } from "./index";

/**
 * I have mocked the Date object to point at '01 May 2020 00:00:00 GMT'
 * as the current date to simplify the testing
 */
const now = Date.parse('01 May 2020 00:00:00 GMT')
jest.spyOn(Date, "now").mockImplementation(() => now);

/**
 * Given the current date and time is 2020-05-01T00:00:00.000Z
    now-1y/y  -> 2019-01-01T00:00:00.000Z - now minus one year rounded to the nearest year
    now/y     -> 2020-01-01T00:00:00.000Z - now rounded to the nearest year
    now-1d    -> 2020-04-30T00:00:00.000Z - now minus 1 day
    now+1d    -> 2020-05-02T00:00:00.000Z - now add 1 day
    now-4d-4h -> 2020-04-26T20:00:00.000Z - now minus four days and four hours
 */
test("Basic test on the parse function (substracting)", async () => {
  {
    const d = parseDate("now-1s");
    expect(d.toISOString()).toEqual("2020-04-30T23:59:59.000Z");
  }
  {
    const d = parseDate("now-1m");
    expect(d.toISOString()).toEqual("2020-04-30T23:59:00.000Z");
  }
  {
    const d = parseDate("now-1h");
    expect(d.toISOString()).toEqual("2020-04-30T23:00:00.000Z");
  }
  {
    const d = parseDate("now-1d");
    expect(d.toISOString()).toEqual("2020-04-30T00:00:00.000Z");
  }
  {
    const d = parseDate("now-1w");
    expect(d.toISOString()).toEqual("2020-04-24T00:00:00.000Z");
  }
  {
    const d = parseDate("now-1M");
    expect(d.toISOString()).toEqual("2020-04-01T00:00:00.000Z");
  }
  {
    const d = parseDate("now-1y");
    expect(d.toISOString()).toEqual("2019-05-01T00:00:00.000Z");
  }
});

test("Basic test on the parse function (adding)", async () => {
  {
    const d = parseDate("now+1s");
    expect(d.toISOString()).toEqual("2020-05-01T00:00:01.000Z");
  }
  {
    const d = parseDate("now+1m");
    expect(d.toISOString()).toEqual("2020-05-01T00:01:00.000Z");
  }
  {
    const d = parseDate("now+1h");
    expect(d.toISOString()).toEqual("2020-05-01T01:00:00.000Z");
  }
  {
    const d = parseDate("now+1d");
    expect(d.toISOString()).toEqual("2020-05-02T00:00:00.000Z");
  }
  {
    const d = parseDate("now+1w");
    expect(d.toISOString()).toEqual("2020-05-08T00:00:00.000Z");
  }
  {
    const d = parseDate("now+1M");
    expect(d.toISOString()).toEqual("2020-06-01T00:00:00.000Z");
  }
  {
    const d = parseDate("now+1y");
    expect(d.toISOString()).toEqual("2021-05-01T00:00:00.000Z");
  }
});

test("Test on combinations of offsets", async () => {
  {
    const d = parseDate("now+1s-1s");
    expect(d.toISOString()).toEqual("2020-05-01T00:00:00.000Z");
  }
  {
    const d = parseDate("now+1s+1s+1s");
    expect(d.toISOString()).toEqual("2020-05-01T00:00:03.000Z");
  }
  {
    const d = parseDate("now+1s+1s+1s");
    expect(d.toISOString()).toEqual("2020-05-01T00:00:03.000Z");
  }
});

test("Test on different values than 1", async () => {
  {
    const d = parseDate("now+7s");
    expect(d.toISOString()).toEqual("2020-05-01T00:00:07.000Z");
  }
  {
    const d = parseDate("now+5d");
    expect(d.toISOString()).toEqual("2020-05-06T00:00:00.000Z");
  }
  {
    const d = parseDate("now+3M");
    expect(d.toISOString()).toEqual("2020-08-01T00:00:00.000Z");
  }
});

test("Test of rounding per Day", async () => {
  {
    const now = Date.parse('27 Mar 2023 11:54:20 GMT')
    jest.spyOn(Date, "now").mockImplementation(() => now);
    const parsedDate = parseDate("now/d")
    expect(parsedDate.toUTCString()).toEqual("Mon, 27 Mar 2023 00:00:00 GMT")
  }
  {
    const now = Date.parse('27 Mar 2023 12:04:20 GMT');
    jest.spyOn(Date, "now").mockImplementation(() => now);
    const parsedDate = parseDate("now/d")
    expect(parsedDate.toUTCString()).toEqual("Tue, 28 Mar 2023 00:00:00 GMT")
  }
});

test("Test of rounding per Month", async () => {
  {
    const now = Date.parse('27 Mar 2023 11:54:20 GMT')
    jest.spyOn(Date, "now").mockImplementation(() => now);
    const parsedDate = parseDate("now/M")
    expect(parsedDate.toUTCString()).toEqual("Sat, 01 Apr 2023 00:00:00 GMT")
  }
  {
    const now = Date.parse('3 Mar 2023 12:04:20 GMT');
    jest.spyOn(Date, "now").mockImplementation(() => now);
    const parsedDate = parseDate("now/M")
    expect(parsedDate.toUTCString()).toEqual("Wed, 01 Mar 2023 00:00:00 GMT")
  }
});

test("Test of rounding per Year", async () => {
  {
    const now = Date.parse('27 Oct 2023 11:54:20 GMT')
    jest.spyOn(Date, "now").mockImplementation(() => now);
    const parsedDate = parseDate("now/y")
    expect(parsedDate.toUTCString()).toEqual("Mon, 01 Jan 2024 00:00:00 GMT")
  }
  {
    const now = Date.parse('3 Mar 2023 12:04:20 GMT');
    jest.spyOn(Date, "now").mockImplementation(() => now);
    const parsedDate = parseDate("now/y")
    expect(parsedDate.toUTCString()).toEqual("Sun, 01 Jan 2023 00:00:00 GMT")
  }
});
