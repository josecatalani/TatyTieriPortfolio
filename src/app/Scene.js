import Projects from "./Projects";
import Slideshow from "./Slideshow";
export default class Scene {
  constructor(settings, projects) {
    this.settings = settings;
    this.projects = projects;

    this.setState();
    this.renderContent();
    this.bindElements();
    this.setInitialAnimations();
    this.setEvents();
    this.setSlideShows();

    document.title = settings.site_title;
  }

  setState() {
    this.scrollDocLocked = true;
    this.enteredSite = false;
    this.activePanelIndex = 0;
  }

  setSlideShows() {
    this.slideshow = new Slideshow();
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
    if (index === this.activePanelIndex) return;
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

    const endAnimationFunction = () => {
      oldPanel.style = "";
      panel.style.display = "block";
      oldPanel.classList.remove("old");
      panel.classList.add("active");
      oldPanel.removeEventListener("animationend", endAnimationFunction);
    };

    oldPanel.classList.remove("active");
    oldPanel.classList.add("old");
    oldPanel.classList.add("old");
    oldPanel.addEventListener("animationend", endAnimationFunction);
  }

  bindElements() {
    this.window = window;
    this.main = document.getElementById("main");
    this.virtuesItems = document.querySelectorAll(".virtues-items");
    this.menu = document.getElementById("menu");
    this.menuLink = document.querySelectorAll("#menu a");
    this.panels = [
      document.getElementById("home"),
      document.getElementById("bio"),
      document.getElementById("projects"),
      document.getElementById("works"),
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

    [...this.menuLink].forEach((menuLink) => {
      menuLink.addEventListener("click", (e) => {
        e.preventDefault();
        [...this.menuLink].forEach((menuItem) =>
          menuItem.classList.remove("selected")
        );
        menuLink.classList.add("selected");
        const panelToGo = menuLink.getAttribute("href").split("/").pop();
        this.goToPanel(panelToGo);
        return false;
      });
    });
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
    const converter = new showdown.Converter();
    this.settings = {
      ...this.settings,
      bio_description: converter.makeHtml(this.settings.bio_description),
    };
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
