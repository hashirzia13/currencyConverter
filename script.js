const baseURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const icon = document.querySelector("i");

for (let select of dropdown) {
  for (currCode in countryList) {
    newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (targetElement) => {
  let currCode = targetElement.value;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = targetElement.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
  let fromCurr = document.querySelector(".from select").value;
  let toCurr = document.querySelector(".to select").value;
  evt.preventDefault();
  let amount = document.querySelector("input");
  let amtVal = amount.value;
  if (amtVal < 1 || amtVal === "") {
    amount.value = 1;
  }

  const URL = `${baseURL}/${fromCurr.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
  let finalamt = rate * amount.value;
  // let result = Math.floor(finalamt);
  console.log(finalamt);
  msg.innerText = `${amount.value} ${fromCurr} = ${finalamt.toFixed(
    4
  )} ${toCurr}`;
});

icon.addEventListener("click", () => {
  let selectedFromCode = document.getElementsByName("from")[0];
  let selectedToCode = document.getElementsByName("to")[0];

  [selectedFromCode.value, selectedToCode.value] = [
    selectedToCode.value,
    selectedFromCode.value,
  ];

  let img1 = selectedFromCode.parentElement.querySelector("img");
  let img2 = selectedToCode.parentElement.querySelector("img");

  [img1.src, img2.src] = [img2.src, img1.src];
});
