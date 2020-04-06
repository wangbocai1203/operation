let shopModule = (function () {
    let box = document.querySelector('.box');
    let data = [{
        id: 1,
        count: 0,
        price: 12.5
    }, {
        id: 2,
        count: 0,
        price: 10.5
    }, {
        id: 3,
        count: 0,
        price: 8.5
    }, {
        id: 4,
        count: 0,
        price: 8
    }, {
        id: 5,
        count: 0,
        price: 14.5
    }];
    let render = function render() {
        let counts = 0,
            total = 0,
            priceArr = [0];
        let str = `<ul class="list">`;
        data.forEach(item => {
            let {
                id,
                count,
                price
            } = item;
            counts += count;
            total += count * price;
            count > 0 ? priceArr.push(price) : null;
            str += `<li>
						<i data-btn='minus data-id='${id}></i>
						<em>${count}</em>
						<i data-btn='plus' data-id='${id}'></i>
						<span>
							单价：<strong>${price}元 </strong> 小计：<strong>${count * price}元</strong>
						</span>
					</li>`;
        });
        str += `</ul>`;
        str += `<div class="info">
					<span>商品公合计：<em>${counts}</em>件</span>
					<span>共花费了：<em>${total}</em>元</span>
					<br />
					<br />
					<span>其中最贵的商品单价是：<em>${Math.max(...priceArr)}</em>元</span>
                </div>`;
        box.innerHTML = str;
        handle();
    };
    let handle = function hendle() {
        let btns = Array.from(box.querySelectorAll('i'));
        btns.forEach(item => {
            item.onclick = function () {
                let btn = this.getAttribute('data-btn'),
                    id = this.getAttribute('data-id');
                id = parseInt(id);
                data = data.map(cur => {
                    if (cur.id === id) {
                        if (btn === 'minus') {
                            cur.count--;
                            cur.count < 0 ? cur.count = 0 : null;
                        } else {
                            cur.count++;
                        }
                    }
                    return cur;
                });
                render();
            };
        });
    };
    return {
        init() {
            render();
        }
    };
})();
shopModule.init();