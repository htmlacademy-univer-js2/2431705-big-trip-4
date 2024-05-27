import EventListView from '../view/event-list-view';
import EmptyView from '../view/empty-view';
import PointPresenter from './point-presenter';
import NewPointPresenter from './new-point-presenter';
import SortPresenter from './sort-presenter';
import {remove, render, RenderPosition} from '../framework/render';
import { filter, sort } from '../utils/utils';
import LoadingView from '../view/load-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {FILTER_TYPES, POINT_SORTS, UpdateType, UserAction} from '../const.js';

const TimeLimit = {
  MIN: 350,
  MAX: 1000,
};

export default class BoardPresenter {
  #sortPresenter = null;
  #emptyListElement = null;
  #loadingElement = new LoadingView();
  #eventListElement = new EventListView();
  #pointPresenters = new Map();
  #destinationsModel;
  #offersModel;
  #filterModel;
  #pointsModel;
  #newPointButtonPresenter;
  #currentSortType = POINT_SORTS.DAY;
  #isCreating = false;
  #container;
  #isLoading = true;
  #isError = false;
  #newPointPresenter;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({container, destinationsModel, offersModel, pointsModel, filterModel, newPointButtonPresenter}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventListElement.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#onPointChangeHandler,
      onDestroy: this.#handleNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filterType = this.#filterModel.get();
    const filteredPoints = filter[filterType](this.#pointsModel.getAll());

    return sort(filteredPoints, this.#currentSortType);
  }

  init(){
    this.#renderBoard();
  }

  #renderBoard = () =>{

    if (this.#isLoading) {
      this.#renderLoader();
      return;
    }

    if (this.#isError) {
      this.#clearBoard({ resetSortType: true });
      return;
    }

    if (!this.points.length && !this.#isCreating) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    render(this.#eventListElement, this.#container);
    this.#renderPointList();
  };

  #renderEmptyList = () => {
    this.#emptyListElement = new EmptyView({
      filterType: this.#filterModel.get(),
    });
    render(this.#emptyListElement, this.#container);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#clearTaskList();
    remove(this.#emptyListElement);
    remove(this.#loadingElement);
    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
    }

    if (resetSortType) {
      this.#currentSortType = POINT_SORTS.DAY;
    }
  };

  #renderPointList = () =>{
    this.points.forEach((point) => this.#renderPoint(point));
  };

  #renderSort = () =>{
    this.#sortPresenter = new SortPresenter({
      container: this.#container,
      handleSortChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();
  };

  #renderLoader = () => {
    render(this.#loadingElement, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      container: this.#eventListElement.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointsChange: this.#onPointChangeHandler,
      handleModeChange: this.#modelEventHandler
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #onPointChangeHandler = async (action, updateType, point) => {
    this.#uiBlocker.block();
    switch (action) {
      case UserAction.ADD_POINT:
        this.#pointsModel.add(updateType, point);
        break;
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(point.id).setSaving();
        try{
          await this.#pointsModel.update(updateType, point);
        }
        catch{
          this.#pointPresenters.get(point.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.delete(updateType, point);
        break;
    }

    this.#uiBlocker.unblock();
  };

  #clearTaskList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #handleSortChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearTaskList();
    this.#renderPointList();
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        if (data.error) {
          this.#isError = true;
        } else {
          this.#isLoading = false;
          remove(this.#loadingElement);
        }
        this.#renderBoard();
        break;
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard({resetSortType: true});
        break;
    }
  };

  handleNewPointClick = () => {
    this.#isCreating = true;
    this.#currentSortType = POINT_SORTS.DAY;
    this.#filterModel.set(UpdateType.MAJOR, FILTER_TYPES.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();
    this.#newPointPresenter.init();
  };

  #handleNewPointDestroy = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (!this.points.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };
}
