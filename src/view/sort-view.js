import RadioListView from './radio-list-view';

function createSortElement({ sorts }) {
  let text = '<form class="trip-events__trip-sort  trip-sort" action="#" method="get">';
  sorts.forEach((sort) => {
    text += `<div class="trip-sort__item  trip-sort__item--${sort.type}">
                <input data-item = "${sort.type}" id="sort-${sort.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.type}" ${sort.isDisabled ? 'disabled' : ''}
                ${sort.isChecked ? 'checked' : ''}>
                <label class="trip-sort__btn" for="sort-${sort.type}">${sort.type}</label>
              </div>`;
  });
  return `${text}</form>`;
}

export default class SortView extends RadioListView{
  get template() {
    return createSortElement({ sorts: this.items });
  }
}
