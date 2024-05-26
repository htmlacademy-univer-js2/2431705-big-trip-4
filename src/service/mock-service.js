import {TYPES, POINT_COUNT, DESTINATION_COUNT, OFFER_COUNT} from '../const.js';
import {getRandomArrayElement, getRandomInteger} from '../mock/util.js';
import{getRandomDestination} from '../mock/destination.js';
import{getRandomOffer} from '../mock/offer.js';
import{getRandomPoint} from '../mock/point.js';


export default class MockService {

  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers(){
    return this.offers;
  }

  getPoints(){
    return this.points;
  }

  generateDestinations() {
    return Array.from({ length: DESTINATION_COUNT }, getRandomDestination);
  }

  generateOffers() {
    return TYPES.map((type) => ({type,
      offers: Array.from({ length: OFFER_COUNT }, getRandomOffer)
    }));
  }

  generatePoints() {
    return Array.from({length: POINT_COUNT}, () =>{
      const type = getRandomArrayElement(TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const hasOffers = getRandomInteger(0, 1);

      const offersByType = this.offers.find((offerByType) => offerByType.type === type);
      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, 5))
          .map((offer) => offer.id)
        : [];

      return getRandomPoint(type, destination.id, offerIds);

    });
  }

  updatePoint(updatedPoint){
    return updatedPoint;
  }

  addPoint(data){
    return {...data, id: crypto.randomUUID()};
  }

  deletePoint(){
    //
  }
}
