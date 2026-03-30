import React from "react";
import { useForm } from "react-hook-form";
import { useCartStore } from "../../store/cartStore";

type FormData = { email: string; phone: string; address: string; };

const CartPage = () => {
  const { items, addToCart } = useCartStore(s => ({ items: s.items, addToCart: s.addToCart }));
  const removeFromCart = useCartStore(s => (id: number) => s.items.filter(i => i.id !== id));
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const increment = (id:number) => addToCart(items.find(i => i.id===id)!);
  const decrement = (id:number) => {
    const item = items.find(i => i.id===id);
    if(item && item.quantity>1) item.quantity--;
    else if(item) items.splice(items.indexOf(item),1);
  }

  const onSubmit = (data:FormData) => {
    console.log("Order submitted:", {data, items});
    alert("Order submitted! Check console.");
  }

  const total = items.reduce((acc, i) => acc + i.price*i.quantity, 0);

  return (
    <div style={{padding:"20px"}}>
      <h1>Cart</h1>
      {items.length===0 && <div>Cart is empty</div>}
      {items.map(item => (
        <div key={item.id} style={{border:"1px solid #ddd", margin:"5px", padding:"5px"}}>
          <div>{item.name}</div>
          <div>{item.price} грн x {item.quantity}</div>
          <button onClick={()=>increment(item.id)}>+</button>
          <button onClick={()=>decrement(item.id)}>-</button>
          <button onClick={()=>removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: {total} грн</h3>

      <form onSubmit={handleSubmit(onSubmit)} style={{marginTop:"20px"}}>
        <div>
          <input {...register("email",{ required:true })} placeholder="Email"/>
          {errors.email && <span style={{color:"red"}}>Email required</span>}
        </div>
        <div>
          <input {...register("phone",{ required:true })} placeholder="Phone"/>
          {errors.phone && <span style={{color:"red"}}>Phone required</span>}
        </div>
        <div>
          <input {...register("address",{ required:true })} placeholder="Address"/>
          {errors.address && <span style={{color:"red"}}>Address required</span>}
        </div>
        <button type="submit" style={{marginTop:"10px"}}>Submit Order</button>
      </form>
    </div>
  )
}

export default CartPage;