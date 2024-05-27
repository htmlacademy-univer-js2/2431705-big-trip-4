import AbstractView from '../framework/view/abstract-view';

const createErrorTemplate = () => `
  <p class="trip-events__msg">
    Failed to load latest route information
  </p >
`;

export default class ErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}
