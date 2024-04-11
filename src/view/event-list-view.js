import AbstractView from '../framework/view/abstract-view.js';

function createEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventListView extends AbstractView{
  get template() {
    return createEventsListTemplate();
  }
}
