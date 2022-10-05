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
const resetBtnDisplay = document.getElementById("resetBtnDisplay");
const copyCodeBtn = document.getElementById("copyCode");
let colorDiv;
let colorCode;
let pCode;

// functions
const displayColorData = (arr, index) => {
  addColorDisplay(arr);
  addColorCode(arr, index);
};

const addColorDisplay = (arr) => {
  // create color divs
  colorDiv = document.createElement("div");
  colorDiv.classList.add("color-display-divs");
  colorDiv.style.backgroundColor = arr;
  schemeDisplay.appendChild(colorDiv);
};

const addColorCode = (arr, index) => {
  colorCode = document.createElement("div");
  colorCode.innerHTML = `
   <p class="pCode">${arr}</p>
   <div class="icon-box">
    <i 
      class="fa-regular fa-eye" 
      title="Change text color"
      onClick="changeFontColor()">
    </i>
    <i 
      class="fa-regular fa-clipboard"
      title="Copy code"
      id="copyCodeBtn"
      onClick="copyToClipboard()">
    </i>
    </div>`;
  colorCode.setAttribute("id", "ColorCode");
  // pCode = document.getElementsByClassName("pCode");
  // console.log(pCode);
  colorDiv.appendChild(colorCode);
};

const resetBtn = () => {
  // create div and button
  const refreshDiv = document.createElement("div");
  refreshDiv.classList.add("refresh-btn-div");
  resetBtnDisplay.appendChild(refreshDiv);
  const refreshBtn = document.createElement("button");
  refreshBtn.classList.add("resetBtn");
  refreshBtn.setAttribute("id", "ResetBtn");
  refreshBtn.setAttribute("type", "reset");
  refreshBtn.setAttribute("title", "Click to generate a new scheme");
  refreshBtn.setAttribute("onClick", "reloadPage()");
  refreshBtn.textContent = "Reset";
  refreshDiv.appendChild(refreshBtn);
};

const reloadPage = () => {
  window.location.reload();
};

const changeFontColor = () => {
  console.log("clicked");
  const ColorCode = document.getElementById("ColorCode");
  ColorCode.style.color = "#FFFFFE";
};

// TODO: Add a unique id to each p tag, maybe through array? So I can copy the code to clipboard.
const copyToClipboard = () => {
  // obtain all codes
  pCode = document.getElementsByClassName("pCode");
  const code1 = pCode.item(0).innerText;
  const code2 = pCode.item(1).innerText;
  const code3 = pCode.item(2).innerText;
  const code4 = pCode.item(3).innerText;
  const code5 = pCode.item(4).innerText;
  const code6 = pCode.item(5).innerText;
  // if sibling element === code, copy to clipboard
  let currentDiv = document.getElementById("ColorCode");
  let pSibling = currentDiv.nextElementSibling;
  console.log(currentDiv);
  console.log(pSibling);
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
          ColorsHexCodes.forEach((ele, index) => displayColorData(ele, index));
          break;
        case "rgb":
          ColorsRgbCodes.forEach((ele, index) => displayColorData(ele, index));
          break;
        case "hsl":
          ColorsHslCodes.forEach((ele, index) => displayColorData(ele, index));
          break;
        // case "hsv":
        //   ColorsHsvCodes.forEach((ele) => addColorDisplayHsv(ele));
        //   break;
        default:
          ColorsHexCodes.forEach((ele) => displayColorData(ele));
      }
    });
  resetBtn();
});
