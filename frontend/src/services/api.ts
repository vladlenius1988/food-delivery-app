import axios from 'axios';



export const api = {
  getProducts: (shopId?: number) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/products`, { params: { shopId } })
      .then(res => res.data),

  getShops: () =>
    axios.get(`${process.env.REACT_APP_API_URL}/shops`).then(res => res.data),
};




