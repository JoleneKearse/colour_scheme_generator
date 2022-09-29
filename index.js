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
  colorDiv.style.backgroundColor = ColorsHexCodes;
  colorDiv.style.backgroundColor = arr;
  schemeDisplay.appendChild(colorDiv);
  addColorCode(arr);
};

const addColorCode = (arr) => {
  const colorCode = document.createElement("p");
  colorCode.innerHTML = `<p>${arr}</p>`;
  colorDiv.appendChild(colorCode);
};

// for hsv & cmyk, which can't be used as backgroundColor for colorDiv
const addNonSupportedColorDisplay = (arr) => {
  console.log(arr);
  colorDiv = document.createElement("div");
  colorDiv.classList.add("color-display-divs");
  colorDiv.style.backgroundColor = hsvToRgb(arr);
  schemeDisplay.appendChild(colorDiv);
  addColorCode(arr);
};

// strip hsv of extra chars 😡 😡 😡 Need to use regex?!?!
function stripHsvCode(hsv) {

}
// convert hsv to rgb
function hsvToRgb(h, s, v) {
  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [r * 255, g * 255, b * 255];
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // get user input
  const startingColor = document.getElementById("seedColor").value;
  const scheme = document.getElementById("schemeSelect").value;
  const codeName = document.getElementById("colorCodeName").value;
  console.log(`codeName: ${codeName}`);

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
      ColorsHexCodes = ColorsData.map((color) => color.hex.value);
      const ColorsRgbCodes = ColorsData.map((color) => color.rgb.value);
      const ColorsHslCodes = ColorsData.map((color) => color.hsl.value);
      const ColorsHsvCodes = ColorsData.map((color) => color.hsv.value);
      const ColorsCmykCodes = ColorsData.map((color) => color.cmyk.value);

      // USE SWITCH BEFORE DISPLAYING THE COLORS OR CODES
      switch (codeName) {
        case "rgb":
          ColorsRgbCodes.forEach((ele) => addColorDisplay(ele));
          break;
        case "hsl":
          ColorsHslCodes.forEach((ele) => addColorDisplay(ele));
          break;
        case "hsv":
          ColorsHsvCodes.forEach((ele) => addNonSupportedColorDisplay(ele));
          break;
        case "cmyk":
          ColorsCmykCodes.forEach((ele) => addNonSupportedColorDisplay(ele));
          break;
        default:
          ColorsHexCodes.forEach((ele) => addColorDisplay(ele));
      }

      // use addColorDisplay on line 34 to show colors to screen
      // ColorsHexCodes.forEach((ele) => addColorDisplay(ele));
    });
});
