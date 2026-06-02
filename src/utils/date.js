export const getMonday = (date) => {
  const monday = new Date(date);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  monday.setDate(monday.getDate() + diff);
  return monday;
};
export const getDaysOfWeek = (date) => {
  const monday = getMonday(date);
  const result = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(monday);
    newDate.setDate(newDate.getDate() + i);
    result.push(newDate);
  }
  return result;
};
export const compareDates = (date1, date2) => {
  return date1.toDateString() === date2.toDateString();
};
