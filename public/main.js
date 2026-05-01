const form = document.getElementById("calculator-form");
const outputMessage = document.getElementById("output-field");
const outputTotal = document.getElementById("output-total");
const barInner = document.getElementById("bar-inner");

if (!form) {
  console.warn("warning: no form found");
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);

  const response = await fetch("/calculate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(Object.fromEntries(data.entries())),
  });

  outputMessage.innerText = "Awaiting data..";
  const result = await response.json();
  console.log(result);

  if (!result.success) {
    outputMessage.innerText = `gagal: ${result.message}`;
  }

  const { breakdown, emisi_total } = result;
  outputMessage.innerText = `Emisi total mu ${emisi_total}, dengan rincian sebagai berikut: kendaraan: ${breakdown.kendaraan}, ac: ${breakdown.ac}, laptop: ${breakdown.laptop}`;

  const barLength = emisi_total / 15; // x
  barInner.style.scale = `${barLength} 1`;

  outputTotal.innerText = `${emisi_total} KG C02e`;
});
