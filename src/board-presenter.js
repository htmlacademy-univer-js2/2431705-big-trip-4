import SortView from '../src/view/sort-view';
import EventListView from '../src/view/event-list-view';
import PointEditView from '../src/view/point-edit-view';
import PointView from '../src/view/point-view';
import {render} from '../src/render';

const POINT_COUNT = 5;

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.getAll()];
  }

  init(){
    render(this.eventListComponent, this.container);
    render(this.sortComponent, this.container);
    render(new PointEditView({
      point: this.points[0],
      pointDestination: this.destinationsModel.getById(this.points[0].destination),
      pointOffers: this.offersModel.getByType(this.points[0].type)
    }), this.eventListComponent.getElement());

    for(let i = 1; i < POINT_COUNT; i++){
      render(new PointView({
        point: this.points[i],
        pointDestination: this.destinationsModel.getById(this.points[i].destination),
        pointOffers: this.offersModel.getByType(this.points[i].type),
      }), this.eventListComponent.getElement());
    }
  }
}
