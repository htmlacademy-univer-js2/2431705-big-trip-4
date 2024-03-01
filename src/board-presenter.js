import SortView from '../src/view/sort-view';
import EventListView from '../src/view/event-list-view';
import PointEditView from '../src/view/point-edit-view';
import PointView from '../src/view/point-view';
import {render} from '../src/render';

const POINT_COUNT = 3;

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init(){
    render(this.eventListComponent, this.container);
    render(this.sortComponent, this.container);
    render(new PointEditView(), this.eventListComponent.getElement());

    for(let i = 0; i < POINT_COUNT; i++){
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}
