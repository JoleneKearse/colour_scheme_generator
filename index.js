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
  addColorDisplay(arr, index);
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
   <p id="pCode${index}">${arr}</p>
   <div class="icon-box">
    <i 
      class="fa-regular fa-eye" 
      title="Change text color"
      onClick="changeFontColor()">
    </i>
    <i 
      class="fa-regular fa-clipboard copyCodeBtn"
      title="Copy code"
      class="copyCodeBtn"
      id="copyCodeBtn${index}"
      onClick="copyToClipboard(this.id)">
    </i>
    </div>`;
  colorCode.setAttribute("id", `ColorCode${index}`);
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
  ColorCode.style.color = "#000";
};

// TODO: How to access only clicked btn???
const copyToClipboard = (id) => {
  // this displays the proper id, now I want to associate that id with the colorcode id. I set up the codes on lines 113-118.
  // alert(id);
  const btn1 = document.getElementById("copyCodeBtn0");
  const btn2 = document.getElementById("copyCodeBtn1");
  const btn3 = document.getElementById("copyCodeBtn2");
  const btn4 = document.getElementById("copyCodeBtn3");
  const btn5 = document.getElementById("copyCodeBtn4");
  const btn6 = document.getElementById("copyCodeBtn5");

  const code1 = document.getElementById("pCode0");
  const code2 = document.getElementById("pCode1");
  const code3 = document.getElementById("pCode2");
  const code4 = document.getElementById("pCode3");
  const code5 = document.getElementById("pCode4");
  const code6 = document.getElementById("pCode5");

  // I thought this might copy the correct code, but it doesn't
  if (id === btn1) {
    // alert(code1);
    const codeToSee = code1.innerText;
    console.log(codeToSee);
    navigator.clipboard.writeText(codeToSee);
    // alert(`${codeToSee} copied`);
  } else if (id === btn2) {
    // alert(code2);
    const codeToSee = code2.innerText;
    console.log(codeToSee);
    navigator.clipboard.writeText(codeToSee);
    // alert(`${codeToSee} copied`);
  } else if (id === btn3) {
    // alert(code3);
    const codeToSee = code3.innerText;
    console.log(codeToSee);
    navigator.clipboard.writeText(codeToSee);
    // alert(`${codeToSee} copied`);
  } else if (id === btn4) {
    // alert(code4);
    const codeToSee = code4.innerText;
    console.log(codeToSee);
    navigator.clipboard.writeText(codeToSee);
    // alert(`${codeToSee} copied`);
  } else if (id === btn5) {
    // alert(code5);
    const codeToSee = code5.innerText;
    console.log(codeToSee);
    navigator.clipboard.writeText(codeToSee);
    // alert(`${codeToSee} copied`);
  } else if (id === btn6) {
    // alert(code6);
    const codeToSee = code6.innerText;
    console.log(codeToSee);
    navigator.clipboard.writeText(codeToSee);
    // alert(`${codeToSee} copied`);
  }
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
      // const ColorsCmykCodes = ColorsData.map((color) => color.cmyk.value);;

      // DISPLAY THE COLORS AND CODES
      switch (codeName) {
        case "hex":
          ColorsHexCodes.map((ele, index) => displayColorData(ele, index));
          break;
        case "rgb":
          ColorsRgbCodes.map((ele, index) => displayColorData(ele, index));
          break;
        case "hsl":
          ColorsHslCodes.map((ele, index) => displayColorData(ele, index));
          break;
        // case "hsv":
        //   ColorsHsvCodes.forEach((ele) => addColorDisplayHsv(ele));
        //   break;
        default:
          ColorsHexCodes.map((ele) => displayColorData(ele));
      }
    });
  resetBtn();
});
