import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {MSEC_IN_DAY, MSEC_IN_HOUR, FILTER_TYPES, POINT_SORTS} from './const';


dayjs.extend(duration);
dayjs.extend(relativeTime);

const isPointDatePast = (date) => dayjs().isAfter(date);

const isPointDateFuture = (date) => dayjs().isBefore(date);

const isPointDatePresent = (dateFrom, dateTo) => dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo);

export const formatStringDateTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

export const formatStringTime = (date) => dayjs(date).format('HH:mm');

export const formatStringDate = (date) => dayjs(date).format('YYYY-MM-DDT');

export const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');

export const formatToSlashDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const getPointDuration = (point) => {
  const timeDiff = dayjs(point.dateTo).diff(dayjs(point.dateFrom));


  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      return dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');

    case (timeDiff >= MSEC_IN_HOUR):
      return dayjs.duration(timeDiff).format('HH[H] mm[M]');

    case (timeDiff < MSEC_IN_HOUR):
      return dayjs.duration(timeDiff).format('mm[M]');

  }};


export const getDateDiff = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const getPriceDiff = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const getDurationDiff = (pointA, pointB) =>
  dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

export const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points,
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointDateFuture(point.dateFrom)),
  [FILTER_TYPES.PRESENT] : (points) => points.filter((point) => isPointDatePresent(point.dateFrom, point.dateTo)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointDatePast(point.dateTo)),
};

export const sorter = {
  [POINT_SORTS.DAY]: (points) => points.sort(getDateDiff),
  [POINT_SORTS.PRICE]: (points) => points.sort(getPriceDiff),
  [POINT_SORTS.TIME]: (points) => points.sort(getDurationDiff),
};

export const sort = (points, sortType = POINT_SORTS.DAY) => {
  if (!sorter[sortType]) {
    throw new Error(`Sort by ${sortType} is not implemented`);
  }
  return sorter[sortType](points);
};
