window.addEventListener("load", function() {

    // 获取元素
    var arrow_left = document.querySelector(".arrow-l");
    var arrow_right = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");
    var focusWidth = focus.offsetWidth; // 图片宽度

    // 鼠标经过 显示 左右按钮
    // 2.鼠标离开隐藏 左右两个按钮
    focus.addEventListener('mouseover', function() {
        arrow_left.style.display = 'block';
        arrow_right.style.display = 'block';
        // 鼠标点击 清除定时器
        clearInterval(timer);
        timer = null;

    });

    // 2.鼠标离开隐藏 左右两个按钮
    focus.addEventListener('mouseout', function() {
        arrow_left.style.display = 'none';
        arrow_right.style.display = 'none';
        // 鼠标离开 生成定时器
        timer = setInterval(function() {
            //自动播放图片 类似于点击右侧按钮 
            // 手动调用事件
            arrow_right.click();
        }, 2000);

    });

    // 动态生成圆圈的设置
    // 元素获取 是focus的子节点的
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");
    //console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建 li
        var li = document.createElement("li");
        // 设置自定义属性 来记录圆圈的索引号
        li.setAttribute("index", i);
        // li 插入到ol
        ol.appendChild(li);

        // 绑定点击事件 点击圆圈 即可变色 使用排他思想
        li.addEventListener("click", function() {
            // 干掉所有人
            for (let index = 0; index < ol.children.length; index++) {
                ol.children[index].className = "";
            }
            // 留下我自己
            this.className = "current";
            // 点击圆点  就移动图片 移动ul
            // ul 移动的距离=圆圈的索引号 ×图片的宽度 取负值
            // 点击某个小li就拿到li的索引号
            var index = this.getAttribute("index");
            // 当我们点击了某个li 就要把li 的索引好赋给num
            num = index;
            // 当我们点击了某个li 就要把li 的索引好赋给circle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个li 设置为白色 即current
    ol.children[0].className = "current";
    // 克隆第一张图片 li 放在ul里面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮 图片滚动一张
    var num = 0;
    // circle 是控制小圆圈的播放
    var circle = 0;

    // 右侧按钮
    arrow_right.addEventListener("click", function() {
        // 如果走到最后一张我们复制的图片 此时我们的ul 要快速复原left 改为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        // 调用动画
        animate(ul, -num * focusWidth);

        circle++;
        // 先清除其余小圆圈的current类名 留下当前小圆圈的类名
        if (circle == ul.children.length - 1) {
            circle = 0;
        }

        // 函数调用
        circle_change();
    });

    // 右侧按钮
    arrow_left.addEventListener("click", function() {
            // 如果走到最后一张我们复制的图片 此时我们的ul 要快速复原left 改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";

            }
            num--;
            // 调用动画
            animate(ul, -num * focusWidth);

            circle--;
            // 先清除其余小圆圈的current类名 留下当前小圆圈的类名
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 变换成三元表达式 
            //circle = circle<0?ol.children.length - 1:circle;

            // 函数调用
            circle_change();
        })
        // 同样的功能 进行函数封装
    function circle_change() {
        for (let index = 0; index < ol.children.length; index++) {
            // 清楚其他的
            ol.children[index].className = "";
        }
        // 留下自己的
        ol.children[circle].className = "current";
    }

    // 自动播放功能
    var timer = setInterval(function() {
        //自动播放图片 类似于点击右侧按钮 
        // 手动调用事件
        arrow_right.click();
    }, 2000);
})