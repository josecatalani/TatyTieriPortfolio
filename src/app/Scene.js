export default class Scene {
  constructor() {
    this.setState();
    this.bindElements();
    this.setInitialAnimations();
    this.setEvents();
  }

  setState() {
    this.scrollDocLocked = true;
    this.enteredSite = false;
    this.homePanel = document.getElementById("home");
    this.bioPanel = document.getElementById("bio");
    this.panels = [this.homePanel, this.bioPanel];
    this.activePanelIndex = 0;
  }

  releaseScroll() {
    this.scrollDocLocked = false;
    document.getElementsByTagName("body")[0].classList.remove("locked");
  }

  getActivePanel() {
    return this.panels[this.activePanelIndex];
  }

  getOldPanel() {
    return this.panels.find((panel) => panel.classList.contains("active"));
  }

  setActivePanel(index) {
    return this.panels[index];
  }

  goToNextPanel() {
    if (this.activePanelIndex + 1 > this.panels.length - 1) {
      this.activePanelIndex = 0;
    } else {
      this.activePanelIndex = this.activePanelIndex + 1;
    }
    this.setActivePanel(this.activePanelIndex);
    this.animateChangingPanel();
  }

  goToPrevPanel() {
    if (this.activePanelIndex < 0) {
      this.activePanelIndex = this.panels.length - 1;
    } else {
      this.activePanelIndex = this.activePanelIndex - 1;
    }
    this.animateChangingPanel();
  }

  animateChangingPanel() {
    const panel = this.getActivePanel();
    const oldPanel = this.getOldPanel();

    oldPanel.classList.replace("active", "old");

    setTimeout(() => panel.classList.add("active"), 500);
  }

  bindElements() {
    this.window = window;
    this.main = document.getElementById("main");
    this.menusItems = document.querySelectorAll(".menu-items");
  }

  setInitialAnimations() {
    setTimeout(
      () => [...this.menusItems].map((menu) => menu.classList.add("start")),
      1500
    );
  }

  setEvents() {
    this.window.addEventListener("wheel", (e) => this.onScroll(e));
  }

  onScroll(e) {
    if (event.deltaY < 0 && !this.enteredSite) return;
    if (!this.enteredSite) {
      this.enteredSite = true;

      [...this.menusItems].map((menu) =>
        menu.classList.replace("start", "leave")
      );

      setTimeout(() => {
        this.goToNextPanel();
        this.main.classList.add("purple");
        this.releaseScroll();
      }, 1000);
    }
  }
}
