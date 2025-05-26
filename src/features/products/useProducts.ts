// src/features/products/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../../api/productsApi";
import type { Product } from "../../types/Product";

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => api.fetchProducts(),
  });

export const useProduct = (id: string) =>
  useQuery<Product, Error>({
    queryKey: ["products", id],
    queryFn: () => api.fetchProduct(id),
    enabled: Boolean(id),
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: (newProduct) => api.createProduct(newProduct),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = (id: string) => {
  const qc = useQueryClient();
  return useMutation<Product, Error, Partial<Product>>({
    mutationFn: (updates) => api.updateProduct(id, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["products", id] });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (id) => api.deleteProduct(id),
    onSuccess: (_data, id) => {
      qc.removeQueries({ queryKey: ["products", id] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
