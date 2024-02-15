import { UserContext } from "@/context/UserContext"
import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

const AuthRoutes = () => {
    const {user} = useContext(UserContext)


  return user.email ? <Outlet/> : <Navigate to="/login"/>
}

export default AuthRoutes