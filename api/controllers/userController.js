import HttpError from 'http-errors';
import userModel from '../models/userModel.js';
import uniqid from 'uniqid';
import bcrypt from 'bcrypt';
import authHandler from "../middlewares/authHandler.js"


const register = (req, res, next) => {
    try {
        const userId = uniqid();
        const body = req.body;
        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {
            const user = {
                "userId": userId,
                "username": body.username,
                "password": body.password,
                "rol": "user",
                "routes": body.routes !== undefined ? body.routes : []
            };
            
            const result = userModel.createUser(user);
            if (result < 0)
                next(HttpError(400, { message: 'No se pudo registrar' }))
            res.status(201).json(result);
        };
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {

    try {
        const body = req.body;
        if (!body.username || !body.password) {
            next(HttpError(400, { message: 'Error en los parámetros de entrada' }))
        } else {
            const result = userModel.getUser({ username: body.username });
            
            if (result === undefined) {
                next(HttpError(401, { message: 'Username or Password incorrect' }));
            } else {
                const passwordCorrect = await bcrypt.compare(body.password, result.password);
                if (!passwordCorrect) {
                    next(HttpError(401, { message: 'Username or Password incorrect' }));
                }
                else {
                    //GENERAMOS EL TOKEN
                    const token = await authHandler.generateToken(body.username);
                    res.status(200).json({ token: token });
                }
            }
        }
    }
    catch (error) {
        next(error);
    }
};

const getUserRoutes = async (req, res, next) => {

    const token = authHandler.getTokenFrom(req);
    const decodedToken = await authHandler.tokenVerify(token);
    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({ username: decodedToken.username });
        const response = user.routes;
        res.status(200).json(response);
    }
};

const addUserRoutes = async (req, res, next) => {
    const token = authHandler.getTokenFrom(req);
    const decodedToken = await authHandler.tokenVerify(token);
    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({ username: decodedToken.username });
        let routesArr = user.routes;
        let newRoutesArr = req.body;
        if (Array.isArray(newRoutesArr)) {
            for (const item of newRoutesArr) {
                routesArr.push(item);
            }
        } else {
            routesArr = [
                ...routesArr,
                newRoutesArr,
            ];
        }
        user.routes = routesArr;
        res.status(200).json(user.routes);
    }
};

const clearUserRoutes = async (req, res, next) => {
    const token = authHandler.getTokenFrom(req);
    const decodedToken = await authHandler.tokenVerify(token);
    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({ username: decodedToken.username });
        user.routes = [];
        res.status(200).json(user.routes);
    }
};
 
const getUsers  = async (req, res, next) => {
    const token = authHandler.getTokenFrom(req);
    const decodedToken = await authHandler.tokenVerify(token);
    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({ username: decodedToken.username });
        if(user.rol=="admin"){
            
            res.status(200).json(userModel.getUsers());
        }
    }
};

const deleteUser = async (req, res, next) => {
    const token = authHandler.getTokenFrom(req);
    const decodedToken = await authHandler.tokenVerify(token);
    if (!token || !decodedToken.username) {
        next(HttpError(401, { message: 'token invalid or missing' }))
    } else {
        const user = userModel.getUser({ username: decodedToken.username });
        if(user.rol=="admin"){
            console.log(req.query.user);
            userModel.deleteUser(req.params.user);
        }
        res.status(200).json(userModel.getUsers());
    }
};

export default {
    register,
    login,
    getUserRoutes,
    addUserRoutes,
    clearUserRoutes,
    deleteUser,
    getUsers
};