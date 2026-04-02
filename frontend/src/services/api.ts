import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

export const api = {
  getProducts: (shopId?: number) =>
    axios
      .get(`${API_URL}/products`, { params: { shopId } })
      .then(res => res.data),

  getShops: () =>
    axios.get(`${API_URL}/shops`).then(res => res.data),
};




