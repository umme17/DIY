import {Route} from 'react-router-dom';
import Login from '../pages/LoginPage';
import SignUp from '../pages/SignUpPage';

export const AuthRoutes = (
    <>
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/signup" element = {<SignUp/>}/>
    </>
);
