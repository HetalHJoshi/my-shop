// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";

import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { ProductList } from "./pages/ProductList";
import { ProductForm } from "./pages/ProductForm";
import { ProductDetails } from "./pages/ProductDetails";

import { Snackbar, Alert } from "@mui/material";

const AppRoutes: React.FC = () => {
  const { user, status } = useAppSelector((state) => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Whenever we finish a signin (status === 'idle' & user exists), show success
  useEffect(() => {
    if (status === "idle" && user) {
      setSnackbarOpen(true);
    }
  }, [status, user]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Login-success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login successful
        </Alert>
      </Snackbar>

      <Routes>
        {/* root — redirect based on auth */}
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/products" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Public pages */}
        <Route element={<ProtectedRoute reverse />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
        </Route>

        {/* Catch-all */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/products" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
