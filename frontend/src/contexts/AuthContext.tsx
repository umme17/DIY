import {createContext, useState, useContext} from 'react';

type AuthContextType = {
    user: any;
    setUser: (user:any) => void;
}

export const AuthContext = createContext < AuthContextType | null> (null);

export const AuthProvider = ({children} : any) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value = {{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
} 

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}