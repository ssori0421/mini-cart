const getProductData = async () => {
  const response = await fetch('./api/productData.json');
  const data = await response.json();
  return data;
};

export default getProductData;
