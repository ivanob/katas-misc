/**
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#date-math
 */

import {
  getDateOfNextDay,
  getDateOfNextMonth,
  getDateOfNextYear,
  getDateOfPrevDay,
  getDateOfPrevMonth,
  getDateOfPrevYear,
} from "./helpers";

// const offsets: {d:number, M: number, y: number, m: number, h: number, s: number, w: number} = {
//   d: 24 * 60 * 60 * 1 * 1000, //d day
//   M: 2, //M month
//   y: 1, //y year
//   h: 60 * 60 * 1 * 1000, //h hour
//   m: 60 * 1 * 1000, //m minute
//   s: 1 * 1000, //s second
//   w: 1, //w week
// };
const addOffset = (
  date: Date,
  op: string,
  value: number,
  interval: TimePeriod
): Date | undefined => {
  let offset = 0;
  switch (interval) {
    case "M":
      return new Date(
        date.setMonth(
          op === "+" ? date.getMonth() + value : date.getMonth() - value
        )
      );
    case "y":
      return new Date(
        date.setFullYear(
          op === "+" ? date.getFullYear() + value : date.getFullYear() - value
        )
      );
    case "s":
      offset = 1 * 1000 * value;
      break;
    case "m":
      offset = 60 * 1 * 1000 * value;
      break;
    case "h":
      offset = 60 * 60 * 1 * 1000 * value;
      break;
    case "d":
      offset = 24 * 60 * 60 * 1 * 1000 * value;
      break;
    case "w":
      offset = 7 * 24 * 60 * 60 * 1 * 1000 * value;
      break;
  }
  return new Date(
    op === "+" ? date.getTime() + offset : date.getTime() - offset
  );
};

const round = (date: Date, interval: TimePeriod): Date | undefined => {
  switch (interval) {
    case "d":
      const prevDay = getDateOfPrevDay(date);
      const nextDay = getDateOfNextDay(date);
      const diffWithPrevDay = date.getTime() - prevDay.getTime();
      const diffWithNextDay = nextDay.getTime() - date.getTime();
      return diffWithPrevDay < diffWithNextDay ? prevDay : nextDay;
    case "M":
      const prevMonth = getDateOfPrevMonth(date);
      const nextMonth = getDateOfNextMonth(date);
      const diffWithPrevMonth = date.getTime() - prevMonth.getTime();
      const diffWithNextMonth = nextMonth.getTime() - date.getTime();
      return diffWithPrevMonth < diffWithNextMonth ? prevMonth : nextMonth;
    case "y":
      const prevYear = getDateOfPrevYear(date);
      const nextYear = getDateOfNextYear(date);
      const diffWithPrevYear = date.getTime() - prevYear.getTime();
      const diffWithNextYear = nextYear.getTime() - date.getTime();
      return diffWithPrevYear < diffWithNextYear ? prevYear : nextYear;
  }
};

type TimePeriod = "d" | "M" | "y" | "h" | "m" | "s" | "w";

export const parseDate = (dateString: string): Date => {
  let dateEpoch = new Date(Date.now()); //Date version
  const parts = dateString.split(/(\+|\-|\/)/);
  if (parts[0] === "now") {
    //Nothing
  } else {
    throw new Error("Incorrect dateString format");
  }
  for (let i = 1; i < parts.length; i++) {
    const op = parts[i];

    if (op === "-" || op === "+") {
      i += 1;
      const value = parts[i];
      dateEpoch = addOffset(
        dateEpoch,
        op,
        Number(value.substr(0, value.length - 1)),
        value.charAt(value.length - 1) as TimePeriod
      )!;
    } else if (op === "/") {
      i += 1;
      const part = parts[i];
      dateEpoch = round(dateEpoch, part as TimePeriod)!;
    } else {
      throw new Error("Incorrect dateString format");
    }
  }

  // return date.toISOString();
  console.log(dateEpoch);
  return new Date(dateEpoch);
};
