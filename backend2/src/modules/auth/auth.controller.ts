import type {Request, Response, NextFunction} from 'express';
import { signupSchema, loginSchema } from './auth.schema.js';
import * as authService from './auth.service.js';

export const createUser = async(req:Request, res:Response, next:NextFunction) => {
    
    try{
        const {firstName, lastName, email, password,profilePic} = signupSchema.parse(req.body);
        const result= await authService.signUpService(firstName, lastName, email, password, profilePic);

        res.cookie('refreshToken', result.refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })

    res.json({accessToken: result.accessToken, user: result.user});
    res.status(201).json(result);
    }catch(error){
        next(error);
    }
};

export const loginUser = async(req:Request, res:Response, next:NextFunction) => {

try{
    const data = loginSchema.parse(req.body);
    const result = await authService.loginService(data.email, data.password);
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })
    res.json({accessToken: result.accessToken, user: result.user});
    }catch(error){
        next(error);
    }
}


export const refreshToken = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const token = req.cookies.refreshToken;

    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }
    const result = await authService.refreshTokenService(token);
    res.cookie('refreshToken', result.refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    });
    res.json({accessToken: result.accessToken});
    }catch(error){
        next(error);
    }
}

export const logoutUser = async(req:Request, res:Response, next:NextFunction) => {
    try{
        const token = req.cookies.refreshToken;

    if(!token){
        return res.status(400).json({message: 'No token provided'});
    }

    await authService.logoutService(token);
    res.clearCookie('refreshToken');
    res.json({message: 'Logged out successfully'});
    }catch(error){
        next(error);
    }
}