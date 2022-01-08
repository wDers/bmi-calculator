function displayBmiData() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value / 100;
  let bmi = weight / (height * height);

  let categories = [
    {
      class: "underweight",
      bmi: ["20.5 alatt", "20 alatt"],
      category: "Sovány",
    },
    { class: "normal", bmi: ["20.5 - 26.5", "20 - 25"], category: "Normál" },
    {
      class: "overweight",
      bmi: ["26.5 - 31.9", "25 - 30"],
      category: "Túlsúly",
    },
    {
      class: "obesity1",
      bmi: ["31.9 - 36.9", "30 - 35"],
      category: "I. fokú elhízás",
    },
    {
      class: "obesity2",
      bmi: ["36.9 - 41.9", "35 - 40"],
      category: "II. fokú elhízás",
    },
    {
      class: "obesity3",
      bmi: ["41.9 felett", "40 felett"],
      category: "III. fokú elhízás",
    },
  ];

  const iterator = getSelectedRadioValues("sex").values();

  for (const value of iterator) {
    if (value === "male") {
      getBmiData("male");
    } else {
      getBmiData("female");
    }
  }

  function getSelectedRadioValues(name) {
    const radios = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    radios.forEach((radio) => {
      values.push(radio.value);
    });
    return values;
  }

  function getBmiData(sex) {
    displayBmi();
    displayCategories(sex);
    calculateBmiRange(sex);
    calculateIdealWeight(sex);
  }

  function displayBmi() {
    document.getElementById("heading").innerHTML = "Az Ön testtömeg indexe";

    let bmiValue = document.getElementById("bmi");
    let inputHeight = document.getElementById("height");
    let inputWeight = document.getElementById("weight");

    inputHeight.value > 0 && inputWeight.value > 0
      ? (bmiValue.innerHTML = bmi.toFixed(2))
      : (bmiValue.innerHTML = "Kérem töltse ki mindkét mezőt");
  }

  function displayCategories(sex) {
    let html = "<table>";

    html += "<thead>";
    html += "<tr>";
    html += "<th>BMI</th>";
    html += "<th>Osztály</th>";
    html += "</tr>";
    html += "</thead>";

    for (let i = 0; i < categories.length; i++) {
      html += "<tr>";
      if (sex === "male") {
        html += `<td>${categories[i].bmi[0]}</td>`;
      } else html += `<td>${categories[i].bmi[1]}</td>`;
      html += `<td>${categories[i].category}</td>`;
      html += "</tr>";
    }

    html += "</table>";
    document.getElementById("bmi-table").innerHTML = html;
  }

  // dc = Display Category
  // wclass = Weight Class

  function calculateBmiRange(sex) {
    if (sex === "male") {
      return bmi < 20.5
        ? dc("underweight")
        : bmi >= 20.5 && bmi < 26.5
        ? dc("normal")
        : bmi >= 26.5 && bmi < 31.9
        ? dc("overweight")
        : bmi >= 31.9 && bmi < 36.9
        ? dc("obesity1")
        : bmi >= 36.9 && bmi < 41.9
        ? dc("obesity2")
        : bmi > 41.9
        ? dc("obesity3")
        : null;
    } else if (sex === "female") {
      return bmi < 20
        ? dc("underweight")
        : bmi >= 20 && bmi <= 25
        ? dc("normal")
        : bmi >= 25 && bmi < 30
        ? dc("overweight")
        : bmi >= 30 && bmi < 35
        ? dc("obesity1")
        : bmi >= 35 && bmi < 40
        ? dc("obesity2")
        : bmi >= 40
        ? dc("obesity3")
        : null;
    } else null;

    function dc(wclass) {
      const message = document.getElementById("message");
      function getCategory() {
        let obj = categories.find((o) => o.class === wclass);
        return obj.category;
      }
      return (message.innerHTML = getCategory());
    }
  }

  function calculateIdealWeight(sex) {
    const ibw = document.getElementById("ibw");

    sex === "male" && bmi > 0
      ? (ibw.innerHTML = `Az Ön ideális testtömege ${Math.round(
          50 + 0.91 * (height * 100 - 152.4)
        )} kg`)
      : sex === "female" && bmi > 0
      ? (ibw.innerHTML = `Az Ön ideális testtömege ${Math.round(
          45.5 + 0.91 * (height * 100 - 152.4)
        )} kg`)
      : (ibw.innerHTML = "Az ön ideális testtömege nem adható meg");
  }
}
