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

var currentItem = data[0].title;

const removeInstructions = () => {
  const instructions = document.getElementById("instructions");
  instructions.style.display = "none";
};

const setAsActive = (e) => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.classList.remove("active-item");
  });
  e.currentTarget.classList.add("active-item");
};

const updateImage = (title) => {
  const image = document.getElementById("image");
  const item = data.find((item) => item.title === title);

  image.style.background = `url("${item.previewImage}")`;
  image.style.backgroundRepeat = "no-repeat";
  image.style.backgroundPosition = "center center";
  image.style.backgroundSize = "cover";
};

const updateLabel = (title) => {
  const label = document.getElementById("label");
  label.innerHTML = title;
};

const handleChange = (e) => {
  const title = e.currentTarget.children[1].innerHTML.trim();
  currentItem = title;

  setAsActive(e);
  updateImage(title);
  updateLabel(title);
};

const init = () => {
  const sidebar = document.getElementById("sidebar");

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

window.onload = init;
