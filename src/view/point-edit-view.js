import { POINT_EMPTY, TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import {formatToSlashDate} from '../utils.js';

function createTypesElements(typeArray){

  let typesElements = '';
  typeArray.forEach((type) => {
    typesElements += `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-taxi-1">${type}</label>
</div>`;
  });

  return typesElements;

}

function createOfferSelector(offersArray){

  let offersElements = `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>`;

  offersArray.offers.forEach((offer, i) => {
    offersElements += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${++i}" type="checkbox" name="event-offer-meal">
      <label class="event__offer-label" for="event-offer-meal-${i}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  });

  offersElements += '</section>';

  return offersElements;
}

function createPointEditElement({point, pointDestination, pointOffers}) {

  const {basePrice, dateFrom, dateTo, type} = point;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="${type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${createTypesElements(TYPES)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatToSlashDate(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatToSlashDate(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
      ${createOfferSelector(pointOffers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${pointDestination.description}</p>
        </section>
      </section>
    </form>
  </li>`;
}

export default class EditPointView extends AbstractView{

  #pointDestination;
  #pointOffers;
  #point;
  #onCloseEditPoint;
  #onSubmiClick;

  constructor({point = POINT_EMPTY, pointDestination, pointOffers, onCloseEditPoint, onSubmiClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onCloseEditPoint = onCloseEditPoint;
    this.#onSubmiClick = onSubmiClick;
    this.#closeEditPoint();
    this.#submitEditPoint();
  }

  get template() {
    return createPointEditElement({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #closeEditPoint = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeEditPointHandler);
  };

  #submitEditPoint = () =>{
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submiClickHandler);
  };

  #closeEditPointHandler = (evt) => {
    evt.preventDefault();
    this.#onCloseEditPoint();
  };

  #submiClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmiClick();
  };
}
