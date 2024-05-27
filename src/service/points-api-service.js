import ApiService from '../framework/api-service';
import { Method } from '../const';

export default class PointsApiService extends ApiService
{
  async getDestinations() {
    const response = await this._load({ url: 'destinations' });
    return ApiService.parseResponse(response);
  }

  async getOffers() {
    const response = await this._load({url: 'offers'});
    return ApiService.parseResponse(response);
  }

  async getPoints() {
    const response = await this._load({url: 'points'});
    return ApiService.parseResponse(response);
  }

  async updatePoint(update){
    const response = await this._load({
      url : `points/${update.id}`,
      method : Method.PUT,
      body: JSON.stringify(update),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return ApiService.parseResponse(response);
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }
}
