// src/pages/ProductForm.tsx
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useProduct,
  useCreateProduct,
  useUpdateProduct,
} from "../features/products/useProducts";
import { useForm } from "react-hook-form";

export const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { data } = useProduct(id!);
  const create = useCreateProduct();
  const update = useUpdateProduct(id!);
  const { register, handleSubmit, reset } = useForm<any>();
  const nav = useNavigate();

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  const onSubmit = (vals: any) => {
    if (isEdit) update.mutate(vals, { onSuccess: () => nav("/products") });
    else create.mutate(vals, { onSuccess: () => nav("/products") });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="Name" />
      <textarea {...register("description")} placeholder="Description" />
      <input type="number" {...register("price")} placeholder="Price" />
      <input {...register("category")} placeholder="Category" />
      <input type="number" {...register("discount")} placeholder="Discount %" />
      <input type="number" {...register("rating")} placeholder="Rating" />
      <input type="url" {...register("photo")} placeholder="Photo URL" />
      <button type="submit">{isEdit ? "Update" : "Create"}</button>
    </form>
  );
};
