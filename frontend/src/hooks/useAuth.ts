import {useAuthContext} from '../contexts/AuthContext';
import * as authService from '../services/auth.services';

// interface AuthResponse {
//     accessToken: string;
//     user: any;
// }

export const useAuth = () => {
    const {user, setUser} = useAuthContext();

    const signup = async({firstName, lastName, email, password}: {firstName: string, lastName: string, email: string, password: string}) => {
        try{
            const res = await authService.signup({firstName, lastName, email, password});
            localStorage.setItem("accessToken", res.accessToken);
            setUser(res.user);
            return res;
        }catch (error) {
            setUser(null);
            throw error;
        }
    }

    const login = async ({email, password}: {email: string, password: string}) => {
        try{
            const res = await authService.login({email, password});
            localStorage.setItem("accessToken", res.accessToken);
            setUser(res.user);
            return res;
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
        signup,
        login,
        logout
    };
};