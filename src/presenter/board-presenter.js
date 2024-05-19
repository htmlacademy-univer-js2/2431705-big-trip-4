import EventListView from '../view/event-list-view';
import EmptyView from '../view/empty-view';
import PointPresenter from './point-presenter';
import SortPresenter from './sort-presenter';
import {render} from '../framework/render';
import { updateItem } from '../mock/util';
import { sort } from '../utils';

export default class BoardPresenter {
  #sortPresenter = null;
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
    this.#points = sort([...pointsModel.getAll()]);
  }

  init(){
    this.#renderSort();
    render(this.#eventListComponent, this.container);
    this.#renderPointList();
    if (this.#points.length === 0){
      render(new EmptyView(), this.container);
    }
  }

  #renderPointList = () =>{
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #renderSort = () =>{
    this.#sortPresenter = new SortPresenter({
      container: this.container,
      handleSortChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();
  };

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

  #handleSortChange = (sortType) => {
    this.#points = sort(this.#points, sortType);
    this.#clearTaskList();
    this.#renderPointList();
  };
}
