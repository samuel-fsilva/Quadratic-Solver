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
  for (let i = -10; i <= 10; i += 1) {
    points.push({ x: toFloatFix(i), y: toFloatFix(a * i ** 2 + b * i + c) });
  }

  ((myChart.data = {
    datasets: [
      {
        label: `y = ${a}x² - ${b}x + ${c}`,
        data: points,
        showLine: true,
        tension: 0.3,
        borderColor: "blue",
      },
    ],
  }),
    console.log(points));
  myChart.options.scales.y.max = a > 0 ? points[20].y : -b / a;

  myChart.update();
  console.log(myChart.data.datasets[0]);
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
      y: { type: "linear" },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});
