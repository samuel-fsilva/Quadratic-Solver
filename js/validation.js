let chosenletter = "x";
variableInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    chosenletter = e.target.value;
    if (justLetters(chosenletter) && chosenletter.length == 1) {
      variableInputs.forEach((inp) => {
        inp.value = chosenletter;
        inp.blur();
      });
    } else {
      variableInputs.forEach((inp) => {
        inp.value = "";
        inp.style.width = "1ch";
        inp.blur();
        chosenletter = "x";
      });
    }
  });
});
function justLetters(str) {
  return /^[A-Za-z]+$/.test(str);
}

function numberValidation(n) {
  if (Math.abs(n) == 1) {
    return n.replace("1", "");
  } else {
    return n;
  }
}

function hiddenPlus(s) {
  if (s.includes("+")) {
    return s.replace("+", "");
  } else {
    return s;
  }
}
