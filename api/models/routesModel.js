import routes from '../data/routes.js';

class RoutesModel {

    getRoutes(origin, destiny) {
        return routes.filter(element => element.departure_airport_iata == origin && element.arrival_airport_iata == destiny);
    }
}

export default new RoutesModel();