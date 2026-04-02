import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductList from './ProductList';

interface Shop {
  id: number;
  name: string;
}

const ShopList: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);

  useEffect(() => {
    api.getShops().then(data => setShops(data));
  }, []);

  return (
    <div>
      <h2>Оберіть магазин</h2>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>
            <button onClick={() => setSelectedShopId(shop.id)}>
              {shop.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedShopId && <ProductList shopId={selectedShopId} />}
    </div>
  );
};

export default ShopList;