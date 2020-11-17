import axios from 'axios';
// const BASE = 'https://fitnesstrac-kr.herokuapp.com/api'
export async function getProducts() {
  try {
    const { data } = await axios.get(`${BASE}/products`);
    console.log("allProducts:", data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(productId) {
  try {
    const { data } = await axios.get(`${BASE}/product/${productId}`);
    console.log("productById:", data)
    return data;
  } catch (error) {
    throw error;
  }
}