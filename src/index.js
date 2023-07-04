import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';
import CartList from './components/CartList.js';

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backDrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');

let productData = [];

// instance 생성
// 첫 번째 파라미터가 target element
const productList = new ProductList($productListGrid, []);
const cartList = new CartList($cartList, []);

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backDrop.hidden = !$backDrop.hidden; // hidden 속성으로 backdrop의 가시성 제어
};

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  productData = result;
};

const addCartItem = (e) => {
  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  );
  if (!clickedProduct) return; // 상품 grid 내의 상품 카드 이외의 영역을 클릭할 경우 early return해서 에러 핸들링
  cartList.addCartItem(clickedProduct);
  toggleCart();
};

const removeCartItem = (e) => {
  if (e.target.className == 'remove-btn') {
    // li요소에 있는 id 값이 string이어서 number로 변환해주기
    const currentProductId = parseInt(e.target.closest('li').id);
    cartList.removeCartItem(currentProductId);
  }
};

fetchProductData();

// click 이벤트 리스너 등록
$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backDrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', removeCartItem);
