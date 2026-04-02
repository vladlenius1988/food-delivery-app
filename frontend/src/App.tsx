import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShopList from "./components/ShopList";
import CartPage from "./pages/CartPage/Index";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
      <div className="nav">
        <Link to="/">Перейти до головної</Link>
        <Link to="/cart">Перейти до кошика</Link>
      </div>
        </div>
      <Routes>
        <Route path="/" element={<ShopList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;