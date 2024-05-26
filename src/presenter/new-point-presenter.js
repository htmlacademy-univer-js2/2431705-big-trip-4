import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType, EditType } from '../const.js';
import PointEditView from '../view/point-edit-view';

export default class NewPointPresenter {
  #container;

  #destinationsModel;
  #offersModel;

  #handleDataChange;
  #handleDestroy;

  #newPointElement = null;
  constructor({
    container,
    destinationsModel,
    offersModel,
    onDataChange,
    onDestroy,
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newPointElement !== null) {
      return;
    }
    this.#newPointElement = new PointEditView({
      destinations: this.#destinationsModel.getAll(),
      offers: this.#offersModel.getAll(),
      onSubmiClick: this.#onSubmitForm,
      onCloseEditPoint: this.#onCloseForm,
      pointType: EditType.CREATING
    });

    render(this.#newPointElement, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydownDocument);
  }

  destroy = ({ isCanceled = true } = {}) => {
    if (!this.#newPointElement) {
      return;
    }
    remove(this.#newPointElement);
    this.#newPointElement = null;
    document.removeEventListener('keydown', this.#onEscKeydownDocument);

    this.#handleDestroy({ isCanceled });
  };

  #onSubmitForm = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );

    this.destroy({ isCanceled: false });
  };

  #onCloseForm = () => {
    this.destroy();
  };

  #onEscKeydownDocument = (evt) => {
    if (evt.keyCode === 27 || evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
