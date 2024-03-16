import React from "react"
import { Navigate } from "react-router-dom"

export const PrivateModuleRouter = ({
  component: Component,
  userPermissions,
  requiredPermissions,
}) => {
  const permissions = userPermissions ? userPermissions["permissions"] : {}
  const hasPermission = requiredPermissions.every(
    (permission) => permissions[permission]
  )
  return hasPermission ? (
    <Component />
  ) : (
    <Navigate to={"/no-access-page"} replace />
  )
}
