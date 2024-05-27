import PointEditView from '../view/point-edit-view';
import PointView from '../view/point-view';
import {render,replace,remove } from '../framework/render';
import { Mode, EditType } from '../const';
import { isBigDifference } from '../utils/utils.js';
import {UpdateType, UserAction} from '../const.js';


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
      destinations: this.#destinationsModel.getAll(),
      offers: this.#offersModel.getAll(),
      onCloseEditPoint: this.#onCloseEditClick,
      onSubmiClick: this.#formSubmitHandler,
      onDeleteClick: this.#onEditPointDelete,
      pointType: EditType.EDITING
    });

    if(!prevEditPointElement || !prevPointElement){
      render(this.#pointElement, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointElement, prevPointElement);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointElement, prevEditPointElement);
    }


    remove(prevEditPointElement);
    remove(prevPointElement);
  }

  #onEditClick = () =>{
    this.#replaceToForm();
  };

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

  setSaving = () => {
    if(this.#mode === Mode.DEFAULT){
      this.#editPointElement.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setAborting = () => {
    if(this.#mode === Mode.DEFAULT){
      this.#editPointElement.shake();
    }
  };

  resetView = () =>{
    if(this.#mode !== Mode.DEFAULT){
      this.#replaceToPoint();
      this.#editPointElement.reset(this.#point);
    }
  };

  setDeleting = () => {
    this.#editPointElement.updateElement({
      isDisabled: true,
      isDeleting: true
    });
  };

  destroy = () => {
    remove(this.#editPointElement);
    remove(this.#pointElement);
  };

  #favoriteClickHandler = () =>{
    this.#onPointsChangeHandler(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };

  #formSubmitHandler = (point) => {
    const isMinor = isBigDifference(point, this.#point);
    this.#onPointsChangeHandler(
      UserAction.UPDATE_POINT,
      isMinor ? UpdateType.MINOR : UpdateType.PATCH,
      point
    );

    this.#replaceToPoint();
  };

  #onEditPointDelete = (point) =>{

    this.#onPointsChangeHandler(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
