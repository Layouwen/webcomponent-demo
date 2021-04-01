class MyImg extends HTMLImageElement {
  constructor() {
    super()
    const src = 'https://resource.ttplus.cn/publish/app/pics/2019/04/18/233772/76d96560-7211-483d-988c-dc00d8391f41.jpg'
    setTimeout(() => {
      this.src = src
    }, 1000)
  }
}

customElements.define('my-img', MyImg, {
  extends: 'img',
})
