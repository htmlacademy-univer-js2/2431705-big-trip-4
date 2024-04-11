import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return `
<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${name}" ${count === 0 ? 'disabled' : ''}>${name}</label>
</div>`;
};

const createFiltersTemplate = (filters) =>{

  let filtersTemplate = '<form class="trip-filters" action="#" method="get">';

  filters.forEach((filter, i) => {
    filtersTemplate += createFilterTemplate(filter, i === 0);
  });

  filtersTemplate += '<button class="visually-hidden" type="submit">Accept filter</button></form>';
  return filtersTemplate;
};

export default class FilterView extends AbstractView{

  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
