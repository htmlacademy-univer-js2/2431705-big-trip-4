import BoardPresenter from './presenter/board-presenter.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/point-model.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsApiService from './service/points-api-service.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';


const siteMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = 'Basic AEKr7bwEH2vHDsFM';

const service = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(service);
const offersModel = new OffersModel(service);
const pointsModel = new PointsModel({service : service, destinationsModel : destinationsModel, offersModel: offersModel});
const filterModel = new FilterModel();

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: siteMainContainer
});

const tripInfoPresenter = new TripInfoPresenter({
  container: siteMainContainer,
  pointsModel,
  destinationsModel,
  offersModel,
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

pointsModel.init();
filterPresenter.init();
boardPresenter.init();
newPointButtonPresenter.init({
  onButtonClick:boardPresenter.handleNewPointClick
});
tripInfoPresenter.init();
