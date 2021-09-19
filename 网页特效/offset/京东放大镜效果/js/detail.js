window.addEventListener("load", function() {
    var preview_img = document.querySelector(".preview_img"),
        mask = document.querySelector(".mask"),
        big = document.querySelector(".big");
    //1.当鼠标经过时，就隐藏住 mask 和 big 盒子
    preview_img.addEventListener("mouseover", function() {
        mask.style.display = "block";
        big.style.display = "block";
    })
    preview_img.addEventListener("mouseout", function() {
        mask.style.display = "none";
        big.style.display = "none";
    })
    preview_img.addEventListener("mouseover", function(event) {
        // 计算盒子在鼠标内的坐标 
        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        // 得到mask的位置 对其进行判断  使得超出边界后就隐藏
        // 减去offsetWidth得出其高度 使其动态化
        var mask_X = x - mask.offsetWidth / 2;
        var mask_Y = x - mask.offsetWidth / 2;

        // 遮挡层的最大距离
        var MaskMax = preview_img.offsetWidth - mask.offsetWidth;

        if (mask_X <= 0) {
            mask_X = 0;
        } else if (mask_X >= MaskMax) {
            mask_X = MaskMax;
        }
        if (mask_Y <= 0) {
            mask_Y = 0;
        } else if (mask_Y >= MaskMax) {
            mask_Y = MaskMax;
        }
        mask.style.left = mask_X + "px";
        mask.style.top = mask_Y + "px";

        // 大图片移动距离=遮挡层移动距离*大图片移动距离/遮挡层最大移动距离
        // 大图片元素获取
        var bigImg = document.querySelector(".bigImg");
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var big_X = mask_X * bigMax / MaskMax;
        var big_Y = mask_Y * bigMax / MaskMax;

        // 反方向移动
        bigImg.style.left = -big_X + "px";
        bigImg.style.top = -big_Y + "px";
    })
})