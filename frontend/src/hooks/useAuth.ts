import {useAuthContext} from '../contexts/AuthContext';
import * as authService from '../services/auth.services';

export const useAuth = () => {
    const {user, setUser} = useAuthContext();

    const login = async (email: string, password : string) => {
        try{
            const res = await authService.login({email, password});
            setUser(res.user);
        }catch (error) {
            setUser(null);
            throw error;
        }
    }

    const logout = async () => {
        await authService.logout();
        setUser(null);
    }

    return {
        user,
        login,
        logout
    };
};