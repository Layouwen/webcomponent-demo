const template = document.createElement('template')
template.innerHTML = `
<style>
  .my_com_wrapper {
    border: 1px solid red;
  }
  .my_com_main {
    height: 100px;
    background: skyblue;
  }
</style>
<div class="my_com_wrapper">
  <header>
    <slot name="head"></slot>
  </header>
  <main class="my_com_main">
    <slot name="middle"></slot>
  </main>
  <footer>
    <slot name="bottom"></slot>
  </footer>
</div>
`
class MyCom extends HTMLElement {
  constructor() {
    super()
    // 获取自定义组件的属性
    console.log(this.getAttribute('class'))
    console.log(this.getAttribute('cusAttr'))
    // 使用 attachShadow 与外面样式进行隔离
    const sd = this.attachShadow({ mode: 'open' })
    sd.appendChild(template.content)
  }
}

customElements.define('my-com', MyCom)
