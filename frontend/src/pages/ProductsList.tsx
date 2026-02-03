import { useEffect, useState } from "react";
import { getProducts, Product } from "../service/products.service";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h2>Liste des produits</h2>
      {products.map(p => (
        <div key={p.id}>
          <strong>{p.name}</strong> - {p.price} FCFA
        </div>
      ))}
    </div>
  );
}
