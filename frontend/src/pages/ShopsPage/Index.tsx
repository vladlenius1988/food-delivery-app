import { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";

type Shop = {
  id: number;
  name: string;
  rating: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  shopId: number;
};

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedShop, setSelectedShop] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/shops");
      setShops(res.data);
    } catch (e: any) {
      setError("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (shopId: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/products?shopId=${shopId}`
      );
      setProducts(res.data);
      setSelectedShop(shopId);
    } catch (e: any) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      <div style={{ width: "250px" }}>
        <h2>Shops</h2>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {shops.length === 0 && !loading && <p>No shops yet</p>}

        {shops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => fetchProducts(shop.id)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              cursor: "pointer",
              background:
                selectedShop === shop.id ? "#f0f0f0" : "transparent"
            }}
          >
            <div>{shop.name}</div>
            <small>Rating: {shop.rating}</small>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>
        <h2>Products</h2>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {selectedShop && products.length === 0 && !loading && (
          <p>No products yet</p>
        )}

        {!selectedShop && <p>Select a shop</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "15px"
          }}
        >
          {products.map((product) => (
          <div
  key={product.id}
  style={{
    border: "1px solid #ddd",
    padding: "10px"
  }}
>
  <div>{product.name}</div>
  <div>{product.price} грн</div>

  <button
    onClick={() =>
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price
      })
    }
    style={{
      marginTop: "10px",
      padding: "5px 10px",
      cursor: "pointer"
    }}
  >
    Add to cart
  </button>
</div>
          ))}
        </div>
      </div>
    </div>
  );
}