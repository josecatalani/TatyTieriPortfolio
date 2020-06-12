import "./assets/style/main.scss";
import Scene from "./app/Scene";
/**
 * App
 */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

async function getSettings() {
  const response = await fetch("data/settings.json");
  const json = await response.json();
  return json;
}

async function getProjects() {
  const response = await fetch("data/projects.json");
  const json = await response.json();
  return json;
}

const init = async () => {
  const [settings, projects] = await Promise.all([
    getSettings(),
    getProjects(),
  ]);
  new Scene(settings, projects);
};
init();
