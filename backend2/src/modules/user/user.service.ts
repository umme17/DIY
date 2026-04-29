import * as userRepo from './user.repository.js';


export const getUsersService = async() => {
    return await userRepo.getAllUsers();
}