// // src/components/Navbar.tsx
// import React from "react";
// import { AppBar, Toolbar, Typography, Box, InputBase } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { styled, alpha } from "@mui/material/styles";
// import { Link as RouterLink } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

// // Styled search components (you can adjust as you like)
// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
//   marginLeft: theme.spacing(2),
//   width: "100%",
//   [theme.breakpoints.up("sm")]: { width: "auto" },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: { width: "20ch" },
//   },
// }));

// export const Navbar: React.FC = () => {
//   const { user } = useAppSelector((state) => state.auth);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography
//           variant="h6"
//           component={RouterLink}
//           to="/"
//           sx={{ textDecoration: "none", color: "inherit" }}
//         >
//           MyApp
//         </Typography>

//         {/* only show the search bar if the user is logged in */}
//         {user && (
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ "aria-label": "search" }}
//             />
//           </Search>
//         )}

//         <Box sx={{ flexGrow: 1 }} />

//         {/* ... your sign in/out buttons, profile menu, etc. */}
//       </Toolbar>
//     </AppBar>
//   );
// };
// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   InputBase,
//   Button,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import { styled, alpha } from "@mui/material/styles";
// import { Link as RouterLink } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

// // Styled search components
// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
//   marginLeft: theme.spacing(2),
//   width: "100%",
//   [theme.breakpoints.up("sm")]: { width: "auto" },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: { width: "20ch" },
//   },
// }));

// export const Navbar: React.FC = () => {
//   const { user } = useAppSelector((state) => state.auth);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography
//           variant="h6"
//           component={RouterLink}
//           to="/"
//           sx={{ textDecoration: "none", color: "inherit" }}
//         >
//           MyApp
//         </Typography>

//         {user && (
//           <>
//             <Search>
//               <SearchIconWrapper>
//                 <SearchIcon />
//               </SearchIconWrapper>
//               <StyledInputBase
//                 placeholder="Search…"
//                 inputProps={{ "aria-label": "search" }}
//               />
//             </Search>

//             <Box sx={{ flexGrow: 1 }} />

//             <Button
//               variant="contained"
//               color="secondary"
//               component={RouterLink}
//               to="/add-product"
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 500,
//                 boxShadow: "none",
//               }}
//             >
//               + Create Product
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { setSearchTerm } from "../features/search/searchSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: { width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: { width: "20ch" },
  },
}));

export const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          MyApp
        </Typography>

        {user && (
          <>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchChange}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />

            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/add-product"
              sx={{
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
              }}
            >
              + Create Product
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
