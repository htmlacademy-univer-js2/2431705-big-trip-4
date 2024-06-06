import AbstractView from '../framework/view/abstract-view';
import { EmptyListMessage } from '../const.js';

function createEmptyTemplate({message}){
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EmptyView extends AbstractView{

  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template(){
    return createEmptyTemplate({message : EmptyListMessage[this.#filterType]});
  }
}
