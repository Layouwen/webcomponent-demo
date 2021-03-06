const template = document.createElement('template')
template.innerHTML = `
<style>
.k-dialog {
    width: 30%;
    z-index: 2001;
    display: block;
    position: absolute;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    margin: 0 auto;
    top: 15vh;
    left:30%;
}

.k-wrapper {
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    background: black;
    opacity: 0.4;
    z-index: 2000;
}

.k-header {
    padding: 20px 20px 10px;
}

.k-header .k-title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    float: left;
}

.k-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
}

.k-footer {
    padding: 10px 20px 30px;
    text-align: right;
}

.k-close {
    color: #909399;
    font-weight: 400;
    float: right;
    cursor: pointer;
}

.k-cancel {
    color: #606266;
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 500;
    margin-right: 10px;
}

.k-cancel:hover {
    color: #409eff;
    background: #ecf5ff;
    border-color: #c6e2ff;
}

.k-primary {
    border: 1px solid #dcdfe6;
    text-align: center;
    cursor: pointer;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    font-weight: 500;
    background: #409eff;
    color: #fff;
    margin-left: 10px;
}

.k-primary:hover {
    background: #66b1ff;
}
.k-input{
    width: 100%;
    margin-left: 20px;
    margin-bottom: 20px;
}
.input-inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
    margin-top: 20px;
}
</style>
<div class="k-wrapper"></div>
<div class="k-dialog">
    <div class="k-header">
        <span class="k-title">??????</span><span class="k-close">X</span>
    </div>
    <div class="k-body">
        <span>??????????????????</span>
        <input class="input-inner" type="text" />
    </div>
    <div class="k-footer">
        <span class="k-cancel">??????</span>
        <span class="k-primary">??????</span>
    </div>
</div> 
`

class MessageBox extends HTMLElement {
  #sd
  #kWrapperEl
  #kDialogEl

  constructor() {
    super()
    this.#sd = this.attachShadow({ mode: 'open' })
    this.#sd.appendChild(template.content)
    this.init()
    // ??????????????????
    this.addEvent()
  }
  // ?????????
  init() {
    this.#kWrapperEl = this.#sd.querySelector('.k-wrapper')
    this.#kDialogEl = this.#sd.querySelector('.k-dialog')

    const attrs = ['title', 'content', 'isShow']
    attrs.forEach(name => (this[name] = this.getAttribute(name)))

    if (this.title) this.#sd.querySelector('.k-title').innerHTML = this.title
    if (this.content) this.#sd.querySelector('.k-body').innerHTML = this.content
    this.isShow !== 'false' ? this.open() : this.#close()
  }
  // ???????????????
  addEvent() {
    this.#sd.querySelector('.k-dialog').onclick = e => {
      // ???????????????????????????????????????
      switch (e.target.className) {
        // ??????
        case 'k-close':
          // ?????????????????????
          this.dispatchEvent(new CustomEvent('cancel'))
          this.#close()
          break
        // ??????
        case 'k-cancel':
          // ?????????????????????
          this.dispatchEvent(new CustomEvent('cancel'))
          this.#close()
          break
        // ??????
        case 'k-primary':
          // ?????????????????????
          this.dispatchEvent(new CustomEvent('success'))
          this.#close()
          break
      }
    }
  }
  #close() {
    console.log('close')
    this.#kWrapperEl.style.display = 'none'
    this.#kDialogEl.style.display = 'none'
  }
  open() {
    this.#kWrapperEl.style.display = 'block'
    this.#kDialogEl.style.display = 'block'
  }
}

customElements.define('message-box', MessageBox)
