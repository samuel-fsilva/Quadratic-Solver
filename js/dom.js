const card = document.getElementById("card");
const submitButton = document.getElementById("submit");
const inputs = {
  a: document.getElementById("c1"),
  b: document.getElementById("c2"),
  c: document.getElementById("c3"),
};
const variableInputs = document.querySelectorAll(".variable-input");
const selectElements = card.querySelectorAll("select");
const resultBox = document.getElementById("result-box");
const resultDOMData = document.querySelectorAll(".result-data");
const resultBoxTitle = resultBox.querySelector("h3");
const inputBox = document.getElementById("input");

variableInputs.forEach((varInput) => {
  varInput.addEventListener("focus", () => {
    varInput.select();
  });
});

function unhideResultBox() {
  resultBox.classList.remove("hidden");
}
function formatToLATEX(a) {
  let temp;
  if (Array.isArray(a)) {
    if (a.some((n) => typeof n == "string")) {
      a.forEach((n, i) => {
        if (typeof n == "string") {
          temp = n.split("/");
          a[i] = `\\frac{${temp[0]}}{${temp[1]}}`;
        }
      });
    }
    return a;
  } else if (typeof a == "string") {
    if (a.includes("/")) {
      temp = a.split("/");
      a = `\\frac{${temp[0]}}{${temp[1]}}`;
    }
    if (a.includes("√")) {
      temp = a.split("√");
      let radix = parseInt(temp[1]).toString();
      a = a.replace(
        new RegExp(`\\(√${radix}\\)|√${radix}`, "g"),
        `\\sqrt{${radix}}`,
      );
    }
    console.log(a);
    a = a.replace(/\(|\)/g, "");
    console.log([a.replace("±", "+"), a.replace("±", "-")]);
    return [a.replace("±", "+"), a.replace("±", "-")];
  }
}

function setResultBox(a, d) {
  resultBoxTitle.innerHTML = "";
  let rawCoefficients = Object.values(coefficients);
  for (i in rawCoefficients) {
    rawCoefficients[i] = selectElements[i].value + Math.abs(rawCoefficients[i]);
    if (i == 0) {
      rawCoefficients[i] = hiddenPlus(rawCoefficients[i]);
    }
    if (i != 2) {
      rawCoefficients[i] = numberValidation(rawCoefficients[i]);
    }
  }
  console.log(rawCoefficients);
  let equation = `${rawCoefficients[0] + chosenletter}^{2}${rawCoefficients[1]}${chosenletter}${rawCoefficients[2]}= 0`;
  let latexTitle = document.createElement("latex-js");
  latexTitle.innerText = `$$\\LARGE{${equation}}$$`;
  resultBoxTitle.appendChild(latexTitle);
  for (i in resultDOMData) {
    resultDOMData[i].innerHTML = "";
  }
  let labels = [`${chosenletter}_{1}`, `${chosenletter}_{2}`, "\\Delta"];
  let data = [a, d].flat().forEach(function (value, index) {
    let latexHTML = document.createElement("latex-js");
    latexHTML.innerText = `$$\\Large{${labels[index]}=${value}}$$`;
    resultDOMData[index].appendChild(latexHTML);
  });
}

function scrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
