export const formatDate = (date, options) => {
  return new Date(date).toLocaleString(undefined, options);
};

export const calculateDifference = (day1, day2) => {
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  const time = Math.abs(date1 - date2);
  const hours = Math.ceil(time / (1000 * 60 * 60));
  return hours;
};
export const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
