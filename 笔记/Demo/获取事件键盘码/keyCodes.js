// 获取元素
const insert = document.querySelector('#insert')

// 给 window 注册键盘事件
window.addEventListener('keydown', (e) => {
  // e 事件对象 包含了当前触发事件的相关信息
  // console.log(this) // window
  insert.innerHTML = `
    <div class='key'>
      ${e.key === '' ? 'Space' : e.key}
      <small>e.key</small>
    </div>
    <div class='key'>
      ${e.keyCode}
      <small>e.keyCode</small>
    </div>
    <div class='key'>
      ${e.code}
      <small>e.code</small>
    </div>
    `
})
