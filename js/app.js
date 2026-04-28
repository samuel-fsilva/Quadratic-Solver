const coefficients = { a: null, b: null, c: null };
window.addEventListener("DOMContentLoaded", () => {
  setSelectTransparent();
  inputs.a.focus();
});

submitButton.addEventListener("click", (e) => {
  coefficients.a = parseInt(selectElements[0].value + inputs.a.value);
  coefficients.b = parseInt(selectElements[1].value + inputs.b.value);
  coefficients.c = parseInt(selectElements[2].value + inputs.c.value);
  let result = quadraticSolver(
    coefficients.a,
    coefficients.b,
    coefficients.c,
    true,
  );
  console.log(result.result)
  let HTMLresults = formatToLATEX(result.result);

  setResultBox(HTMLresults, result.delta);
});
