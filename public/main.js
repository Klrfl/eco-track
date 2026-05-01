const form = document.getElementById("calculator-form");

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

  const result = await response.json();
  console.log(result);
});
