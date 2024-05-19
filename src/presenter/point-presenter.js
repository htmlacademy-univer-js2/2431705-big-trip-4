import PointEditView from '../view/point-edit-view';
import PointView from '../view/point-view';
import {render,replace,remove } from '../framework/render';
import { Mode } from '../const';


export default class PointPresenter {

  #container;
  #destinationsModel;
  #offersModel;
  #pointElement;
  #editPointElement;
  #point = null;
  #onPointsChangeHandler;
  #handleModeChange;
  #mode = Mode.DEFAULT;

  constructor({
    container,
    destinationsModel,
    offersModel,
    onPointsChange,
    handleModeChange
  })
  {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onPointsChangeHandler = onPointsChange;
    this.#handleModeChange = handleModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointElement = this.#pointElement;
    const prevEditPointElement = this.#editPointElement;

    this.#pointElement = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#onEditClick,
      onFavoriteClick: this.#favoriteClickHandler
    });

    this.#editPointElement = new PointEditView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onCloseEditPoint: this.#onCloseEditClick,
      onSubmiClick: this.#onSubmiClick,
    });

    if(!prevEditPointElement || !prevPointElement){
      render(this.#pointElement, this.#container);
      return;
    }

    replace(this.#pointElement, prevPointElement);


    remove(prevEditPointElement);
    remove(prevPointElement);
  }

  #onEditClick = () => this.#replaceToForm();

  #onSubmiClick = () => this.#replaceToPoint();

  #onCloseEditClick = () => this.#replaceToPoint();

  #escKeydown = (evt) => {
    if (evt.keyCode === 27 || evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceToPoint();
    }
  };

  #replaceToForm = () => {
    replace(this.#editPointElement, this.#pointElement);
    document.addEventListener('keydown', this.#escKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceToPoint = () => {
    replace(this.#pointElement, this.#editPointElement);
    document.removeEventListener('keydown', this.#escKeydown);
    this.#mode = Mode.DEFAULT;
  };

  resetView = () =>{
    if(this.#mode !== Mode.DEFAULT){
      this.#replaceToPoint();
    }
  };

  destroy = () => {
    remove(this.#editPointElement);
    remove(this.#pointElement);
  };

  #favoriteClickHandler = () =>{
    this.#onPointsChangeHandler({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
