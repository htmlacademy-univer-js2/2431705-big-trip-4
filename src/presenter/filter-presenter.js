import { UpdateType } from '../const';
import { render, replace, remove } from '../framework/render';
import { filter } from '../utils/utils.js';
import FilterView from '../view/filter-view';

export default class FilterPresenter {
  #filterElement = null;
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #currentFilter = null;

  constructor({ container, pointsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelChange);
    this.#filterModel.addObserver(this.#handleModelChange);
  }

  get filters() {
    const points = this.#pointsModel.getAll();
    return Object.entries(filter)
      .map(([filterType, filterPoints]) => (
        {
          type: filterType,
          isDisabled: filterPoints(points).length === 0,
          isChecked: filterType === this.#currentFilter,
        }));
  }

  init() {
    this.#currentFilter = this.#filterModel.get();
    const prevFilterElement = this.#filterElement;

    const filters = this.filters;

    this.#filterElement = new FilterView({
      items: filters,
      onItemChange: this.#onChangeFilter,
    });

    if (!prevFilterElement) {
      render(this.#filterElement, this.#container);
      return;
    }

    replace(this.#filterElement, prevFilterElement);
    remove(prevFilterElement);
  }

  #onChangeFilter = (filterType) => {
    this.#filterModel.set(UpdateType.MAJOR, filterType);
  };

  #handleModelChange = () => {
    this.init();
  };
}
