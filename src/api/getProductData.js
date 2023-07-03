// 에러 핸들링
// 비동기 호출 일반화
const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    const errData = await response.json();
    throw errData;
  } catch (error) {
    console.log(error);
  }
};

const getProductData = async () => {
  const result = await request('./api/productData.json');
  return result;
};

export default getProductData;
