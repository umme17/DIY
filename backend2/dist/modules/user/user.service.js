import * as userRepo from './user.repository.js';
export const createUserService = async (firstName, lastName, email, password) => {
    if (!firstName || !lastName || !email || !password) {
        throw new Error('Missing required fields');
    }
    return await userRepo.createUser(firstName, lastName, email, password);
};
export const getUsersService = async () => {
    return await userRepo.getAllUsers();
};
//# sourceMappingURL=user.service.js.map