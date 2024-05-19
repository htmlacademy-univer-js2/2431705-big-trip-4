import AbstractView from '../framework/view/abstract-view.js';


export default class RadioListView extends AbstractView{
  items = [];
  #handleItemChange;

  constructor({items, onItemChange}){
    super();

    this.#handleItemChange = onItemChange;
    this.items = items;
    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  #itemChangeHandler = (evt) => {
    this.#handleItemChange?.(evt.target.dataset.item);
  };
}
