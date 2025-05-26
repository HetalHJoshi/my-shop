// src/pages/ProductDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useDeleteProduct } from "../features/products/useProducts";
import { CircularProgress, Button, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useProduct(id!);
  const deleteMutation = useDeleteProduct();

  if (isLoading) return <CircularProgress />;
  if (isError || !product) return <p>Error loading product.</p>;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(product.id, {
        onSuccess: () => navigate("/products"),
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>

      <Box
        component="img"
        src={product.photo}
        alt={product.name}
        sx={{ width: "100%", maxHeight: 300, objectFit: "contain", mb: 2 }}
      />

      <Typography>
        <strong>Description:</strong> {product.description}
      </Typography>
      <Typography>
        <strong>Price:</strong> ₹{product.price.toFixed(2)}
      </Typography>
      <Typography>
        <strong>Category:</strong> {product.category}
      </Typography>
      <Typography>
        <strong>Discount:</strong> {product.discount}%
      </Typography>
      <Typography>
        <strong>Rating:</strong> {product.rating} / 5
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/products/${product.id}/edit`)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          sx={{ ml: 2 }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};
