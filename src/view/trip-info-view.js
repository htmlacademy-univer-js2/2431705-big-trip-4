import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoElement({route, dates, cost, isEmpty}) {
  return `
  <section class="trip-main__trip-info  trip-info">
  ${isEmpty ? '' : `
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>
    <p class="trip-info__dates">${dates}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
`}
</section>`;
}

export default class TripInfoView extends AbstractView {
  #route = null;
  #dates = null;
  #cost = null;
  #isEmpty = true;

  constructor({ route, dates, cost, isEmpty }) {
    super();
    this.#route = route;
    this.#dates = dates;
    this.#cost = cost;
    this.#isEmpty = isEmpty;
  }

  get template() {
    return createTripInfoElement({
      route: this.#route,
      dates: this.#dates,
      cost: this.#cost,
      isEmpty: this.#isEmpty,
    });
  }
}
