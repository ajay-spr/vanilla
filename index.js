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
  const title = e.currentTarget.children[1].innerHTML.trim();
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
    const div = document.createElement("div");
    div.classList.add("item");
    if (item.title === currentItem) {
      div.classList.add("active-item");
    }

    div.innerHTML = `
            <img src="${item.previewImage}" class="thumbnail" />
            <div class="title">
            ${item.title}
            </div>
            `;
    div.addEventListener("click", handleChange);
    sidebar.appendChild(div);
  });
  updateImage(currentItem);
  updateLabel(currentItem);
};
// propagate label changes to DOM
const propagateTitleChange = (newTitle) => {
  const activeItem = document.querySelector(".active-item");
  activeItem.children[1].innerHTML = newTitle;
};
// init the app on startup
const init = () => {
  updateDOM();
  const label = document.getElementById("label");
  label.addEventListener("input", (e) => {
    const title = e.currentTarget.value.trim();
    // update data array
    const index = data.findIndex((item) => item.title === currentItem);
    data[index].title = title;
    // propagate changes to DOM
    propagateTitleChange(title);
    currentItem = title;
  });
};

window.onload = init;
