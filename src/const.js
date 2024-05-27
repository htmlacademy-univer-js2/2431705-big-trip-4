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

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const ButtonLabel = {
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SAVE: 'Save',
  DELETE_IN_PROGRESS: 'Deleting...',
  SAVE_IN_PROGRESS: 'Saving...'
};

export const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

export const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

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

export const POINT_SORTS = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const EnabledSortType = {
  [POINT_SORTS.DAY]: true,
  [POINT_SORTS.EVENT]: false,
  [POINT_SORTS.TIME]: true,
  [POINT_SORTS.PRICE]: true,
  [POINT_SORTS.OFFERS]: false
};

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
