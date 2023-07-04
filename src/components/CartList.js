class CartList {
  // 생성자 함수
  constructor($target, initialData) {
    this.$target = $target;
    this.$container = document.createElement('ul'); // 1. ul element 직접 생성
    this.$container.className = 'divide-y divide-gray-200';
    this.$totalCount = document.getElementById('total-count');
    this.state = initialData;
    this.$target.append(this.$container); // 3. target 부모에 container(ul element)를 넣어줌 // element를 넣어줄 때는 append 사용
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  addCartItem(productData) {
    let newState;
    const clickedProductId = productData.id;
    // findIndex 메소드를 사용 > 조건을 만족하는 첫 번째 요소의 index를 반환(일치하는 요소가 없으면 -1을 반환)
    const checkedIdx = this.state.findIndex(
      (item) => item.id === clickedProductId
    );
    // 처음 추가되는 상품
    // 이미 추가되어 있는 상품의 경우 count를 늘려줌
    if (checkedIdx === -1) {
      newState = [...this.state, { ...productData, count: 1 }];
    } else {
      newState = [...this.state];
      newState[checkedIdx].count += 1;
    }
    this.setState(newState);
  }

  removeCartItem(id) {
    const newState = this.state.filter((item) => item.id !== id);
    this.setState(newState);
  }

  // 2. state를 통해 만들어진 string을 innerHTMLd을 통해 container(ul element)에 넣어줌
  // string을 넣어줄 때는 innerHTML을 사용
  // setState가 될 됨때마다 실행
  render() {
    this.$totalCount.innerHTML =
      this.state
        .reduce((acc, cur) => acc + cur.price * cur.count + acc, 0)
        .toLocaleString() + '원';
    this.$container.innerHTML = this.state
      .map((item) => {
        return `      <li class="flex py-6" id=${item.id}>
                    <div
                      class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
                    >
                      <img
                        src=${item.imgSrc}
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div
                          class="flex justify-between text-base font-medium text-gray-900"
                        >
                          <h3>${item.name}</h3>
                          <p class="ml-4">${item.price.toLocaleString()}원</p>
                        </div>
                      </div>
                      <div class="flex flex-1 items-end justify-between">
                        <div class="flex text-gray-500">
                          <button class="decrease-btn">-</button>
                          <div class="mx-2 font-bold">${item.count}</div>
                          <button class="increase-btn">+</button>
                        </div>
                        <button
                          type="button"
                          class="font-medium text-sky-400 hover:text-sky-500"
                        >
                          <p class="remove-btn">삭제하기</p>
                        </button>
                      </div>
                    </div>
                  </li>`;
      })
      .join('');
  }
}

export default CartList;
