import { POINT_EMPTY} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import{formatStringDateTime, getPointDuration, formatStringTime, formatStringDate} from '../utils/common.js';


function createOfferElements(pointOffers, selectedOffers) {
  let elements = '';
  pointOffers.offers.filter((offer) => selectedOffers.includes(offer.id)).forEach((offer) => {
    elements += `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  +€&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`;
  });

  return elements;
}

function createPointElement({point, pointDestination, pointOffers}) {
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatStringDate(dateFrom)}">${formatStringDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatStringDateTime(dateFrom)}">${formatStringTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatStringDateTime(dateTo)}">${formatStringTime(dateTo)}</time>
          </p>
          <p class="event__duration">${getPointDuration(point)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createOfferElements(pointOffers, point.offers)}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
}

export default class PointView extends AbstractView{

  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onEditClick = null;
  #onFavoriteClick;

  constructor({point = POINT_EMPTY, pointDestination, pointOffers, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#onEditClick = onEditClick;
    this.#addPointHandlers();
    this.#onFavoriteClick = onFavoriteClick;
  }

  get template() {
    return createPointElement({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #addPointHandlers = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element
      .querySelector('.event__favorite-icon')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
