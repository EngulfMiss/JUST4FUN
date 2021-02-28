//给js文件添加页面加载事件
window.addEventListener('load',()=>{
    // 获取放置时间的元素
    //小时
    const hour = document.querySelector(".hour>span");
    //分钟
    const minute = document.querySelector(".minute>span");
    //秒
    const second = document.querySelector(".second>span");

    //---------------------------
    //获取开启和暂停元素
    //开启
    const running = document.querySelector(".running>span");
    //暂停
    const paused = document.querySelector(".paused>span");
    //获取提示框
    const toast = document.querySelector(".toast");


    //-------------------------------


    //定义函数 更新时间
    const getTime = () => {
        // 获取当前的时间
        const nowTime = new Date();
        //获取当前的小时
        const hours = nowTime.getHours();
        //更新页面时间 所有都是小于 10 前面加个 0 小时 分钟 秒钟同理
        hour.innerHTML = hours < 10 ? "0" + hours : hours;
        //获取当前的分钟
        const minutes = nowTime.getMinutes();
        minute.innerHTML = minutes < 10 ? "0" + minutes : minutes;
        //获取当前的秒
        const seconds = nowTime.getSeconds();
        second.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    }
    getTime();

    //定义定时器 更新时间
    let timer = setInterval(() => {
        getTime();
    },1000);

    //-------------------
    //定义一个变量 控制定时器 是否需要开启
    let flag = false;

    //定义一个值来保存opacity的值
    let opacity = 0;

    //定义一个函数来弹出提示框
    const showToast = () => {
        //跳出提示框 开启定时器 逐渐显示提示框
        const toastTimer = setInterval(() => {
            opacity += 0.1;
            //设置提示框的透明度
            toast.style.opacity = opacity;
            //让提示框显示后1.5s后关闭
            //定义一个一次性定时器
            //如果opacity>=1就是完全显示了 css opacity的值最大为1
            if(opacity >= 1){
                setTimeout(()=>{
                    //将opacity重新设置为0
                    opacity = 0;
                    //清除定时器
                    clearInterval(toastTimer);
                    //让提示框消失
                    toast.style.opacity = 0;
                },1500);
            }
        },30);
    };

    //开启和暂停按钮使用
    paused.addEventListener('click',()=>{
        //调用提示框
        toast.innerHTML = "时钟已暂停";
        showToast();

        //点击暂停 清除定时器
        clearInterval(timer);
        //暂停之后 赋新值给flag
        flag = true;
    });
    running.addEventListener('click',()=>{
        // 如果flag时true就开启 否则不开启
        if(flag){
            toast.innerHTML = "时钟已开启";
            showToast();
            timer = setInterval(()=>{
                getTime();
            },1000);
            //开启后将值复位
            flag = false;
        }else{
            toast.innerHTML = "时钟已经开启了(=.=)"
            showToast();
        }
    })
})