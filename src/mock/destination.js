import {getRandomArrayElement} from './util.js';
import {CITIES, DESCRIPTIONS} from './const.js';

export const getRandomDestination = () => {
  const city = getRandomArrayElement(CITIES);
  const description = getRandomArrayElement(DESCRIPTIONS);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: description,
    pictures: [
      {
        'scr': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description' : `${city} description`
      }
    ]
  };
};
