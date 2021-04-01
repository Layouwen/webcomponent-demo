import './MyCom.js'

const myComEl = document.querySelector('.my_com')
// 当 attachShadow 的 mode 为 open 时，可以获取 shadowRoot 的内容并且操作。
// 如果 mode 为 closed 则无法获取该节点信息
console.log(myComEl.shadowRoot)
const myColElChildren = myComEl.shadowRoot.children
![...myColElChildren].forEach(el => (el.style = 'font-size: 40px;'))
