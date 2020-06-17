export default class Slideshow {
  constructor() {
    this.setupControls();
  }

  setupControls() {
    const controls = document.querySelectorAll(".gallery-controls");

    [...controls].forEach((control) => {
      control.addEventListener("click", (e) => {
        const parent = e.target.parentNode;
        parent.classList.add("play");
        let index = 0;
        const items = [...parent.children].filter((child) =>
          child.classList.contains("gallery-image")
        );
        items[index].classList.add("show");
        setInterval(() => {
          if (index + 1 > items.length - 1) {
            index = 0;
          } else {
            index++;
          }
          [...items].forEach((item) => item.classList.remove("show"));
          items[index].classList.add("show");
        }, 8000);
      });
    });
  }
}
