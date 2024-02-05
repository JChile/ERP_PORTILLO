import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateModuleRouter = ({
  component: Component,
  userPermissions,
  requiredPermissions,
}) => {
  const permissions = userPermissions ? userPermissions["permissions"] : {};
  console.log(permissions, requiredPermissions);
  const hasPermission = requiredPermissions.every(
    (permission) => permissions[permission]
  );
  console.log(hasPermission);
  return hasPermission ? (
    <Component />
  ) : (
    <Navigate to={"/no-access-page"} replace />
  );
};
