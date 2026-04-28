function quadraticSolver(a, b, c, wantDelta) {
  let isEveryoneNumber = [a, b, c].every(
    (item) => typeof item === "number" && !isNaN(item),
  );
  if (isEveryoneNumber && a != 0) {
    const delta = b ** 2 - 4 * a * c;
    let EquationParts = {
      eq: [-b, myMath.simplifiedSQRT(delta).result, 2 * a],
      eqCoef: [-b, myMath.simplifiedSQRT(delta).result, 2 * a].map((item) =>
        isNaN(parseInt(item)) ? 1 : parseInt(item),
      ),
      isDeltaPerfect: ![-b, myMath.simplifiedSQRT(delta).result, 2 * a][1]
        .toString()
        .includes("√"),
      imaginary: delta < 0,
    };
    EquationParts.eqCoef = EquationParts.eqCoef.map(
      (item) => item / myMath.mdc(EquationParts.eqCoef),
    );
    for (let i = 0; i < 4; i += 2) {
      EquationParts.eq[i] = EquationParts.eqCoef[i];
    }
    let verif =
      Number(EquationParts.isDeltaPerfect).toString() +
      Number(EquationParts.imaginary).toString();
    let tmp;
    switch (verif) {
      case "00":
        tmp = EquationParts.eq[1].split("√");
        if (EquationParts.eqCoef[1] != 1) {
          tmp[0] = EquationParts.eqCoef[1];
        } else {
          tmp[0] = "";
        }
        EquationParts.eq[1] = tmp.join("√");
        break;
      case "01":
        tmp = EquationParts.eq[1].split("i");
        if (EquationParts.eqCoef[1] != 1) {
          tmp[0] = EquationParts.eqCoef[1];
        } else {
          tmp[0] = "";
        }
        EquationParts.eq[1] = `(${tmp.join("")})i`;
        break;
      case "10":
        EquationParts.eq[1] = EquationParts.eqCoef[1];
        break;
      case "11":
        EquationParts.eq[1] = `${EquationParts.eqCoef[1]}i`;
        break;
      default:
        break;
    }
    let Equation = {
      numerator: `${EquationParts.eq[0] != 0 ? EquationParts.eq[0] : ""} ± ${EquationParts.eq[1]}`,
      denominator: EquationParts.eq[2],
      values: [
        (EquationParts.eq[0] + EquationParts.eq[1]) / EquationParts.eq[2],
        (EquationParts.eq[0] - EquationParts.eq[1]) / EquationParts.eq[2],
      ],
    };
    let response = {
      result: "",
    };
    if (verif == "10") {
      console.log(10)
      for (let i = 0; i < Equation.values.length; i++) {
        console.log(Number.isInteger(Equation.values[i]))
        Equation.values[i] = Number.isInteger(Equation.values[i])
          ? Equation.values[i]
          : myMath.toFrac(Equation.values[i]);

          if (typeof Equation.values[i] == "object") {
          Equation.values[i] = `${Equation.values[i].num}/${Equation.values[i].den}`;
        }
      }
      console.log(Equation.values);
      response.result = Equation.values;
    } else {
      if (Equation.denominator == 1) {
        response.result = Equation.numerator;
      } else {
        response.result = `(${Equation.numerator}) / ${Equation.denominator}`;
      }
    }
    if (wantDelta) {
      response.delta = delta;
    }
    return response;
  } else {
    throw new Error("invalid numbers parameters");
  }
}

const myMath = {
  mdc: (a) => {
    a = a.map((value) => (Number.isNaN(value) ? 1 : value));
    if (typeof a == "object" && a.every((item) => !isNaN(item))) {
      a = a.map((number) => Math.abs(number));
      a.sort((a, b) => b - a);
      for (let i = Math.floor(a[0]); i > 0; i--) {
        if (a.every((number) => number % i == 0)) return i;
      }
    } else {
      throw new Error();
    }
  },
  simplifiedSQRT: (a) => {
    let imgNumber;
    if (a >= 0) {
      imgNumber = "";
    } else if (a < 0) {
      imgNumber = "i";
      a *= -1;
    }
    let response = {
      result: undefined,
      imaginary: imgNumber == "i",
    };
    if (Number.isInteger(Math.sqrt(a))) {
      if (a == 1 && imgNumber == "i") {
        response.result = imgNumber;
      } else {
        response.result = `${Math.sqrt(a)}${imgNumber}`;
      }
    } else {
      if (Math.abs(a) > 7) {
        for (let i = Math.floor(Math.sqrt(Math.floor(a / 2))); i > 1; i--) {
          if (a % i ** 2 == 0) {
            response.result = `${i}${imgNumber}√${a / i ** 2}`;
            break;
          } else {
            if (a == 1) {
              response.result = `1`;
            } else {
              response.result = `${imgNumber}√${a}`;
            }
          }
        }
      } else {
        response.result = `${imgNumber}√${a}`;
      }
    }
    return response;
  },
  toFrac: (a, methodf) => {
    let tmp = 0;
    if (typeof a == "number") {
      if (methodf == "brute") {
        let precision = 1e-5;
        for (let i = 1; i <= 10000; i++) {
          tmp = a * i;
          if (Math.abs(Math.ceil(tmp) - tmp) <= precision) {
            return `${Math.round(a * i)}/${i}`;
          }
        }
      } else if (methodf == "compost" || methodf == undefined) {
        function continuedFraction(x, maxIterations = 20, tolerance = 1e-12) {
          const cf = [];

          let value = a;

          for (let i = 0; i < maxIterations; i++) {
            const a = Math.floor(value);
            cf.push(a);

            const frac = value - a;

            if (Math.abs(frac) < tolerance) break;

            value = 1 / frac;
          }

          return cf;
        }
        function convergents(cf) {
          const result = [];

          let h1 = 1,
            h0 = 0;
          let k1 = 0,
            k0 = 1;

          for (let i = 0; i < cf.length; i++) {
            const a = cf[i];

            const h = a * h1 + h0;
            const k = a * k1 + k0;

            result.push({ num: h, den: k });

            h0 = h1;
            h1 = h;
            k0 = k1;
            k1 = k;
          }

          return result;
        }
        function approximateFraction(x, maxDen = 10000) {
          const cf = continuedFraction(x);
          const convs = convergents(cf);

          let best = convs[0];

          for (const frac of convs) {
            if (frac.den > maxDen) break;
            best = frac;
          }

          return best;
        }
        return approximateFraction(a);
      }
    } else {
      throw new Error("");
    }
  },
};
