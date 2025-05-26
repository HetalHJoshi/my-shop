// // src/components/ProtectedRoute/ProtectedRoute.tsx
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import type { RootState } from "../app/store";

// interface ProtectedRouteProps {
//   /**
//    * If `reverse` is true, this route is _only_ for guests (e.g. SignIn/SignUp).
//    * Otherwise it’s for authenticated users.
//    */
//   reverse?: boolean;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   reverse = false,
// }) => {
//   // Get the user object from redux
//   const user = useSelector((state: RootState) => state.auth.user);

//   // We consider the user "logged in" if there's a truthy token
//   const isLoggedIn = Boolean(user?.token);

//   if (reverse) {
//     // Guest-only routes (e.g. /signin, /signup)
//     return isLoggedIn ? <Navigate to="/products" replace /> : <Outlet />;
//   }

//   // Protected routes
//   return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
// };
// src/components/ProtectedRoute/ProtectedRoute.tsx
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

// interface ProtectedRouteProps {
//   /**
//    * If `reverse` is true, only guests can see the route (e.g. SignIn/SignUp).
//    * Otherwise only authenticated users can see it.
//    */
//   reverse?: boolean;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   reverse = false,
// }) => {
//   // Grab both user and token from your auth slice
//   const { token } = useAppSelector((state: { auth: any }) => state.auth);

//   // Logged-in if we have a non-null token
//   const isLoggedIn = Boolean(token);

//   if (reverse) {
//     // If this is a guest-only page, redirect logged-in users → /products
//     return isLoggedIn ? <Navigate to="/products" replace /> : <Outlet />;
//   }

//   // If this is a protected page, redirect guests → /signin
//   return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
// };

// src/components/ProtectedRoute/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
  reverse?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  reverse = false,
}) => {
  const { user } = useAppSelector((s) => s.auth);
  const isLoggedIn = Boolean(user);

  if (reverse) {
    return isLoggedIn ? <Navigate to="/products" replace /> : <Outlet />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};
