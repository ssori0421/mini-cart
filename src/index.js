import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';

const $productListGrid = document.getElementById('product-card-grid');

const productList = new ProductList($productListGrid, []);

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
};

fetchProductData();
