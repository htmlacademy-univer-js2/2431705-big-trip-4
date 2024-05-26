import Observable from '../framework/observable';
import { updateItem } from '../mock/util.js';

export default class PointsModel extends Observable {
  #points;
  #service;

  constructor(service) {
    super();
    this.#service = service;
    this.#points = this.#service.getPoints();
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

  update(type, point) {
    const updatedPoint = this.#service.updatePoint(point);
    this.#points = updateItem(this.#points, updatedPoint);
    this._notify(type, updatedPoint);
  }

  delete(type, deletedPoint) {
    this.#service.deletePoint(deletedPoint);
    this.#points = this.#points.filter((point) => point.id !== deletedPoint.id);
    this._notify(type);
  }
}
