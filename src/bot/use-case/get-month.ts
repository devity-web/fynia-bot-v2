import {endOfMonth, startOfMonth} from 'date-fns';

export const getMonth = () => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  return {today, start, end};
};
