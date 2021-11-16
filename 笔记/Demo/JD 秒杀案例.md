## 京东秒杀倒计时
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    '\5B8B\4F53', sans-serif;
  color: #666;
}

a {
  color: #666;
  text-decoration: none;
}

.seckill-countdown {
  display: block;
  position: relative;
  overflow: hidden;
  width: 190px;
  height: 260px;
  color: #fff;
  margin: 50px auto;
  background-color: #e83632;
  background-image: url('./jd.png');
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
}

.seckill-countdown:hover {
  color: #fff;
}

.seckill-countdown .countdown-title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-top: 31px;
}

.seckill-countdown .countdown-fallback {
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-top: 110px;
}

.seckill-countdown .countdown-desc {
  margin-top: 90px;
  font-size: 14px;
  text-align: center;
}

.seckill-countdown .countdown-desc strong {
  font-size: 18px;
  padding-right: 2px;
  vertical-align: middle;
  display: inline-block;
  margin-top: -1px;
}

.seckill-countdown .countdown-main {
  margin-left: auto;
  margin-right: auto;
  width: 130px;
  height: 30px;
  margin-top: 10px;
  display: block;
}

.seckill-countdown .countdown-main .timmer__unit {
  position: relative;
  float: left;
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: #2f3430;
  margin-right: 20px;
  color: white;
  font-size: 20px;
}

.seckill-countdown .countdown-main .timmer__unit:after {
  content: ':';
  display: block;
  position: absolute;
  right: -20px;
  font-weight: bolder;
  font-size: 18px;
  width: 20px;
  height: 100%;
  top: 0;
}

.seckill-countdown .countdown-main .timmer__unit--second {
  margin-right: 0;
}

.seckill-countdown .countdown-main .timmer__unit--second:after {
  content: none;
}

  </style>
</head>

<body>
  <a class="seckill-countdown" href="javascript:void(0)">
    <div class="countdown-title">京东秒杀</div>
    <div>
      <div class="countdown-desc">
        <strong>00:00</strong>点场 距结束
      </div>
      <span class="timmer countdown-main">
        <span class="timmer__unit timmer__unit--hour">04</span>
        <span class="timmer__unit timmer__unit--minute">47</span>
        <span class="timmer__unit timmer__unit--second">09</span>
      </span>
    </div>
  </a>

  <script>
    // 实现倒计时效果

    // 分析  秒杀倒计时效果
    //  1. 需要有两个时间（现在时间  、 秒杀时间）
    //  2. 需要将这两段时间的差值得到（剩下的时间 ==> 转成时分秒放到span中展示）

    let hour = document.querySelector('.timmer__unit--hour')
    let minute = document.querySelector('.timmer__unit--minute')
    let second = document.querySelector('.timmer__unit--second')

    function changeTime() {
      // 1. 

      // 两个new Date() 前面 + 可以不写
      // 两个时间对象在相减的时候，底层会自动的隐式转换为时间戳来进行运算

      // 现在时间
      let date1 = +new Date()

      // 秒杀时间
      let date2 = +new Date('2021/10/21 18:30:00')

      // 差值(剩下的时间)  转成秒
      let time = (date2 - date1) / 1000

      // 解决秒杀时间到了问题
      if (time < 0) {
        // 说明秒杀时间到了
        console.log('秒杀时间到了')

        // 解决下负数情况
        time = 0

        // 把定时器给关闭掉
        clearInterval(timerId)
      }

      console.log(date1, date2);
      console.log(time);

      // 把秒转成对应的小时
      let h = parseInt(time / 60 / 60 % 24)
      h = h < 10 ? '0' + h : h
      console.log(h)

      // 分钟
      let m = parseInt(time / 60 % 60)
      m = m < 10 ? '0' + m : m
      console.log(m)

      let s = parseInt(time % 60)
      s = s < 10 ? '0' + s : s
      console.log(s)

      // 把时间设置到span中展示
      hour.innerHTML = h
      minute.innerHTML = m
      second.innerHTML = s
    }

    let timerId = setInterval(changeTime, 1000)

    changeTime()
  </script>
</body>

</html>
```