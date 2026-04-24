const card = document.getElementById("card");
const submitButton = document.getElementById("submit");
const inputs = {
  a: document.getElementById("c1"),
  b: document.getElementById("c2"),
  c: document.getElementById("c3"),
};
const resultBox = document.getElementById("result-box");
const variableInputs = document.querySelectorAll(".variable-input");
const selectElements = card.querySelectorAll("select");
const resultBoxPosition = parseInt(window.getComputedStyle(resultBox).left);
const chart = document.getElementById("chart")

submitButton.addEventListener("mouseenter", () => {
  submitButton.children[0].style.display = "flex";
});
submitButton.addEventListener("mouseleave", () => {
  submitButton.children[0].style.display = "none";
});
submitButton.addEventListener("mouseup", (event) => {
  submitButton.children[0].children[0].setAttribute("fill", "#000000");
});
submitButton.addEventListener("mousedown", (event) => {
  submitButton.children[0].children[0].setAttribute("fill", "#fff");
});

variableInputs.forEach((varInput) => {
  varInput.addEventListener("focus", () => {
    varInput.select();
  });
});
function formatToLATEX(a) {
  let temp;
  if (Array.isArray(a)) {
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
    a = a.replace(/\(|\)/g, "");
    return [a.replace("±", "+"), a.replace("±", "-")];
  }
}

function setSelectTransparent() {
  if (selectElements[0].value == "+") {
    selectElements[0].style.color = "rgba(0, 0, 0, 0.2)";
  } else {
    selectElements[0].style.color = "rgba(0, 0, 0, 1)";
  }
}
Object.values(inputs).forEach((input) => {
  input.addEventListener("change", () => {
    if (input.value == 1 && input.id != "c3") {
      input.style.color = "rgba(0, 0, 0, 0.2)";
    } else {
      selectElements[0].style.color = "rgba(0, 0, 0, 1)";
    }
  });
});
selectElements.forEach((select) => {
  select.addEventListener("change", () => {
    setSelectTransparent();
  });
});

function setResultBox(a, d) {
  movingAnimation(resultBox, "left", 8, resultBoxPosition);
  let resultBoxChildren = {
    equation: document.createElement("div"),
    result: document.createElement("div"),
    delta: document.createElement("div"),
  };
  resultBox.innerHTML = "";
  resultBoxChildren.equation.innerHTML = `<latex-js style="color: black;">$$${hiddenPlus(selectElements[0].value)}${numberValidation(Math.abs(coefficients.a))}\\text{${chosenletter}}^{2}${selectElements[1].value}${numberValidation(Math.abs(coefficients.b))}\\text{${chosenletter}}${selectElements[2].value}${Math.abs(coefficients.c)} = 0$$</latex-js>`;
  resultBoxChildren.equation.style.gridColumn = "span 2";
  resultBox.append(resultBoxChildren.equation);
  resultBoxChildren.result.innerHTML = `<div><latex-js style="color: black; scale: 1.4;">$$${chosenletter}_{1}=${a[0]}$$</latex-js></div><div><latex-js style="color: black; scale: 1.4;">$$${chosenletter}_{2}=${a[1]}$$</latex-js></div>`;
  resultBoxChildren.result.style.cssText =
    "display: grid; grid-template-rows: 1fr 1fr; grid-row: span 2; height: 60%;";
  resultBoxChildren.delta.innerHTML = `<div><latex-js style="color: black; scale: 1.4;">$$\\Delta =${d}$$</latex-js></div>`;
    resultBox.append(resultBoxChildren.result);
    resultBox.append(resultBoxChildren.delta);
}
