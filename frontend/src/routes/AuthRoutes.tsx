import {Route} from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

export const AuthRoutes = (
    <>
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/register" element = {<Register/>}/>
    </>
);
