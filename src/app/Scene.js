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
    this.activePanelIndex = 0;
    this.colors = ["none", "purple", "cyan"];
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
    this.activePanelIndex = index;
  }

  goToPanel(panelId) {
    const index = this.panels.findIndex((panel) => panelId === panel.id);
    this.setActivePanel(index);
    this.animateChangingPanel();
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

  getBackgroundColorClass() {
    return this.colors[this.activePanelIndex];
  }

  animateChangingPanel() {
    const panel = this.getActivePanel();
    const oldPanel = this.getOldPanel();
    this.enteredSite = true;
    this.releaseScroll();

    oldPanel.classList.add("old");
    this.main.classList.remove(...this.colors);
    this.main.classList.add(this.getBackgroundColorClass());
    this.window.scrollTo(0, 0);
    setTimeout(() => panel.classList.add("active"), 500);
    setTimeout(() => oldPanel.classList.remove("old", "active"), 1000);
  }

  bindElements() {
    this.window = window;
    this.main = document.getElementById("main");
    this.virtuesItems = document.querySelectorAll(".virtues-items");
    this.menu = document.getElementById("menu");
    this.menuLink = document.querySelectorAll("#menu a");
    this.homePanel = document.getElementById("home");
    this.projectsPanel = document.getElementById("projects");
    this.bioPanel = document.getElementById("bio");
    this.panels = [this.homePanel, this.bioPanel, this.projectsPanel];
  }

  setInitialAnimations() {
    setTimeout(
      () =>
        [...this.virtuesItems].map((virtue) => virtue.classList.add("start")),
      1500
    );
  }

  setEvents() {
    this.window.addEventListener("wheel", (e) => this.onScroll(e));

    [...this.menuLink].forEach((menuLink) =>
      menuLink.addEventListener("click", (e) => {
        e.preventDefault();
        const panelToGo = menuLink.getAttribute("href").split("/").pop();
        this.goToPanel(panelToGo);
        return false;
      })
    );
  }

  onScroll(e) {
    if (event.deltaY < 0 && !this.enteredSite) return;
    if (!this.enteredSite) {
      this.enteredSite = true;

      [...this.virtuesItems].map((virtue) =>
        virtue.classList.replace("start", "leave")
      );

      setTimeout(() => {
        this.goToNextPanel();
        this.releaseScroll();
      }, 1000);
    }
  }
}
