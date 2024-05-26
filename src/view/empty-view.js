import AbstractView from '../framework/view/abstract-view';


function createEmptyTemplate(){
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyView extends AbstractView{

  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template(){
    return createEmptyTemplate();
  }
}
