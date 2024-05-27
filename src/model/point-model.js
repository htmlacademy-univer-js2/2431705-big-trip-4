import Observable from '../framework/observable';
import { updateItem } from '../mock/util.js';
import {UpdateType} from '../const.js';
import { adaptToClient, adaptToServer } from '../utils/adapter.js';

export default class PointsModel extends Observable {
  #points = [];
  #service;
  #destinationsModel;
  #offersModel;

  constructor({service, destinationsModel, offersModel}) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  async init() {
    try {

      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init(),
      ]);
      const points = await this.#service.getPoints();
      this.#points = points.map(adaptToClient);
      this._notify(UpdateType.INIT, {isError : false});
    } catch (error) {

      this.#points = [];
      this._notify(UpdateType.INIT, {isError : true, error });
    }
  }

  getAll() {
    return this.#points;
  }

  getById(id) {
    return this.#points.find((point) => point.id === id);
  }

  add(type, point) {
    const newPoint = this.#service.addPoint(point);
    this.#points.push(newPoint);
    this._notify(type, newPoint);
  }

  async update(type, point) {
    try{
      const updatedPoint = await this.#service.updatePoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(type, adaptedPoint);
    }
    catch {
      throw new Error('Can\'t update point');
    }
  }

  delete(type, deletedPoint) {
    this.#service.deletePoint(deletedPoint);
    this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);
    this._notify(type);
  }
}
