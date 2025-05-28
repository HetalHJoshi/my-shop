// // // src/pages/ProductForm.tsx
// // import { useEffect } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import {
// //   useProduct,
// //   useCreateProduct,
// //   useUpdateProduct,
// // } from "../features/products/useProducts";
// // import { useForm } from "react-hook-form";

// // export const ProductForm = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const isEdit = Boolean(id);
// //   const { data } = useProduct(id!);
// //   const create = useCreateProduct();
// //   const update = useUpdateProduct(id!);
// //   const { register, handleSubmit, reset } = useForm<any>();
// //   const nav = useNavigate();

// //   useEffect(() => {
// //     if (data) reset(data);
// //   }, [data]);

// //   const onSubmit = (vals: any) => {
// //     if (isEdit) update.mutate(vals, { onSuccess: () => nav("/products") });
// //     else create.mutate(vals, { onSuccess: () => nav("/products") });
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <input {...register("name", { required: true })} placeholder="Name" />
// //       <textarea {...register("description")} placeholder="Description" />
// //       <input type="number" {...register("price")} placeholder="Price" />
// //       <input {...register("category")} placeholder="Category" />
// //       <input type="number" {...register("discount")} placeholder="Discount %" />
// //       <input type="number" {...register("rating")} placeholder="Rating" />
// //       <input type="url" {...register("photo")} placeholder="Photo URL" />
// //       <button type="submit">{isEdit ? "Update" : "Create"}</button>
// //     </form>
// //   );
// // };

// // src/pages/ProductForm.tsx
// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useProduct,
//   useCreateProduct,
//   useUpdateProduct,
// } from "../features/products/useProducts";
// import { useForm, Controller } from "react-hook-form";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// interface FormValues {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   discount: number;
//   rating: number;
//   photo: string;
// }

// export const ProductForm: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const isEdit = Boolean(id);
//   const { data } = useProduct(id!);
//   const create = useCreateProduct();
//   const update = useUpdateProduct(id!);
//   const navigate = useNavigate();

