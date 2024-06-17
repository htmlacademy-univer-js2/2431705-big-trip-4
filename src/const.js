export const OFFER_COUNT = 5;

export const DESTINATION_COUNT = 5;

export const POINT_COUNT = 5;

const DEFAULT_TYPE = 'flight';

export const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

export const POINT_TYPES = [
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

export const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const PointSorts = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

export const EnabledSortType = {
  [PointSorts.DAY]: true,
  [PointSorts.EVENT]: false,
  [PointSorts.TIME]: true,
  [PointSorts.PRICE]: true,
  [PointSorts.OFFERS]: false
};

export const EmptyListMessage = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PRESENT]: 'There are no present events now',
  [FilterTypes.PAST]: 'There are no past events now'
};

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};
const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
export const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
export const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;
