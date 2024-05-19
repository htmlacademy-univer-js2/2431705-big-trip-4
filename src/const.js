export const OFFER_COUNT = 5;

export const DESTINATION_COUNT = 5;

export const POINT_COUNT = 5;

export const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

export const TYPES = [
  'taxi',
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const POINT_FILTERS = [
  'everything',
  'future',
  'present',
  'past',
];

export const POINT_SORTS = [
  'day',
  'event',
  'time',
  'price',
  'offers',
];

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: null,
};

const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
export const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN;
export const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;
