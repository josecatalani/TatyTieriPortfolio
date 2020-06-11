import "./assets/style/main.scss";

import Scene from "./app/Scene";
/**
 * App
 */
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

const init = () => {
  new Scene();
};
init();
