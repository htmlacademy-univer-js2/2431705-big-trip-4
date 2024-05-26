import {render} from '../framework/render.js';
import NewPointButtonView from '../view/new-point-button-view.js';

export default class NewPointButtonPresenter {

  #container;
  #button;
  #onButtonClick;

  constructor({container}){
    this.#container = container;
  }

  init({onButtonClick}){
    this.#onButtonClick = onButtonClick;
    this.#button = new NewPointButtonView({onClick: this.#onButtonClick});
    render(this.#button, this.#container);
  }

  enableButton() {
    this.#button.setDisabled(false);
  }

  disableButton() {
    this.#button.setDisabled(true);
  }
}
