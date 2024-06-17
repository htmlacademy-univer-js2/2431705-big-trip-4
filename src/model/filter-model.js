import Observable from '../framework/observable.js';
import {FilterTypes} from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterTypes.EVERYTHING;
  get() {
    return this.#filter;
  }

  set(updteType, update){
    this.#filter = update;
    this._notify(updteType, update);
  }
}
