import React, { useState, useEffect } from "react";
import { useCartStore, CartItem as CartItemType } from "../../store/cartStore";

interface FormData {
  email: string;
  phone: string;
  address: string;
}

const CartPage = () => {
  const cartItems = useCartStore((s: any) => s.items);
  const addToCart = useCartStore((s: any) => s.addToCart);
  const removeFromCart = useCartStore((s: any) => s.removeFromCart);
  const decrement = useCartStore((s: any) => s.decrement);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);

  
  useEffect(() => {
    const sum = cartItems.reduce((acc: number, item: CartItemType) => {
      return acc + Number(item.price) * item.quantity;
    }, 0);
    setTotal(sum);
  }, [cartItems]);

  const handleSubmit = async () => {
   
    if (!email || !phone || !address) {
      alert("Будь ласка, заповніть усі поля!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Введіть коректну електронну пошту!");
      return;
    }

  const phoneRegex = /^(\+38)?\d{10}$/;
if (!phoneRegex.test(phone)) {
  alert("Введіть коректний телефон! Повинно бути рівно 10 цифр.");
  return;
}

    if (!cartItems || cartItems.length === 0) {
      alert("Кошик порожній!");
      return;
    }

   
    const order = { email, phone, address, items: cartItems, total };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to save order");

      const savedOrder = await res.json();
      console.log("Order saved:", savedOrder);
      alert("Заказ успішно відправлений!");
    } catch (err) {
      console.error(err);
      alert("Помилка при відправці замовлення");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Кошик</h1>

      

      {cartItems.length === 0 ? (
        <div>Кошик порожній</div>
      ) : (
        cartItems.map((item: CartItemType) => (
          <div
            key={item.id}
            style={{ border: "1px solid #ddd", margin: "5px", padding: "5px" }}
          >
            <div>{item.name}</div>
            <div>
              {item.price.toFixed(2)} грн x {item.quantity}
            </div>
            <button onClick={() => addToCart(item)}>+</button>
            <button onClick={() => decrement(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Видалити</button>
          </div>
        ))
      )}

      <h3 className="cart-total">Всього: {total.toFixed(2)} грн</h3>

      <div className="cart-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Адреса"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="send-order" onClick={handleSubmit}>Відправити замовлення</button>
    </div>
  );
};

export default CartPage;


 