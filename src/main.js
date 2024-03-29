import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import {render, RenderPosition} from './render.js';
import BoardPresenter from './board-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/point-model.js';
import MockService from './service/mock-service.js';


const siteMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const service = new MockService();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel(service);

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  destinationsModel,
  offersModel,
  pointsModel
});

render(new TripInfoView(), siteMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

boardPresenter.init();
