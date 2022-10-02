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

// variables
const form = document.getElementById("form");
const schemeDisplay = document.getElementById("scheme-display");
let colorDiv;

// functions
const addColorDisplay = (arr) => {
  // create color divs
  colorDiv = document.createElement("div");
  colorDiv.classList.add("color-display-divs");
  colorDiv.style.backgroundColor = arr;
  schemeDisplay.appendChild(colorDiv);
  addColorCode(arr);
};

const addColorCode = (arr) => {
  const colorCode = document.createElement("p");
  colorCode.innerHTML = `<p>${arr}</p>`;
  colorDiv.appendChild(colorCode);
};

const addColorDisplayHsv = (arr) => {
  colorDiv = document.createElement("div");
  colorDiv.classList.add("color-display-divs");
  colorDiv.style.backgroundColor = getHexCodesToDisplay(arr);
  schemeDisplay.appendChild(colorDiv);
  addColorCode(arr);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // get user input
  const startingColor = document.getElementById("seedColor").value;
  const scheme = document.getElementById("schemeSelect").value;
  const codeName = document.getElementById("colorCodeName").value;

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
      // get all color codes in an array
      const ColorsHexCodes = ColorsData.map((color) => color.hex.value);
      const ColorsRgbCodes = ColorsData.map((color) => color.rgb.value);
      const ColorsHslCodes = ColorsData.map((color) => color.hsl.value);
      // const ColorsHsvCodes = ColorsData.map((color) => color.hsv.value);
      // const ColorsCmykCodes = ColorsData.map((color) => color.cmyk.value);

      // DISPLAY THE COLORS AND CODES
      switch (codeName) {
        case "hex":
          ColorsHexCodes.forEach((ele) => addColorDisplay(ele));
          break;
        case "rgb":
          ColorsRgbCodes.forEach((ele) => addColorDisplay(ele));
          break;
        case "hsl":
          ColorsHslCodes.forEach((ele) => addColorDisplay(ele));
          break;
        // case "hsv":
        //   ColorsHsvCodes.forEach((ele) => addColorDisplayHsv(ele));
        //   break;
        default:
          ColorsHexCodes.forEach((ele) => addColorDisplay(ele));
      }
    });
});
