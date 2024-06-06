import Observable from '../framework/observable';
import { updateItem } from '../utils/common.js';
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

  async add(type, point) {
    try {
      const adaptedToServerPoint = adaptToServer(point);
      const newPoint = await this.#service.addPoint(adaptedToServerPoint);
      const adaptedToClientPoint = adaptToClient(newPoint);

      this.#points.push(adaptedToClientPoint);
      this._notify(type, adaptedToClientPoint);
    } catch {
      throw new Error('Can\'t add point');
    }
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

  async delete(type, deletedPoint) {
    try {
      const adaptedToServerPoint = adaptToServer(deletedPoint);
      await this.#service.deletePoint(adaptedToServerPoint);
      this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);
      this._notify(type);
    } catch {
      throw new Error('Can\'t delete point');
    }
  }
}
