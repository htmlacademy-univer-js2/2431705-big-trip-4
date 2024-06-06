import dayjs from 'dayjs';
import { sort } from './common.js';

const getOffersCost = (currentOffers, offers) => {
  let totalCost = 0;
  for (const id of currentOffers) {
    const offer = offers.find((ofr) => ofr.id === id);
    if (offer) {
      totalCost += offer.price;
    }
  }
  return totalCost;
};

export const getTripDates = (points) => {
  const sortedPoints = sort(points);

  if (sortedPoints.length === 0) {
    return '';
  }

  const startDate = dayjs(sortedPoints[0].dateFrom).format('DD MMM');
  const finishDate = dayjs(sortedPoints[sortedPoints.length - 1].dateTo).format('DD MMM');

  return `${startDate} &mdash; ${finishDate}`;
};

export const getTripRoute = (points, destinations) => {
  const sortedPoints = sort(points);

  const routeNames = sortedPoints.map((point) =>
    destinations.find((destination) => destination.id === point.destination)?.name
  );

  if (routeNames.length === 0) {
    return '';
  }

  const uniqueCities = new Set(routeNames);
  const startCity = routeNames[0];
  const endCity = routeNames[routeNames.length - 1];

  if (uniqueCities.size <= 3 && startCity !== endCity || uniqueCities.size === 1) {
    return [...uniqueCities].join(' &mdash; ');
  }

  return `${startCity} &mdash; ... &mdash; ${endCity}`;
};

export const calculateTripRoute = (points, destinations) => {
  const sortedPoints = sort(points);
  const route = [];

  for (const point of sortedPoints) {
    const destination = destinations.find((dest) => dest.id === point.destination);
    if (destination) {
      route.push(destination.name);
    }
  }

  return route;
};

export const getTotalCost = (points, offers) => {
  let totalCost = 0;

  for (const point of points) {
    const offer = offers.find((ofr) => point.type === ofr.type);
    const offerCost = getOffersCost(point.offers, offer?.offers) || 0;
    totalCost += point.basePrice + offerCost;
  }

  return totalCost;
};
