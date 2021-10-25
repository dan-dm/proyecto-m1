import HttpError from 'http-errors';
import searchModel from '../models/searchModel.js';

const getAirlines = (req, res, next) => {
    const response = searchModel.getAirlines(); 
    res.status(201).json(response);
}

const getAirports = (req, res, next) => {
    const response = searchModel.getAirports(); 
    res.status(201).json(response);
}

const getCities = (req, res, next) => {
    const response = searchModel.getCities(); 
    res.status(201).json(response);
}

const getCountries = (req, res, next) => {
    const response = searchModel.getCountries(); 
    res.status(201).json(response);
}

export default {
    getAirlines,
    getAirports,
    getCities,
    getCountries
}