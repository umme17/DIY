import {Navigate, Outlet} from "react-router-dom"

function ProtectedRoute() {
    const token = localStorage.getItem("token");
    
    if(!token) return <Navigate to = 'login'/>
    else return <Outlet/>
}

export default ProtectedRoute
