class Modal {

  constructor() {
    this.btnAll = document.querySelectorAll("[data-open-modal]");
    this.modal = document.querySelectorAll("[data-modal]");
    this.open();
    this.close();
  }

  open() {

    if (this.btnAll.length > 0) {
      this.btnAll.forEach(b => {
        b.addEventListener('click', () => {
          if (!b.classList.contains('active-btn-modal')) {
            document.querySelector('.visibility-modal') ? document.querySelector('.visibility-modal').classList.remove('visibility-modal') : '';
            document.querySelector('.active-btn-modal') ? document.querySelector('.active-btn-modal').classList.remove('active-btn-modal') : '';
          }
          b.classList.toggle('active-btn-modal');
          this.requiredModal = document.querySelector(`[data-modal="${b.dataset.openModal}"]`);
          if (this.requiredModal) {
            this.requiredModal.classList.toggle('visibility-modal');
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
    this.btnClose = event.currentTarget.querySelector("[data-close-modal]");
    this.content = event.currentTarget.firstElementChild;

    if (this.btnClose) {
      if (this.content.contains(event.target) && !this.btnClose.contains(event.target)) {
        return;
      }
      this.#removeVisibility(event.target);
    } else {
      if (this.content.contains(event.target)) {
        return;
      }
      this.#removeVisibility(event.target);


    }
  }

  #removeVisibility(modal) {
    document.querySelector('.active-btn-modal') ? document.querySelector('.active-btn-modal').classList.remove('active-btn-modal') : '';
    document.querySelector('.visibility-modal') ? document.querySelector('.visibility-modal').classList.remove('visibility-modal') : '';
    this.#enableScroll();
    modal.removeEventListener("click", event => this.#hide(event));
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
}



new Modal();




