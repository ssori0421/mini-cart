import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backDrop = document.getElementById('backdrop');

const productList = new ProductList($productListGrid, []);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backDrop.hidden = !$backDrop.hidden; // hidden 속성으로 backdrop의 가시성 제어
};

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
};

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backDrop.addEventListener('click', toggleCart);
