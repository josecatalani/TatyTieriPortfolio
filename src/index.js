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

const init = async () => {
  const settings = await getSettings();
  console.log({ settings });
  new Scene();
};
init();
