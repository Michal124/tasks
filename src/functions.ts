import type { Date } from "./types";

export const getMonth = (
  selectedMonth: { month: number; year: number },
  change: number
) => {
  if (selectedMonth.month + change < 0) {
    return {
      month: 11,
      year: selectedMonth.year - 1,
    };
  } else if (selectedMonth.month + change > 11) {
    return {
      month: 0,
      year: selectedMonth.year + 1,
    };
  } else {
    return { month: selectedMonth.month + change, year: selectedMonth.year };
  }
};

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDay = (
  selectedDay: { day: number; month: number; year: number },
  change: number
) => {
  if (selectedDay.day + change < 1) {
    const month = getMonth(
      { month: selectedDay.month, year: selectedDay.year },
      -1
    );
    return {
      day: getDaysInMonth(month.month, month.year),
      month: month.month,
      year: month.year,
    };
  } else if (
    selectedDay.day + change >
    getDaysInMonth(selectedDay.month, selectedDay.year)
  ) {
    const month = getMonth(
      { month: selectedDay.month, year: selectedDay.year },
      1
    );
    return {
      day: 1,
      month: month.month,
      year: month.year,
    };
  } else {
    return { ...selectedDay, day: selectedDay.day + change };
  }
};

export const getDimensions = (element: HTMLElement) => {
  const computedStyle = getComputedStyle(element);
  const dimensions = element.getBoundingClientRect();
  const width =
    (dimensions.width -
      (parseFloat(computedStyle.paddingLeft) +
        parseFloat(computedStyle.paddingRight))) /
    16;
  const height =
    (dimensions.height -
      (parseFloat(computedStyle.paddingTop) +
        parseFloat(computedStyle.paddingBottom))) /
    16;
  return { width, height };
};
