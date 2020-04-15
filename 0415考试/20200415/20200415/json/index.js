let cascadeFlowModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column')),
        _data = [];
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                _data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    }
    let bindHTML = function bindHTML() {
        _data = _data.map(item => {
            let w = item.width,
                h = item.height;
            h = h / (w / 230);
            item.width = 230;
            item.height = h;
            return item;
        });
        for (let i = 0; i < _data.length; i += 3) {
            let group = _data.slice(i, i + 3);
            group.sort((a, b) => {
                return a.height - b.height;
            });
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });
            group.forEach((item, index) => {
                let {
                    pic,
                    height,
                    title,
                    link
                } = item;
                let str = `<div class="card">
                    <a href="${link}">
                        <div class="lazyImageBox" style="height:${height}px">
                                <img src="" alt="" data-image="${pic}">
                        </div>
                        <p>${title}</p>
                    </a>
                </div>`;
                columns[index].innerHTML += str;
            });
        }
    };
    let lazyFunc = function lazyFunc() {
        let lazyImageBoxs = document.querySelectorAll('.lazyImageBox');
        [].forEach.call(lazyImageBoxs, lazyImageBox => {
            let isLoad = lazyImageBox.getAttribute('isLoad');
            if (isLoad === "true") return;
            let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight / 2;
            let A = document.documentElement.clientHeight + document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(lazyImageBox);
            }
        });
    };
    let lazyImg = function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            dataImage = img.getAttribute('data-image'),
            tempImage = new Image;
        tempImage.src = dataImage;
        tempImage.onload = () => {
            img.src = dataImage;
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        tempImage = null;
        lazyImageBox.setAttribute('isLoad', 'true');
    };
    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function () {
                lazyFunc();
            };
        }
    }
})();
cascadeFlowModule.init();