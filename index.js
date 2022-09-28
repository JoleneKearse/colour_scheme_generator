// LIGHT/DARK MODE TOGGLE

function isLight() {
  return localStorage.getItem("light-mode");
}

function toggleRootClass() {
  document.querySelector(":root").classList.toggle("light");
}

function toggleLocalStorageItem() {
  if (isLight()) {
    localStorage.removeItem("light-mode");
  } else {
    localStorage.setItem("light-mode", "set");
  }
}

if (isLight()) {
  toggleRootClass();
}

document.querySelector(".theme-icon").addEventListener("click", () => {
  toggleLocalStorageItem();
  toggleRootClass();
});

// CORE FUNCTIONALITY

const form = document.getElementById("form");
const schemeDisplay = document.getElementById("scheme-display");
let colorDiv;

const addColorDisplay = (arr) => {
  // create color divs
  colorDiv = document.createElement("div");
  colorDiv.classList.add("color-display-divs");
  colorDiv.style.backgroundColor = arr;
  schemeDisplay.appendChild(colorDiv);
  addColorCode(arr);
};

const addColorCode = (arr) => {
  // add text to color divs
  const hexCode = document.createElement("p");
  hexCode.innerHTML = `<p>${arr}</p>`;
  colorDiv.appendChild(hexCode);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // get user input
  const startingColor = document.getElementById("seedColor").value;
  const scheme = document.getElementById("schemeSelect").value;

  // build the url using user input
  const url = `https://www.thecolorapi.com/scheme?hex=${startingColor.substring(
    1
  )}&mode=${scheme}&count=6`;

  // call the API
  fetch(url, { method: "GET" })
    .then((resp) => resp.json())
    .then((data) => {
      // put color data in an array
      const ColorsData = data.colors;
      console.log(ColorsData);
      // get all hex codes in an array
      const ColorsHexCodes = ColorsData.map((color) => color.hex.value);
      console.log(ColorsHexCodes);
      ColorsHexCodes.forEach((ele) => addColorDisplay(ele));
    });
});
