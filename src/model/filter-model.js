import Observable from '../framework/observable.js';
import {FILTER_TYPES} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FILTER_TYPES.EVERYTHING;
  get() {
    return this.#filter;
  }

  set(updteType, update){
    this.#filter = update;
    this._notify(updteType, update);
  }
}
