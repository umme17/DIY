import type {Request, Response, NextFunction} from 'express';
import * as userService from './user.service.js';


export const getAllUsers = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const users = await userService.getUsersService();
        res.status(200).json(users);
    }catch(error){
        next(error);
    }
};
