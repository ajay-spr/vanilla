const data = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title:
      "a man and a woman trying to cook a meal together in a modern kitchen.jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2022.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-may-2022.key",
  },
];

// keeping track of the current active item
var currentItem = data[0].title;

// remove instructions from page
const removeInstructions = () => {
  const instructions = document.getElementById("instructions");
  instructions.remove();
};

// utility function to get title from short name
const getTitleFromShortName = (shortName) => {
  const item = data.find((item) => item.shortName === shortName);
  return item.title;
};

// short name will be used as the new title in sidebar
const getShortNameFromTitle = (title) => {
  // if title is large, shorten it by adding ... in the middle
  if (title.length > 30) {
    return (
      title.substring(0, 16) +
      "..." +
      title.substring(title.length - 10, title.length)
    );
  }
  return title;
};

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
  const title = getTitleFromShortName(shortName);
  currentItem = title;
  setAsActive(e);
  updateImage(title);
  updateLabel(title);
};

// update the DOM on startup
const updateDOM = () => {
  const sidebar = document.getElementById("sidebar");
  // create sidebar items
  data.forEach((item, i) => {
    item.shortName = getShortNameFromTitle(item.title);
    const div = document.createElement("div");
    div.classList.add("item");
    if (item.title === currentItem) {
      div.classList.add("active-item");
    }

    div.innerHTML = `
            <img src="${item.previewImage}" class="thumbnail" />
            <div class="title">
            ${item.shortName}
            </div>
            `;
    div.addEventListener("click", handleChange);
    sidebar.appendChild(div);
  });
  updateImage(currentItem);
  updateLabel(currentItem);
};
// propagate label changes to DOM
const propagateTitleChange = (newShortName) => {
  const activeItem = document.querySelector(".active-item");
  activeItem.children[1].innerHTML = newShortName;
};
// init the app on startup
const init = () => {
  updateDOM();
  const label = document.getElementById("label");
  label.addEventListener("input", (e) => {
    const title = e.currentTarget.value.trim();
    const shortName = getShortNameFromTitle(title);
    // update item in data array
    const index = data.findIndex((item) => item.title === currentItem);
    data[index].title = title;
    data[index].shortName = shortName;
    // propagate changes to DOM
    propagateTitleChange(shortName);
    currentItem = title;
  });
  // keyboard events listener
  document.addEventListener("keydown", (e) => {
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
  });
};

window.onload = init;
