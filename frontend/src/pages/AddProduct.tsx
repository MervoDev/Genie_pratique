import { useState } from "react";
import { createProduct } from "../service/products.service";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const submit = async () => {
    await createProduct({ name, price });
    alert("Produit ajouté");
  };

  return (
    <div>
      <h2>Ajouter un produit</h2>
      <input placeholder="Nom" onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Prix" onChange={e => setPrice(+e.target.value)} />
      <button onClick={submit}>Ajouter</button>
    </div>
  );
}