//   const {
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: {
//       name: "",
//       description: "",
//       price: 0,
//       category: "",
//       discount: 0,
//       rating: 0,
//       photo: "",
//     },
//   });

//   // live-watch the photo URL
//   const photoUrl = watch("photo");

//   useEffect(() => {
//     if (data) reset(data);
//   }, [data, reset]);

//   const onSubmit = (values: FormValues) => {
//     const action = isEdit
//       ? update.mutate(values, { onSuccess: () => navigate("/products") })
//       : create.mutate(values, { onSuccess: () => navigate("/products") });
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper
//         elevation={4}
//         sx={{
//           p: 4,
//           mt: 6,
//           borderRadius: 2,
//           background: "#fafafa",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{ textAlign: "center", fontWeight: 500 }}
//         >
//           {isEdit ? "✏️ Edit Product" : "➕ Add New Product"}
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             gap: 4,
//             alignItems: "flex-start",
//           }}
//         >
//           {/* LEFT: Image Preview */}
//           <Box
//             sx={{
//               flex: { xs: "none", sm: "0 0 200px" },
//               width: { xs: "100%", sm: "200px" },
//             }}
//           >
//             {photoUrl ? (
//               <Box
//                 component="img"
//                 src={photoUrl}
//                 alt="Preview"
//                 sx={{
//                   width: "100%",
//                   height: "auto",
//                   maxHeight: 200,
//                   objectFit: "contain",
//                   borderRadius: 1,
//                   boxShadow: 1,
//                   bgcolor: "#fff",
//                 }}
//               />
//             ) : (
//               <Box
//                 sx={{
//                   width: "100%",
//                   height: 200,
//                   borderRadius: 1,
//                   border: "2px dashed #ccc",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "#aaa",
//                   fontStyle: "italic",
//                 }}
//               >
//                 Image preview
//               </Box>
//             )}
//           </Box>

//           {/* RIGHT: Form Fields */}
//           <Box sx={{ flex: 1 }}>
//             <Stack spacing={3}>
//               <Controller
//                 name="name"
//                 control={control}
//                 rules={{ required: "Name is required" }}
//                 render={({ field, fieldState }) => (
//                   <TextField
//                     {...field}
//                     label="Product Name"
//                     placeholder="Enter product name"
//                     fullWidth
//                     error={!!fieldState.error}
//                     helperText={fieldState.error?.message}
//                   />
//                 )}
//               />

//               <Controller
//                 name="description"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Description"
//                     placeholder="Short description..."
//                     multiline
//                     rows={4}
//                     fullWidth
//                   />
//                 )}
//               />

//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 <Box sx={{ flex: "1 1 45%" }}>
//                   <Controller
//                     name="price"
//                     control={control}
//                     rules={{
//                       required: "Price is required",
//                       min: { value: 0, message: "Must be ≥ 0" },
//                     }}
//                     render={({ field, fieldState }) => (
//                       <TextField
//                         {...field}
//                         label="Price"
//                         type="number"
//                         fullWidth
//                         error={!!fieldState.error}
//                         helperText={fieldState.error?.message}
//                       />
//                     )}
//                   />
//                 </Box>
//                 <Box sx={{ flex: "1 1 45%" }}>
//                   <Controller
//                     name="category"
//                     control={control}
//                     rules={{ required: "Category is required" }}
//                     render={({ field, fieldState }) => (
//                       <TextField
//                         {...field}
//                         label="Category"
//                         placeholder="e.g. Electronics"
//                         fullWidth
//                         error={!!fieldState.error}
//                         helperText={fieldState.error?.message}
//                       />
//                     )}
//                   />
//                 </Box>
//               </Box>

//               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//                 <Box sx={{ flex: "1 1 45%" }}>
//                   <Controller
//                     name="discount"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Discount (%)"
//                         type="number"
//                         fullWidth
//                       />
//                     )}
//                   />
//                 </Box>
//                 <Box sx={{ flex: "1 1 45%" }}>
//                   <Controller
//                     name="rating"
//                     control={control}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         label="Rating"
//                         type="number"
//                         inputProps={{ step: 0.1, min: 0, max: 5 }}
//                         fullWidth
//                       />
//                     )}
//                   />
//                 </Box>
//               </Box>

//               <Controller
//                 name="photo"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Photo URL"
//                     placeholder="https://..."
//                     fullWidth
//                   />
//                 )}
//               />
//             </Stack>

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 mt: 4,
//               }}
//             >
//               <Button
//                 variant="contained"
//                 size="large"
//                 type="submit"
//                 disabled={isSubmitting}
//                 sx={{
//                   px: 6,
//                   py: 1.5,
//                   borderRadius: 3,
//                   textTransform: "none",
//                   fontSize: "1rem",
//                 }}
//               >
//                 {isEdit ? "Update Product" : "Create Product"}
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };
// // // src/pages/ProductForm.tsx
// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import {
// //   useProduct,
// //   useCreateProduct,
// //   useUpdateProduct,
// // } from "../features/products/useProducts";
// // import { useForm, Controller } from "react-hook-form";
// // import Container from "@mui/material/Container";
// // import Paper from "@mui/material/Paper";
// // import Box from "@mui/material/Box";
// // import Stack from "@mui/material/Stack";
// // import TextField from "@mui/material/TextField";
// // import Button from "@mui/material/Button";
// // import Typography from "@mui/material/Typography";
// // import Snackbar from "@mui/material/Snackbar";
// // import Alert from "@mui/material/Alert";

// // interface FormValues {
// //   name: string;
// //   description: string;
// //   price: number;
// //   category: string;
// //   discount: number;
// //   rating: number;
// //   photo: string;
// // }

// // export const ProductForm: React.FC = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const isEdit = Boolean(id);
// //   const { data } = useProduct(id!);
// //   const create = useCreateProduct();
// //   const update = useUpdateProduct(id!);
// //   const navigate = useNavigate();

