import { POINT_EMPTY, TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatToSlashDate} from '../utils.js';

function createTypesElements(typeArray){

  let typesElements = '';
  typeArray.forEach((type) => {
    typesElements += `<div class="event__type-item">
  <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
  <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
</div>`;
  });

  return typesElements;

}

function createDestinationPhotos(pointDestination){
  let photos = '<div class="event__photos-tape">';
  pointDestination.pictures.forEach((picture) =>{
    photos += `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  });
  return `${photos}</div>`;
}

function createDestinationList(destinations){
  let dataset = '<datalist id="destination-list-1">';
  destinations.forEach((destination) =>{
    dataset += `<option value="${destination.name}"></option>`;
  });
  return `${dataset}</datalist>`;

}

function createOfferSelector(pointOffers, offersArray){
  let offersElements = `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">`;

  offersArray.forEach((offer) => {
    const checked = pointOffers.some((offerId) => offerId === offer.id) ? 'checked' : '';
    offersElements += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${offer.id}" type="checkbox" name="event-offer-meal" ${checked}>
      <label class="event__offer-label" for="event-offer-meal-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  });

  offersElements += '</div></section>';

  return offersElements;
}

function createPointEditElement({point, destinations, offers}) {
  const pointDestination = destinations.find((destination) => destination.id === point.destination);
  const pointOffers = offers.find((subOffers) => subOffers.type === point.type).offers;

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
          ${createDestinationList(destinations)}
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
      ${createOfferSelector(point.offers, pointOffers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${pointDestination.description}</p>
          <div class="event__photos-container">
          ${createDestinationPhotos(pointDestination)}
          </div>
        </section>
      </section>
    </form>
  </li>`;
}

export default class EditPointView extends AbstractStatefulView{

  #destinations;
  #offers;
  #onCloseEditPoint;
  #onSubmiClick;

  constructor({point = POINT_EMPTY, destinations, offers, onCloseEditPoint, onSubmiClick}) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onCloseEditPoint = onCloseEditPoint;
    this.#onSubmiClick = onSubmiClick;
    this._setState(EditPointView.parsePointToState({point}));
    this.#submitEditPoint();
    this._restoreHandlers();
  }

  _restoreHandlers = () =>{
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeEditPointHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#onDestinationChange);

    this.element
      .querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
  };

  get template() {
    return createPointEditElement({
      point: this._state.point,
      destinations: this.#destinations,
      offers: this.#offers
    });
  }

  reset = (point) => this.updateElement({ point });

  #submitEditPoint = () =>{
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submiClickHandler);
  };

  #onDestinationChange = (evt) => {
    const newDestinationName = evt.target.value;
    const newDestination = this.#destinations.find((dest) => dest.name === newDestinationName);
    this.updateElement({
      point: {
        ...this._state.point,
        destination: newDestination.id,
      }
    });
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'))
      .map(({id}) => id.split('-').slice(3).join('-'));

    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOffers
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };


  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  #closeEditPointHandler = (evt) => {
    evt.preventDefault();
    this.#onCloseEditPoint();
  };

  #submiClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmiClick();
  };

  static parsePointToState = ({ point }) => ({ point });
  static parseStateToPoint = (state) => state.point;
}
