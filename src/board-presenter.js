import SortView from '../src/view/sort-view';
import EventListView from '../src/view/event-list-view';
import PointEditView from '../src/view/point-edit-view';
import PointView from '../src/view/point-view';
import {render, replace} from '../src/framework/render';


export default class BoardPresenter {
  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.getAll()];
  }

  init(){
    render(this.#sortComponent, this.container);
    render(this.#eventListComponent, this.container);
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point){
    const pointElement = new PointView({
      point: point,
      pointDestination: this.destinationsModel.getById(point.destination),
      pointOffers: this.offersModel.getByType(point.type),
      onEditClick:onEditClick
    });

    const editPointElement = new PointEditView({
      point: point,
      pointDestination: this.destinationsModel.getById(point.destination),
      pointOffers: this.offersModel.getByType(point.type),
      onCloseEditPoint:onCloseEditClick
    });

    function toggleEditElements(elementToShow, elementToHide) {
      replace(elementToShow, elementToHide);
    }

    function onEditClick() {
      toggleEditElements(editPointElement, pointElement);
      document.addEventListener('keydown', escKeydown);
    }

    function onCloseEditClick() {
      toggleEditElements(pointElement, editPointElement);
    }

    function escKeydown(evt) {
      if (evt.keyCode === 27 || evt.key === 'Escape') {
        evt.preventDefault();
        toggleEditElements(pointElement, editPointElement);
        document.removeEventListener('keydown', escKeydown);
      }
    }

    render(pointElement, this.#eventListComponent.element);
  }
}
