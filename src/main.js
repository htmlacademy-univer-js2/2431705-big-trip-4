import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import {render, RenderPosition} from './render.js';
import BoardPresenter from './board-presenter.js';

const siteMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer
});

render(new TripInfoView(), siteMainContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

boardPresenter.init();
