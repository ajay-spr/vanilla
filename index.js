import {
  updateDOM,
  titleChangeHandler,
  keyDownHandler,
} from "./utils/helpers.js";

// init the app on startup
const init = () => {
  updateDOM();
  const label = document.getElementById("label");
  label.addEventListener("input", titleChangeHandler);
  document.addEventListener("keydown", keyDownHandler);
};

window.onload = init;