// //   const [snackbarOpen, setSnackbarOpen] = useState(false);

// //   const {
// //     control,
// //     handleSubmit,
// //     reset,
// //     watch,
// //     formState: { isSubmitting },
// //   } = useForm<FormValues>({
// //     defaultValues: {
// //       name: "",
// //       description: "",
// //       price: 0,
// //       category: "",
// //       discount: 0,
// //       rating: 0,
// //       photo: "",
// //     },
// //   });

// //   const photoUrl = watch("photo");

// //   useEffect(() => {
// //     if (data) reset(data);
// //   }, [data, reset]);

// //   const handleSuccess = () => {
// //     setSnackbarOpen(true);
// //     setTimeout(() => {
// //       setSnackbarOpen(false);
// //       navigate("/products");
// //     }, 1500);
// //   };

// //   const onSubmit = (values: FormValues) => {
// //     if (isEdit) {
// //       update.mutate(values, { onSuccess: handleSuccess });
// //     } else {
// //       create.mutate(values, { onSuccess: handleSuccess });
// //     }
// //   };

// //   return (
// //     <Container maxWidth="md">
// //       <Paper
// //         elevation={4}
// //         sx={{
// //           p: 4,
// //           mt: 6,
// //           borderRadius: 2,
// //           background: "#fafafa",
// //         }}
// //       >
// //         <Typography
// //           variant="h4"
// //           component="h1"
// //           gutterBottom
// //           sx={{ textAlign: "center", fontWeight: 500 }}
// //         >
// //           {isEdit ? "✏️ Edit Product" : "➕ Add New Product"}
// //         </Typography>

// //         <Box
// //           component="form"
// //           onSubmit={handleSubmit(onSubmit)}
// //           noValidate
// //           sx={{
// //             display: "flex",
// //             flexDirection: { xs: "column", sm: "row" },
// //             gap: 4,
// //             alignItems: "flex-start",
// //           }}
// //         >
// //           {/* LEFT: Image Preview */}
// //           <Box
// //             sx={{
// //               flex: { xs: "none", sm: "0 0 200px" },
// //               width: { xs: "100%", sm: "200px" },
// //             }}
// //           >
// //             {photoUrl ? (
// //               <Box
// //                 component="img"
// //                 src={photoUrl}
// //                 alt="Preview"
// //                 sx={{
// //                   width: "100%",
// //                   height: "auto",
// //                   maxHeight: 200,
// //                   objectFit: "contain",
// //                   borderRadius: 1,
// //                   boxShadow: 1,
// //                   bgcolor: "#fff",
// //                 }}
// //               />
// //             ) : (
// //               <Box
// //                 sx={{
// //                   width: "100%",
// //                   height: 200,
// //                   borderRadius: 1,
// //                   border: "2px dashed #ccc",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   color: "#aaa",
// //                   fontStyle: "italic",
// //                 }}
// //               >
// //                 Image preview
// //               </Box>
// //             )}
// //           </Box>

// //           {/* RIGHT: Form Fields */}
// //           <Box sx={{ flex: 1 }}>
// //             <Stack spacing={3}>
// //               {/* Name */}
// //               <Controller
// //                 name="name"
// //                 control={control}
// //                 rules={{ required: "Name is required" }}
// //                 render={({ field, fieldState }) => (
// //                   <TextField
// //                     {...field}
// //                     label="Product Name"
// //                     placeholder="Enter product name"
// //                     fullWidth
// //                     error={!!fieldState.error}
// //                     helperText={fieldState.error?.message}
// //                   />
// //                 )}
// //               />

// //               {/* Description */}
// //               <Controller
// //                 name="description"
// //                 control={control}
// //                 render={({ field }) => (
// //                   <TextField
// //                     {...field}
// //                     label="Description"
// //                     placeholder="Short description..."
// //                     multiline
// //                     rows={4}
// //                     fullWidth
// //                   />
// //                 )}
// //               />

