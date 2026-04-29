import * as authRepo from './auth.repository.js';
import {findUserByEmail} from '../user/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { redis } from '../../config/redis.js';
import {v4 as uuidv4} from 'uuid';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const signUpService = async (firstName: string, lastName: string, email: string, password: string, profilePic?:string) => {
    const existingUser = await findUserByEmail(email);

    if(existingUser){
        throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authRepo.createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
    )


    const sessionId = uuidv4();

    const accessToken = jwt.sign({userId:user.id, email: user.email}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId:user.id, sessionId}, JWT_REFRESH_SECRET, {expiresIn: '7d'});   

    await redis.set(
        `rt:${sessionId}`, 
        user.id, 
        {
            ex: 7 * 24 * 60 * 60 // "EX" becomes a property in an object
        }
    );


    return {
        accessToken,
        refreshToken,
        user:{
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profilePic: user.profile_pic
        },
    }
}


export const loginService = async(email: string, password: string) => {
    console.log("Login service called with email:", email);
    const user = await findUserByEmail(email);

    if(!user){
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        console.log("Password mismatch for email:", email);
        throw new Error('Invalid email or password');
    }

    const sessionId = uuidv4();

    const accessToken = jwt.sign({userId:user.id, email: user.email}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId:user.id, sessionId}, JWT_REFRESH_SECRET, {expiresIn: '7d'});   

    await redis.set(
        `rt:${sessionId}`, 
        user.id, 
        {
            ex: 7 * 24 * 60 * 60 // "EX" becomes a property in an object
        }
    );

    return{
        accessToken,
        refreshToken,
        user:{
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profilePic: user.profile_pic
        },
    };
};

export const refreshTokenService = async(refreshToken: string) => {
    let decoded:any;

    try{
        decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    
    }catch(err){
        throw new Error('Invalid refresh token');
    }

    const  {sessionId, userId} = decoded;
    const storedUserId  = await redis.get(`rt: ${sessionId}`);

    if(!storedUserId){
        throw new Error('Invalid refresh token | expired session id');
    }

    if(storedUserId !== userId){
        throw new Error('Invalid refresh token');
    }

    // rotation

    await redis.del(`rt: ${sessionId}`);

    const newSessionId = uuidv4();

    const newRefreshToken = jwt.sign({userId, sessionId: newSessionId}, JWT_REFRESH_SECRET, {expiresIn: '7d'});

    await redis.set(
        `rt: ${newSessionId}`,
        userId,
    {ex :7 * 24 * 60 * 60} // 7 days in seconds
    )

    const newAccessToken = jwt.sign({userId}, JWT_ACCESS_SECRET, {expiresIn: '15m'});

    return{
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    }
}


export const logoutService = async(refreshToken: string) => {
    let decoded:any;

    try{
        decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    
    }catch(err){
        throw new Error('Invalid refresh token');
    }

    const  {sessionId, userId} = decoded;
    const storedUserId  = await redis.get(`rt: ${sessionId}`);

    if(!storedUserId){
        throw new Error('Invalid refresh token | expired session id');
    }

    if(storedUserId !== userId){
        throw new Error('Invalid refresh token');
    }

    // rotation

    await redis.del(`rt: ${sessionId}`);
}
