// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { signin } from "../features/auth/authSlice";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// export const SignIn: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { status, error, user } = useAppSelector((s) => s.auth);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [showError, setShowError] = useState(false);

//   // show error snackbar whenever `error` appears
//   useEffect(() => {
//     if (error) setShowError(true);
//   }, [error]);

//   // when we go from loading→idle and user is set, show success & navigate
//   const prevStatus = React.useRef(status);
//   useEffect(() => {
//     if (prevStatus.current === "loading" && status === "idle" && user) {
//       setShowSuccess(true);
//       navigate("/products", { replace: true });
//     }
//     prevStatus.current = status;
//   }, [status, user, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowError(false);
//     setShowSuccess(false);

//     try {
//       await dispatch(signin({ email, password })).unwrap();
//     } catch {
//       // nothing—error snack is handled by the error effect
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         maxWidth: 400,
//         mx: "auto",
//         mt: 4,
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//       }}
//     >
//       <Typography variant="h5" align="center">
//         Sign In
//       </Typography>

//       <TextField
//         label="Email"
//         type="email"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <TextField
//         label="Password"
//         type="password"
//         required
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <Button type="submit" variant="contained" disabled={status === "loading"}>
//         {status === "loading" ? <CircularProgress size={24} /> : "Login"}
//       </Button>

//       {/* Success Snackbar */}
//       <Snackbar
//         open={showSuccess}
//         autoHideDuration={3000}
//         onClose={() => setShowSuccess(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           severity="success"
//           onClose={() => setShowSuccess(false)}
//           sx={{ width: "100%" }}
//         >
//           Login successful!
//         </Alert>
//       </Snackbar>

//       {/* Error Snackbar */}
//       <Snackbar
//         open={showError}
//         autoHideDuration={4000}
//         onClose={() => setShowError(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           severity="error"
//           onClose={() => setShowError(false)}
//           sx={{ width: "100%" }}
//         >
//           {error ?? "Login failed, please try again."}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// src/pages/SignIn.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signin } from "../features/auth/authSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, error, user } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // track previous status for transition detection
  const prevStatus = useRef(status);

  // show error snackbar when error appears
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // on loading→idle with a user, show success and navigate
  useEffect(() => {
    if (prevStatus.current === "loading" && status === "idle" && user) {
      setShowSuccess(true);
      navigate("/products", { replace: true });
    }
    prevStatus.current = status;
  }, [status, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    setShowSuccess(false);

    try {
      await dispatch(signin({ email, password })).unwrap();
    } catch {
      // handled by error effect
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center">
        Sign In
      </Typography>

      <TextField
        label="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={status === "loading"}>
        {status === "loading" ? <CircularProgress size={24} /> : "Login"}
      </Button>

      <Typography variant="body2" align="center">
        Don’t have an account?{" "}
        <Link component={RouterLink} to="/signup">
          Sign Up
        </Link>
      </Typography>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ width: "100%" }}
        >
          Login successful!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          onClose={() => setShowError(false)}
          sx={{ width: "100%" }}
        >
          {error ?? "Login failed, please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};
