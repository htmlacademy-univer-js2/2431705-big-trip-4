import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import EmptyView from '../view/empty-view';
import PointPresenter from './point-presenter';
import {render} from '../framework/render';
import { updateItem } from '../mock/util';

export default class BoardPresenter {
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #pointPresenters = new Map();
  #destinationsModel;
  #offersModel;
  #points = [];

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.pointsModel = pointsModel;
    this.#points = [...pointsModel.getAll()];
  }

  init(){
    render(this.#sortComponent, this.container);
    render(this.#eventListComponent, this.container);
    this.#points.forEach((point) => this.#renderPoint(point));
    if (this.#points.length === 0){
      render(new EmptyView(), this.container);
    }
  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      container: this.#eventListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointsChange: this.#onPointChangeHandler,
      handleModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }


  #onPointChangeHandler = (changedPoint) => {
    this.#points = updateItem(this.#points, changedPoint);
    this.#pointPresenters.get(changedPoint.id).init(changedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #clearTaskList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };
}
