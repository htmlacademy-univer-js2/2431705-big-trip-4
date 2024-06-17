import { EnabledSortType, PointSorts } from '../const';
import { render, remove } from '../framework/render';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #container = null;

  #sortElement = null;
  #handleSortChange = null;
  #currentSortPoint = null;

  constructor({ container,currentSortType, handleSortChange }) {
    this.#container = container;
    this.#currentSortPoint = currentSortType;
    this.#handleSortChange = handleSortChange;
  }

  destroy() {
    remove(this.#sortElement);
  }

  init() {
    const items = Object.values(PointSorts).map((sort) => ({
      type: sort,
      isChecked: sort === this.#currentSortPoint,
      isDisabled: !EnabledSortType[sort],
    }));

    this.#sortElement = new SortView({items : items,onItemChange: this.#onSortChange});
    render(this.#sortElement, this.#container);

  }

  #onSortChange = (sortType) => {
    if (this.#currentSortPoint !== sortType) {
      this.#currentSortPoint = sortType;
      this.#handleSortChange(sortType);
    }
  };
}
