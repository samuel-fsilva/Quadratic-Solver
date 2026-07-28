function formatMaxDecimals(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
const rangeX = 8;
const rangeY = 15;
const buttonSubmit = document.getElementById("submit");
let inputsValue = {
  a: document.getElementById("c1").value,
  b: document.getElementById("c2").value,
  c: document.getElementById("c3").value,
};

var board = JXG.JSXGraph.initBoard("graph", {
  axis: true,
  defaultAxes: {
    x: {
      strokeColor: "#ffffff",

      ticks: {
        strokeColor: "#888888",

        label: {
          strokeColor: "#ffffff",
        },
      },
    },

    y: {
      strokeColor: "#ffffff",

      ticks: {
        strokeColor: "#888888",

        label: {
          strokeColor: "#ffffff",
        },
      },
    },
  },
  showCopyright: false,
});
console.log(inputsValue);

var f = board.create(
  "functiongraph",
  [(x) => inputsValue.a * x * x + inputsValue.b * x + inputsValue.c * x ** 0],
  {
    strokeColor: "#ffae42",
    strokeWidth: 3,
  },
  { strokeWidth: 3 },
);

var A = board.create("point", [0, 0], {
  name: "Vertex",
  fillColor: "#ffae42",
  strokeColor: "#ffffff",
  label: {
    strokeColor: "#ddd",
  },
});

board.create("grid", [], {
  strokeColor: "#ddd",
  strokeOpacity: 0.3,
});

buttonSubmit.addEventListener("click", () => {
  inputsValue = {
    a: parseInt(selectElements[0].value + document.getElementById("c1").value),
    b: parseInt(selectElements[1].value +document.getElementById("c2").value),
    c: parseInt(selectElements[2].value +document.getElementById("c3").value),
  };

  function vertex () {
    const vX = -inputsValue.b / (2 * inputsValue.a);
    return [vX, inputsValue.a * vX * vX + inputsValue.b * vX + inputsValue.c];
  }; 

  console.log(vertex());
  A.setPositionDirectly(JXG.COORDS_BY_USER, vertex());
  A.setName(
    `Vertex: (${formatMaxDecimals(vertex()[0], 3)}, ${formatMaxDecimals(vertex()[1], 3)})`,
  );

  board.setBoundingBox([
    vertex()[0] - rangeX,
    vertex()[1] + rangeY,
    vertex()[0] + rangeX,
    vertex()[1] - rangeY,
  ]);

  board.update();
});
