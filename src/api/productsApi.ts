// src/api/productsApi.ts
import axios from "axios";
import type { Product } from "../types/Product";

// ← use the plural resource name that matches your db.json
const URL = "http://localhost:3001/products";

export const fetchProducts = () =>
  axios.get<Product[]>(URL).then((res) => res.data);

export const fetchProduct = (id: string) =>
  axios.get<Product>(`${URL}/${id}`).then((res) => res.data);

export const createProduct = (p: Omit<Product, "id">) =>
  axios.post<Product>(URL, p).then((res) => res.data);

export const updateProduct = (id: string, upd: Partial<Product>) =>
  axios.put<Product>(`${URL}/${id}`, upd).then((res) => res.data);

export const deleteProduct = (id: string) =>
  axios.delete<void>(`${URL}/${id}`).then((res) => res.data);
