import dayjs from 'dayjs';
import {Duration} from './const.js';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();

export const getRandomDate = (next) => {
  const minsGap = getRandomInteger(0, Duration.MINUTE);
  const hoursGap = getRandomInteger(1, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }

  return date;
};
