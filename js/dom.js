const card = document.getElementById("card");
const submitButton = document.getElementById("submit");
const inputs = {
  a: document.getElementById("c1"),
  b: document.getElementById("c2"),
  c: document.getElementById("c3"),
};
const inputsArray = Object.values(inputs);
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
      rawCoefficients[i] = isThatNumberOne(rawCoefficients[i]);
    }
  }
  console.log(rawCoefficients);
  let equation = `\\text{Equation: } ${rawCoefficients[0]}\\text{${chosenletter}}^{2}${rawCoefficients[1]}\\text{${chosenletter}}${rawCoefficients[2]}= 0`;
  let latexTitle = document.createElement("latex-js");
  latexTitle.innerText = `$$\\LARGE{${equation}}$$`;
  resultBoxTitle.appendChild(latexTitle);
  for (i in resultDOMData) {
    resultDOMData[i].innerHTML = "";
  }
  let labels = [
    `\\text{${chosenletter}}_{1}`,
    `\\text{${chosenletter}}_{2}`,
    "\\Delta",
  ];
  let data = [a, d].flat().forEach(function (value, index) {
    let latexHTML = document.createElement("latex-js");
    if (index == 1 && a[0] == a[1]) {
      latexHTML.classList.add("hidden");
    }
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
inputsArray[0].addEventListener("mouseenter", (e) => {
  selectElements[0].classList.remove("invisible");
});
inputsArray[0].addEventListener("mouseleave", (e) => {
  if (selectElements[0].value == "+") {
    selectElements[0].classList.add("invisible");
  }
});
selectElements[0].addEventListener("mouseenter", (e) => {
  selectElements[0].classList.remove("invisible");
});

selectElements[0].addEventListener("mouseleave", (e) => {
  if (selectElements[0].value == "+") {
    selectElements[0].classList.add("invisible");
  }
});

function hideInput(input) {
  setTimeout(() => {
    if (
      input.value == 1 &&
      !input.matches(":hover") &&
      !input.matches(":focus")
    ) {
      input.classList.add("hidden");
    }
  }, 2000);
}
inputsArray.toSpliced(-1, 1).forEach(function (input) {
  input.addEventListener("input", () => {
    hideInput(input);
  });
  input.addEventListener("mouseleave", () => {
    hideInput(input);
  });
});

[...variableInputs].forEach(function (input, index) {
  input.addEventListener("mouseenter", () => {
    if (inputsArray[index].classList.contains("hidden")) {
      inputsArray[index].classList.remove("hidden");
    }
    input.addEventListener("mouseleave", () => {
      hideInput(inputsArray[index]);
    });
  });
});
