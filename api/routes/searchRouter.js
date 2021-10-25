import Router from 'express';
import searchController from '../controllers/searchController.js';

const router = Router();

router.route('/airlines')
    .get(searchController.getAirlines);

router.route('/airports')
    .get(searchController.getAirports);

router.route('/cities')
    .get(searchController.getCities);

router.route('/countries')
    .get(searchController.getCountries);

export default router;
