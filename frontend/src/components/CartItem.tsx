import React from 'react';
import { useCartStore, CartState, type CartItem as CartItemType } from '../store/cartStore';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface Props {
  product: Product;
}

const CartItem: React.FC<Props> = ({ product }) => {
  const addToCart = useCartStore((s: CartState) => s.addToCart);
const removeFromCart = useCartStore((s: CartState) => s.removeFromCart);
const items = useCartStore((s: CartState) => s.items);
console.log(items);
  const cartItem = items.find((i: CartItemType) => i.id === product.id);

  return (
    <li style={{ marginBottom: "10px" }}>
      <img src={product.imageUrl} alt={product.name} width={50} />
      <span style={{ margin: "0 10px" }}>
        {product.name} - {product.price} грн
      </span>

      {cartItem && (
        <>
         <button onClick={() => addToCart({ ...product, quantity: 1 })}>+</button>
          <span style={{ margin: "0 5px" }}>{cartItem.quantity}</span>
          <button onClick={() => removeFromCart(product.id)}>-</button>
        </>
      )}

    {!cartItem && (
  <button onClick={() => addToCart({ ...product, quantity: 1 })}>В корзину</button>
)}
    </li>
  );
};

export default CartItem;