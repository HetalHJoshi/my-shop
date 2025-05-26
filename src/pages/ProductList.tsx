import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  CssBaseline,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

// Constants
const drawerWidth = 240;

// Styled search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: "auto",
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
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://buildproduct.free.beeceptor.com/api/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const f = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
  }, [search, products]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            ProductApp
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
          {/* Logo placeholder */}
          <Button
            color="inherit"
            onClick={() => navigate("/products/new")}
            sx={{ mr: 2 }}
          >
            Create Product
          </Button>
          <Box
            component="img"
            src="/logo192.png"
            alt="Logo"
            sx={{ ml: 2, height: 40 }}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Products", "Orders"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          mt: 8,
          mb: 8,
        }}
      >
        {filtered.length === 0 ? (
          <Typography>No products found.</Typography>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {filtered.map((p) => (
              <Box
                key={p.id}
                sx={{ flex: "1 1 calc(33.333% - 16px)", minWidth: 240 }}
              >
                <Paper sx={{ p: 2 }} elevation={3}>
                  <Typography variant="h6">{p.name}</Typography>
                  <Typography>Category: {p.category}</Typography>
                  <Typography>Price: ₹{p.price}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          left: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          bgcolor: "grey.200",
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © 2025 ProductApp. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
