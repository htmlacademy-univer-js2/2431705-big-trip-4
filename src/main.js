import TripInfoView from './view/trip-info-view.js';
import {render, RenderPosition} from '../src/framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/point-model.js';
import MockService from './service/mock-service.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';


const siteMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const service = new MockService();
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel(service);
const filterModel = new FilterModel();

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: tripEventsContainer
});
const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter
});

const filterPresenter = new FilterPresenter({
  container: filterContainer,
  pointsModel,
  filterModel,
});


render(new TripInfoView(), siteMainContainer, RenderPosition.AFTERBEGIN);

newPointButtonPresenter.init({
  onButtonClick:boardPresenter.handleNewPointClick
});

filterPresenter.init();
boardPresenter.init();
