import getTitleFromShortName from "./getTitleFromShortName.js";
import data from "../data.js";
import getShortNameFromTitle from "./getShortName.js";

// keeping track of the current active item
var currentItem = data[0].title;

// set the item as active in sidebar
const setAsActive = (e) => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.classList.remove("active-item");
  });
  e.currentTarget.classList.add("active-item");
};

// update the image in the main section
const updateImage = (title) => {
  const image = document.getElementById("image");
  const item = data.find((item) => item.title === title);
  // image styles
  image.style.background = `url("${item.previewImage}")`;
  image.style.backgroundRepeat = "no-repeat";
  image.style.backgroundPosition = "center center";
  image.style.backgroundSize = "cover";
};

// update the label under image
const updateLabel = (title) => {
  const label = document.getElementById("label");
  label.value = title;
};

// event handler for sidebar items
const handleChange = (e) => {
  const shortName = e.currentTarget.children[1].innerHTML.trim();
  const title = getTitleFromShortName(shortName, data);
  currentItem = title;
  setAsActive(e);
  updateImage(title, data);
  updateLabel(title);
};

// propagate label changes to DOM
const propagateTitleChange = (newShortName) => {
  const activeItem = document.querySelector(".active-item");
  activeItem.children[1].innerHTML = newShortName;
};

const createSidebarItem = (item) => {
  item.shortName = getShortNameFromTitle(item.title);
  const div = document.createElement("div");
  div.classList.add("item");
  if (item.title === currentItem) {
    div.classList.add("active-item");
  }

  const image = document.createElement("img");
  image.src = item.previewImage;
  image.classList.add("thumbnail");
  div.appendChild(image);

  const title = document.createElement("div");
  title.classList.add("title");
  title.innerHTML = item.shortName;
  div.appendChild(title);

  div.addEventListener("click", handleChange);
  return div;
};

// update the DOM on startup
export const updateDOM = () => {
  const sidebar = document.getElementById("sidebar");
  data.forEach((item) => {
    const div = createSidebarItem(item);
    sidebar.appendChild(div);
  });
  updateImage(currentItem, data);
  updateLabel(currentItem);
};

export const titleChangeHandler = (e) => {
  const title = e.currentTarget.value.trim();
  const shortName = getShortNameFromTitle(title);

  const index = data.findIndex((item) => item.title === currentItem);
  data[index].title = title;
  data[index].shortName = shortName;

  propagateTitleChange(shortName);
  currentItem = title;
};

export const keyDownHandler = (e) => {
  const key = e.code;
  if (key == "ArrowUp") {
    const activeItem = document.querySelector(".active-item");
    const prevItem = activeItem.previousElementSibling;
    if (prevItem) {
      prevItem.click();
    }
  } else if (key == "ArrowDown") {
    const activeItem = document.querySelector(".active-item");
    const nextItem = activeItem.nextElementSibling;
    if (nextItem) {
      nextItem.click();
    }
  }
};