// //               {/* Price & Category */}
// //               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// //                 <Box sx={{ flex: "1 1 45%" }}>
// //                   <Controller
// //                     name="price"
// //                     control={control}
// //                     rules={{
// //                       required: "Price is required",
// //                       min: { value: 0, message: "Must be ≥ 0" },
// //                     }}
// //                     render={({ field, fieldState }) => (
// //                       <TextField
// //                         {...field}
// //                         label="Price"
// //                         type="number"
// //                         fullWidth
// //                         error={!!fieldState.error}
// //                         helperText={fieldState.error?.message}
// //                       />
// //                     )}
// //                   />
// //                 </Box>
// //                 <Box sx={{ flex: "1 1 45%" }}>
// //                   <Controller
// //                     name="category"
// //                     control={control}
// //                     rules={{ required: "Category is required" }}
// //                     render={({ field, fieldState }) => (
// //                       <TextField
// //                         {...field}
// //                         label="Category"
// //                         placeholder="e.g. Electronics"
// //                         fullWidth
// //                         error={!!fieldState.error}
// //                         helperText={fieldState.error?.message}
// //                       />
// //                     )}
// //                   />
// //                 </Box>
// //               </Box>

// //               {/* Discount & Rating */}
// //               <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// //                 <Box sx={{ flex: "1 1 45%" }}>
// //                   <Controller
// //                     name="discount"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <TextField
// //                         {...field}
// //                         label="Discount (%)"
// //                         type="number"
// //                         fullWidth
// //                       />
// //                     )}
// //                   />
// //                 </Box>
// //                 <Box sx={{ flex: "1 1 45%" }}>
// //                   <Controller
// //                     name="rating"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <TextField
// //                         {...field}
// //                         label="Rating"
// //                         type="number"
// //                         inputProps={{ step: 0.1, min: 0, max: 5 }}
// //                         fullWidth
// //                       />
// //                     )}
// //                   />
// //                 </Box>
// //               </Box>

// //               {/* Photo URL */}
// //               <Controller
// //                 name="photo"
// //                 control={control}
// //                 render={({ field }) => (
// //                   <TextField
// //                     {...field}
// //                     label="Photo URL"
// //                     placeholder="https://..."
// //                     fullWidth
// //                   />
// //                 )}
// //               />
// //             </Stack>

// //             {/* Submit */}
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 mt: 4,
// //               }}
// //             >
// //               <Button
// //                 variant="contained"
// //                 size="large"
// //                 type="submit"
// //                 disabled={isSubmitting}
// //                 sx={{
// //                   px: 6,
// //                   py: 1.5,
// //                   borderRadius: 3,
// //                   textTransform: "none",
// //                   fontSize: "1rem",
// //                 }}
// //               >
// //                 {isEdit ? "Update Product" : "Create Product"}
// //               </Button>
// //             </Box>
// //           </Box>
// //         </Box>
// //       </Paper>

// //       {/* Snackbar */}
// //       <Snackbar
// //         open={snackbarOpen}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
// //         onClose={() => setSnackbarOpen(false)}
// //         autoHideDuration={2000}
// //       >
// //         <Alert severity="success" sx={{ width: "100%" }}>
// //           {isEdit
// //             ? "Product updated successfully!"
// //             : "Product created successfully!"}
// //         </Alert>
// //       </Snackbar>
// //     </Container>
// //   );
// // };
// // src / pages / ProductForm.tsx;
// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Box,
// } from "@mui/material";
// import { useForm } from "react-hook-form";

// interface FormValues {
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   discount: number;
//   rating: number;
//   photo: string;
// }

// export const ProductForm: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const isEdit = Boolean(id);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm<FormValues>({
//     defaultValues: {
//       name: "",
//       description: "",
//       price: 0,
//       category: "",
//       discount: 0,
//       rating: 0,
//       photo: "",
//     },
//   });

//   // Fetch product for edit
//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!isEdit) return;
//       try {
//         const res = await axios.get(`http://localhost:3001/products/${id}`);
//         reset(res.data); // prefill form
//       } catch (err) {
//         console.error("Failed to load product", err);
//       }
//     };
//     fetchProduct();
//   }, [id, isEdit, reset]);

