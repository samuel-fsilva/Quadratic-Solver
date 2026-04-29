let points = [];

function toFloatFix(a) {
  /*
  if (Math.abs(a - Math.round(a)) <= 10e-12) {
    return Math.round(a);
  } else {
    return a;
  }*/
  let value = a.toString();
  tmp = value.split(".");
  if (tmp[1] != undefined && tmp[1].includes("000")) {
    return parseFloat(value.split("000")[0]);
  } else if (tmp[1] != undefined && tmp[1].includes("999")) {
    return parseFloat(
      (
        parseFloat(value.split("999")[0]) +
        10 ** (-value.split("999")[0].length + 2)
      ).toFixed(value.split("999")[0].length - 2),
    );
  } else {
    return a;
  }
}

function setGraph(a, b, c) {
  points = [];
  const graphVertix = -b / (2 * a);
  const pointsAmount = 5;
  const graphRate = 0.1;
  console.log(quadraticSolver(a, b, c));
  for (
    let i = graphVertix - pointsAmount;
    i <= graphVertix + pointsAmount;
    i += graphRate
  ) {
    points.push({ x: toFloatFix(i), y: toFloatFix(a * i ** 2 + b * i + c) });
  }

  myChart.data = {
    datasets: [
      {
        label: `y = ${a}x² - ${b}x + ${c}`,
        data: points,
        showLine: true,
        tension: 0.3,
        borderColor: "blue",
      },
    ],
  };
  console.log("graph's vertex: " + graphVertix);
  console.log(points);

  myChart.options.scales.y.max = Math.max(
    0,
    points[Math.floor(points.length * 0.8)].y,
  );
  myChart.options.scales.y.min = Math.min(
    0,
    points[Math.ceil(points.length * 0.2)].y,
  );

  myChart.update();
}
let myChart = new Chart(chart, {
  type: "line",
  data: {
    datasets: [
      {
        label: "y = ax² - bx + c",
        data: points,
        showLine: true,
        tension: 0.3,
        borderColor: "blue",
      },
    ],
  },
  options: {
    scales: {
      x: { type: "linear", position: "bottom" },
      y: {
        type: "linear",
        grid: {
          color: (context) => {
            if (context.tick.value === 0) {
              return "#000";
            }
            return "#ccc";
          },
          lineWidth: (context) => {
            return context.tick.value === 0 ? 2 : 1;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
  },
});
