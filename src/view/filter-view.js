import AbstractRadioListView from './radio-list-view.js';

const createFilterTemplate = (filter) => {
  const {type, isDisabled, isChecked} = filter;
  return `
<div class="trip-filters__filter">
  <input data-item = "${type}" id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
</div>`;
};

const createFiltersTemplate = ({filters}) =>{

  let filtersTemplate = '<form class="trip-filters" action="#" method="get">';
  filters.forEach((filter) => {
    filtersTemplate += createFilterTemplate(filter);
  });

  filtersTemplate += '<button class="visually-hidden" type="submit">Accept filter</button></form>';
  return filtersTemplate;
};

export default class FilterView extends AbstractRadioListView{

  get template() {
    return createFiltersTemplate({filters: this.items});
  }
}
