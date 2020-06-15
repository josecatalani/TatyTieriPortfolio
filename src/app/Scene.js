import Projects from "./Projects";
export default class Scene {
  constructor(settings, projects) {
    this.settings = settings;
    this.projects = projects;

    this.setState();
    this.renderContent();
    this.bindElements();
    this.setInitialAnimations();
    this.setEvents();

    document.title = settings.site_title;
  }

  setState() {
    this.scrollDocLocked = true;
    this.enteredSite = false;
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

  animateChangingPanel() {
    const panel = this.getActivePanel();
    const oldPanel = this.getOldPanel();
    this.enteredSite = true;
    this.releaseScroll();
    this.window.scrollTo(0, 0);

    oldPanel.classList.remove("active");
    oldPanel.classList.add("old");
    setTimeout(() => {
      oldPanel.style = "";
      panel.style.display = "block";
      panel.classList.add("active");
    }, 1000);
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
    this.worksPanel = document.getElementById("works");
    this.panels = [
      this.homePanel,
      this.bioPanel,
      this.projectsPanel,
      this.worksPanel,
    ];
  }

  setInitialAnimations() {
    const panel = this.getActivePanel();
    panel.style.display = "block";
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

  renderProjects() {
    this.renderedProjects = new Projects(this.projects);
  }

  renderHome() {
    const template = document.getElementById("home-template").innerHTML;
    const rendered = Mustache.render(template, { ...this.settings });
    document.getElementById("render-home").innerHTML = rendered;
  }

  renderBio() {
    const template = document.getElementById("bio-template").innerHTML;
    const rendered = Mustache.render(template, { ...this.settings });
    document.getElementById("render-bio").innerHTML = rendered;
  }

  renderContent() {
    document.querySelector(
      "#msg-shy a"
    ).innerHTML = this.settings.contact_cta_title;
    this.renderProjects();
    this.renderHome();
    this.renderBio();
  }
}
