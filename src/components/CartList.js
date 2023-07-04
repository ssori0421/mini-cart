class CartList {
  constructor($target, initialData) {
    this.$target = $target;
    this.$container = document.createElement('ul'); // 1. ul element 직접 생성
    this.$container.className = 'divide-y divide-gray-200';
    this.state = initialData;
    this.$target.append(this.$container); // 3. target 부모에 container(ul element)를 넣어줌 // element를 넣어줄 때는 append 사용
    this.render();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  // 2. state를 통해 만들어진 string을 innerHTMLd을 통해 container(ul element)에 넣어줌
  // string을 넣어줄 때는 innerHTML을 사용
  render() {
    this.$container.innerHTML = this.state
      .map((item) => {
        return `      <li class="flex py-6" id="4">
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
                          <p class="ml-4">${item.price.toLocalestring()}</p>
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
