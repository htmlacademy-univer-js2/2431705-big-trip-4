import { RenderPosition, remove, render, replace } from '../framework/render';
import { getTotalCost, getTripRoute, getTripDates } from '../utils/trip-info-utils.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {

  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #container = null;
  #tripInfoElement = null;

  constructor({ container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderTripInfo();
    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  #renderTripInfo = () => {
    const points = this.#pointsModel.getAll();
    const destinations = this.#destinationsModel.getAll();
    const offers = this.#offersModel.getAll();
    const prevTripInfoElement = this.#tripInfoElement;
    this.#tripInfoElement = new TripInfoView({
      route: getTripRoute(points, destinations),
      dates: getTripDates(points),
      cost: getTotalCost(points, offers),
      isEmpty: !points.length,
    });

    if (!prevTripInfoElement) {
      render(
        this.#tripInfoElement,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#tripInfoElement, prevTripInfoElement);
    remove(prevTripInfoElement);
  };

  #handleModelChange = () => {
    this.#renderTripInfo();
  };
}
