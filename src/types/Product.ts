// src/types/Product.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number;
  rating: number;
  photo: string; // URL or base64, depending on your API
}
