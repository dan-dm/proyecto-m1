import HttpError from 'http-errors';
import routesModel from '../models/routesModel.js';

const getRoutes = (req, res, next) => {
    let origin = req.query.origin;
    let destiny = req.query.destiny;
    const response = routesModel.getRoutes(origin, destiny); 
    res.status(201).json(response);
}

export default {
    getRoutes,
}