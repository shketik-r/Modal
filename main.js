class Modal {
  constructor(wrap, btn) {
    this.wrap = typeof wrap === "string" ? document.querySelector(wrap) : wrap;
    this.btn = typeof btn === "string" ? document.querySelector(btn) : btn;
    this.menu = this.wrap.firstElementChild;
    this.#click();
    this.#closeWindow();
  }

  #click() {
    this.btn.addEventListener('click', () => {
      this.wrap.classList.toggle('active');
      this.btn.classList.toggle('active');
      this.wrap.classList.contains('active') ? this.#disableScroll() : this.#enableScroll();
    })
  }

  #closeWindow() {
    this.wrap.addEventListener('click', (event) => this.#hide(event));
  }


  #hide(event) {
    if (this.menu.contains(event.target))
      return;
    this.wrap.classList.remove('active');
    this.btn.classList.remove('active');
    this.#enableScroll();
    this.wrap.removeEventListener("click", event => this.#hide(event));
  }

  #disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.classList.add('overflow');
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  #enableScroll() {
    document.documentElement.classList.remove('overflow');
    window.onscroll = function () { };
  }
}



const btn = document.querySelector('.open-menu');
const wrap = document.querySelector('.menu-wrapper');


if (btn && wrap) {
  const menu = new Modal(wrap, btn)

}



