class Modal {

  constructor(option = {}) {

    this.option = option;

    this.ACTIVE_BUTTON = this.option.activeSelectButton ? this.option.activeSelectButton : "active-btn-modal";
    this.ACTIVE_MODAL = this.option.activeSelectModal ? this.option.activeSelectModal : "visibility-modal";
    this.BUTTON_DATA_NAME = this.option.buttonDataName ? this.option.buttonDataName : "open-modal";
    this.MODAL_DATA_NAME = this.option.modalDataName ? this.option.modalDataName : "modal";
    this.CLOSE_DATA_NAME = this.option.closeDataName ? this.option.closeDataName : "close-modal";

    this.btnAll = document.querySelectorAll(`[data-${this.BUTTON_DATA_NAME}]`);
    this.modal = document.querySelectorAll(`[data-${this.MODAL_DATA_NAME}]`);

    this.open();
    this.close();
  }

  open() {

    if (this.btnAll.length > 0) {

      let newDataName = this.#convertString();

      this.btnAll.forEach(b => {
        b.addEventListener('click', () => {
          if (!b.classList.contains(this.ACTIVE_BUTTON)) {
            this.#removeVisibility();
          }
          b.classList.toggle(this.ACTIVE_BUTTON);
          this.requiredModal = document.querySelector(`[data-${this.MODAL_DATA_NAME}="${b.dataset[newDataName]}"]`);
          if (this.requiredModal) {
            this.requiredModal.classList.toggle(this.ACTIVE_MODAL);
            this.#disableScroll();
          }
        })
      })
    }
  }

  close() {
    if (this.modal.length > 0) {
      this.modal.forEach(m => {
        m.addEventListener('click', (event) => this.#hide(event));
      })
    }
  }


  #hide(event) {
    this.btnClose = event.currentTarget.querySelector(`[${this.CLOSE_DATA_NAME}]`);
    this.content = event.currentTarget.firstElementChild;

    if (this.btnClose) {
      if (this.content.contains(event.target) && !this.btnClose.contains(event.target)) {
        return;
      }
      this.#removeVisibility();
      event.target.removeEventListener("click", event => this.#hide(event));
    } else {
      if (this.content.contains(event.target)) {
        return;
      }
      this.#removeVisibility();
      event.target.removeEventListener("click", event => this.#hide(event));

    }
  }

  #removeVisibility() {
    document.querySelector('.' + this.ACTIVE_BUTTON) ? document.querySelector('.' + this.ACTIVE_BUTTON).classList.remove(this.ACTIVE_BUTTON) : '';
    document.querySelector('.' + this.ACTIVE_MODAL) ? document.querySelector('.' + this.ACTIVE_MODAL).classList.remove(this.ACTIVE_MODAL) : '';
    this.#enableScroll();
  }

  #disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.classList.add('lock-scroll');
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  #enableScroll() {
    document.documentElement.classList.remove('lock-scroll');
    window.onscroll = function () { };
  }

  #convertString() {
    let str = this.BUTTON_DATA_NAME;
    let i = -1;
    while ((i = str.indexOf('-', i + 1)) != -1) {
      str = str.substr(0, i + 1) + str[i + 1].toUpperCase() + str.substr(i + 2);
    }
    str = str.replace(/[\.\-/\\\s]/g, '');
    return str
  }
}



new Modal();




