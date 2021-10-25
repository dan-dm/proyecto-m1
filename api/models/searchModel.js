import airlines from '../data/airlines.js';
import airports from '../data/airports.js';
import cities from '../data/cities.js';
import countries from '../data/countries.js';

class SearchModel {

    getAirlines() {
        return airlines.map(x => x.code);
    }

    getAirports() {
        return airports.map(x => x.code);
    }

    getCities() {
        return cities.map(x => x.code);
    }

    getCountries() {
        return countries.map(x => x.code);
    }

}

export default new SearchModel();