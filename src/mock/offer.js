import {getRandomInteger, getRandomArrayElement} from './util.js';
import{Price, OFFERS} from './const.js';

export const getRandomOffer = () => ({
  id:crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(Price.MIN, (Price.MAX / 10))
});