//   const onSubmit = async (data: FormValues) => {
//     try {
//       if (isEdit) {
//         await axios.put(`http://localhost:3001/products/${id}`, data);
//       } else {
//         await axios.post(`http://localhost:3001/products`, data);
//       }
//       navigate("/products");
//     } catch (error) {
//       console.error("Submit failed", error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper sx={{ p: 4, mt: 6 }}>
//         <Typography variant="h5" gutterBottom>
//           {isEdit ? "Edit Product" : "Add New Product"}
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           noValidate
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//         >
//           <TextField
//             label="Name"
//             {...register("name", { required: true })}
//             fullWidth
//           />
//           <TextField
//             label="Description"
//             {...register("description")}
//             multiline
//             rows={4}
//             fullWidth
//           />
//           <TextField
//             label="Price"
//             type="number"
//             {...register("price", { required: true })}
//             fullWidth
//           />
//           <TextField
//             label="Category"
//             {...register("category", { required: true })}
//             fullWidth
//           />
//           <TextField
//             label="Discount (%)"
//             type="number"
//             {...register("discount")}
//             fullWidth
//           />
//           <TextField
//             label="Rating"
//             type="number"
//             inputProps={{ step: 0.1, min: 0, max: 5 }}
//             {...register("rating")}
//             fullWidth
//           />
//           <TextField label="Photo URL" {...register("photo")} fullWidth />

//           <Button variant="contained" type="submit" disabled={isSubmitting}>
//             {isEdit ? "Update Product" : "Create Product"}
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  rating: number;
  photo: string;
}

export const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      discount: 0,
      rating: 0,
      photo: "",
    },
  });

  const photoUrl = watch("photo");

  // NEW: state for stable preview image src and error flag
  const [previewSrc, setPreviewSrc] = useState<string>("/fallback-image.png");
  const [hasError, setHasError] = useState(false);

  // Sync previewSrc with photoUrl, avoid flicker by only updating when different
  useEffect(() => {
    if (photoUrl && photoUrl.trim() !== "") {
      if (photoUrl !== previewSrc) {
        setPreviewSrc(photoUrl);
        setHasError(false); // reset error when new url comes
      }
    } else {
      if (previewSrc !== "/fallback-image.png") {
        setPreviewSrc("/fallback-image.png");
        setHasError(false);
      }
    }
  }, [photoUrl, previewSrc]);

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        reset(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };
    fetchProduct();
  }, [id, isEdit, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:3001/products/${id}`, data);
      } else {
        await axios.post(`http://localhost:3001/products`, data);
      }
      navigate("/products");
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  // Only set fallback once when image loading fails
  const onImageError = () => {
    if (!hasError) {
      setPreviewSrc("/fallback-image.png");
      setHasError(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          {isEdit ? "Edit Product" : "Add New Product"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 2, display: "flex", gap: 4 }}
        >
          {/* Left: Image preview */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 240,
              height: 240,
              borderRadius: 2,
              backgroundColor: "#f0f0f0",
            }}
          >
            <Box
              component="img"
              src={previewSrc}
              alt="Preview Image"
              onError={onImageError}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Right: Form Fields */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              {...register("name", { required: true })}
              fullWidth
            />
            <TextField
              label="Description"
              {...register("description")}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              {...register("price", { required: true })}
              fullWidth
            />
            <TextField
              label="Category"
              {...register("category", { required: true })}
              fullWidth
            />
            <TextField
              label="Discount (%)"
              type="number"
              {...register("discount")}
              fullWidth
            />
            <TextField
              label="Rating"
              type="number"
              inputProps={{ step: 0.1, min: 0, max: 5 }}
              {...register("rating")}
              fullWidth
            />
            <TextField label="Photo URL" {...register("photo")} fullWidth />

            <Box textAlign="center" mt={2}>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {isEdit ? "Update Product" : "Create Product"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
