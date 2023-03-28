export const getDateOfPrevDay = (date: Date): Date => {
  const copyDate = new Date(date);
  copyDate.setUTCMilliseconds(0);
  copyDate.setUTCSeconds(0);
  copyDate.setUTCMinutes(0);
  copyDate.setUTCHours(0);
  return copyDate;
};

export const getDateOfNextDay = (date: Date): Date => {
  const copyDate = getDateOfPrevDay(date);
  copyDate.setUTCDate(copyDate.getUTCDate() + 1);
  return copyDate;
};

export const getDateOfPrevMonth = (date: Date): Date => {
  const copyDate = new Date(date);
  return new Date(getDateOfPrevDay(copyDate).setUTCDate(1));
};

export const getDateOfNextMonth = (date: Date): Date => {
  const copyDate = getDateOfPrevMonth(date);
  copyDate.setUTCMonth(copyDate.getUTCMonth() + 1);
  return copyDate;
};

export const getDateOfPrevYear = (date: Date): Date => {
  const copyDate = new Date(date);
  return new Date(
    new Date(
      getDateOfPrevMonth(copyDate)
    ).setUTCMonth(0)
  );
};

export const getDateOfNextYear = (date: Date): Date => {
  const copyDate = getDateOfPrevYear(date);
  copyDate.setUTCFullYear(copyDate.getUTCFullYear() + 1);
  return copyDate;
};
