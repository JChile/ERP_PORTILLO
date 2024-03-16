import React, { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate } from "react-router-dom"

export const PublicRoutes = ({ component: Component }) => {
  const { currentUser } = useContext(AuthContext)
  return !currentUser ? <Component /> : <Navigate to={"/home"} replace />
}
