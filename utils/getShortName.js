// function to get Text Width for a particular font size
const getTextWidth = (pText, pFontSize) => {
  var lDiv = document.createElement("div");
  document.body.appendChild(lDiv);

  lDiv.style.fontSize = "" + pFontSize + "px";
  lDiv.style.fontWeight = 500;
  lDiv.style.position = "absolute";
  lDiv.style.left = -1000;
  lDiv.style.top = -1000;
  lDiv.textContent = pText;

  var width = lDiv.clientWidth;

  document.body.removeChild(lDiv);
  lDiv = null;

  return width;
};

// calculating first part of the shortened title
const calculateFirstHalfLength = (title, maxLength) => {
  let length = 0;
  const fontSize = 16;
  // this can be optimized further using binary search instead of looping
  for (let i = 0; i < title.length; i++) {
    length = getTextWidth(title.substring(0, i), fontSize);
    if (length > maxLength) {
      return i;
    }
  }
  return title.length;
};

// calculating second part of the shortened title
const calculateSecondHalfLength = (title, maxLength) => {
  let length = 0;
  const fontSize = 16;
  for (let i = title.length - 1; i >= 0; i--) {
    length = getTextWidth(title.substring(i, title.length), fontSize);
    if (length > maxLength) {
      return title.length - i;
    }
  }
  return title.length;
};

// short name will be used as the new title in sidebar
const getShortNameFromTitle = (title) => {
  const sidebar = document.getElementById("sidebar");
  const sidebarWidth = parseInt(sidebar.offsetWidth * 0.65);
  const firstHalfLength = calculateFirstHalfLength(title, sidebarWidth / 2);
  const secondHalfLength = calculateSecondHalfLength(title, sidebarWidth / 2);
  const maxCharacters = firstHalfLength + secondHalfLength + 1;

  if (title.length > maxCharacters) {
    return (
      title.substring(0, firstHalfLength) +
      "..." +
      title.substring(title.length - secondHalfLength, title.length)
    );
  }
  return title;
};

export default getShortNameFromTitle;
