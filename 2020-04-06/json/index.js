let shopModule = (function () {
    let navList = document.querySelectorAll('.nav .item'),
        productBox = document.querySelector('.productBox'),
        data = null;
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };
    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let {
                title,
                price,
                time,
                hot,
                img
            } = item;
            str += `<div class="card">
				<img src="${img}" class="card-img-top" alt="">
				<div class="card-body">
					<h5 class="card-title">${title}</h5>
					<p class="card-text">价格：￥${price.toFixed(2)}</p>
					<p class="card-text">销量：${hot}</p>
					<p class="card-text">时间：${time.replace(/-/g, '/')}</p>
				</div>
			</div>`;
        });
        productBox.innerHTML = str;
    };
    let handle = function handle() {
        Array.from(navList).forEach((item, index) => {
            item.flag = -1;
            item.onclick = function () {
                // clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag;
                });
                render();
            };
        });
    };
    return {
        init() {
            queryData();
            render();
            handle();
        }
    };
})();
shopModule.init();