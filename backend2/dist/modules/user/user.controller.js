import * as userService from './user.service.js';
export const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = await userService.createUserService(firstName, lastName, email, password);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsersService();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=user.controller.js.map