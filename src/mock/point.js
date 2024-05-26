import {getRandomInteger, getRandomDate} from './util.js';
import {Price} from './const.js';

export const getRandomPoint = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(Price.MIN, Price.MAX),
  dateFrom: getRandomDate(),
  dateTo: getRandomDate({ next: true }),
  destination: destinationId,
  isFavorite: Boolean(getRandomInteger(0, 1)),
  offers: offerIds,
  type
});


