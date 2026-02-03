import { api } from "../api/axios";

export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;
}

export interface Purchase {
  id?: number;
  productName: string;
  price: number;
  purchaseDate: string;
}

export interface TopProduct {
  productName: string;
  count: number;
}

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (product: Product) => {
  const res = await api.post("/products", product);
  return res.data;
};

export const getPurchases = async () => {
  const res = await api.get("/purchases");
  return res.data;
};

export const createPurchase = async (purchase: Purchase) => {
  const res = await api.post("/purchases", purchase);
  return res.data;
};

export const getTopProducts = async (): Promise<TopProduct[]> => {
  const res = await api.get("/purchases/top-products");
  return res.data;
};
