// src/pages/ProductList.tsx
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SidebarFilters, type FilterOpts } from "../components/SidebarFilters";
import { useAppSelector } from "../app/hooks";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  discount: number;
  photo: string;
  description: string;
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [visibleCount, setVisibleCount] = useState(2); // Show 2 initially
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/products";

  const searchTerm = useAppSelector((state) =>
    state.search.searchTerm.toLowerCase()
  );

  const [currentFilters, setCurrentFilters] = useState<FilterOpts>({
    sortBy: "price",
    sortDir: "asc",
    category: "",
    priceMin: 0,
    priceMax: 10000,
    ratingMin: 0,
    discountMin: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Product[]>(API_URL);
        setProducts(res.data);
        setFilteredProducts(res.data);
        const uniqueCats = Array.from(new Set(res.data.map((p) => p.category)));
        setCategories(uniqueCats);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters(currentFilters, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, products]);

  const applyFilters = (opts: FilterOpts, search: string) => {
    const {
      sortBy,
      sortDir,
      category,
      priceMin,
      priceMax,
      ratingMin,
      discountMin,
    } = opts;

    let updated = [...products];

    if (category) {
      updated = updated.filter((p) => p.category === category);
    }

    updated = updated.filter(
      (p) =>
        p.price >= priceMin &&
        p.price <= priceMax &&
        p.rating >= ratingMin &&
        p.discount >= discountMin
    );

    if (search) {
      updated = updated.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    updated.sort((a, b) => {
      if (sortBy === "price") {
        return sortDir === "asc"
          ? Number(a.price) - Number(b.price)
          : Number(b.price) - Number(a.price);
      }

      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDir === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }

      return 0;
    });

    setFilteredProducts(updated);
    setVisibleCount(2); // Reset visible count on new filters/search
  };

  const handleFilterChange = (opts: FilterOpts) => {
    setCurrentFilters(opts);
    applyFilters(opts, searchTerm);
  };

  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${API_URL}/${productToDelete.id}`);
      const updated = products.filter((p) => p.id !== productToDelete.id);
      setProducts(updated);
      setFilteredProducts(updated);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleEdit = (id: number) => {
    navigate(`/products/${id}/edit`);
  };

  // Infinite Scroll Observer
  useEffect(() => {
    if (!loadMoreRef.current) return;
    if (visibleCount >= filteredProducts.length) return; // All loaded

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => {
            if (prev < filteredProducts.length) {
              return Math.min(prev + 2, filteredProducts.length);
            }
            return prev;
          });
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [filteredProducts]); // Run when filtered products change

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        <Typography mt={2}>Loading Products...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ display: "flex", mt: 4 }}>
      <Paper elevation={2} sx={{ width: 300, p: 2, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Filter & Sort
        </Typography>
        <SidebarFilters categories={categories} onFilter={handleFilterChange} />
      </Paper>

      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <Box sx={{ flexGrow: 1 }}>
        {filteredProducts.length === 0 ? (
          <Typography variant="h6">No products match your filters.</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "flex-start",
            }}
          >
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: "260px",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fff",
                  boxShadow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  src={product.photo || "/fallback-image.png"}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback-image.png";
                  }}
                  sx={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    mb: 1,
                    backgroundColor: "#f0f0f0",
                  }}
                />

                <Typography variant="h6" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  ₹{product.price}
                </Typography>
                <Typography variant="body2">⭐ {product.rating}</Typography>
                <Typography variant="body2">
                  🎯 {product.discount}% off
                </Typography>

                <Box mt={2} display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => openDeleteDialog(product)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}

            {/* Infinite Scroll Loader */}
            {visibleCount < filteredProducts.length && (
              <Box
                ref={loadMoreRef}
                sx={{ width: "100%", textAlign: "center", py: 3 }}
              >
                <CircularProgress size={24} />
                <Typography variant="body2" mt={1}>
                  Loading more products...
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{productToDelete?.name}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>No</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
