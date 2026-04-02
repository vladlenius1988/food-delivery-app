import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import CartItem from './CartItem';
import { useCartStore, CartItem as CartItemType } from "../store/cartStore";


interface Shop {
  id: number;
  name: string;
  rating: number;
}
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  shopId: number;
  Shop?: { name: string };
}

interface Props {
  shopId: number;
}

const ProductList: React.FC<Props> = ({ shopId }) => {
  const [products, setProducts] = useState<Product[]>([]);
const addToCart = useCartStore((s) => s.addToCart);
  useEffect(() => {
    api.getProducts(shopId).then(setProducts);
  }, [shopId]);

  return (
 <div>
  {products.map((p) => (
    <div key={p.id} className="product-card">

      <div className="image-wrapper">
        <img src={p.imageUrl} alt={p.name} />
      </div>

      <div className="product-info">
        <h3>{p.name}</h3>
        <p>Ціна: {p.price.toFixed(2)} грн.</p>
    
      </div>

      <button
        onClick={() =>
          addToCart({
            id: p.id,
            name: p.name,
            price: p.price,
            imageUrl: p.imageUrl,
            quantity: 1,
          })
        }
      >
        Додати до кошика
      </button>

    </div>
  ))}
</div>
  );
};

export default ProductList;