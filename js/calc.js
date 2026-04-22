function quadraticSolver(a, b, c, type, wantDelta) {
  let isEveryoneNumber = [a, b, c].every(
    (item) => typeof item === "number" && !isNaN(item),
  );
  if (isEveryoneNumber && a != 0) {
    const delta = b ** 2 - 4 * a * c;

    if (type === undefined || type == "raw") {
      const results = [
        (-b + Math.sqrt(delta)) / (2 * a),
        (-b - Math.sqrt(delta)) / (2 * a),
      ];
      if (wantDelta) {
        return { results: results, delta: delta };
      } else {
        return results;
      }
    } else if (type == "expression") {
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
      throw new Error("wrong type specification");
    }
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
  toFrac: (a)=>{
    
  }
};
