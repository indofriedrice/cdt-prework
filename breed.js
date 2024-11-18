let api_key = "";

async function getApiKey() {
  try {
    const response = await fetch("http://localhost:3000/get-api-key");
    const data = await response.json();
    api_key = data.api_key;
  } catch (error) {
    console.error("Error fetching API key:", error.message);
  }
}

async function fetchBreedDetails() {
  try {
    const params = new URLSearchParams(window.location.search);
    const breedId = params.get("breedId");

    console.log("Breed ID:", breedId);

    const res = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`,
      {
        headers: {
          "x-api-key": api_key,
        },
      }
    );

    const data = await res.json();

    if (!data.length) {
      throw new Error("No Data Found.");
    }

    console.log("Response:", data);

    const imageData = data[0];
    const breed = imageData.breeds[0];

    const factBox = document.getElementById("factBox");

    const breedInfo = document.createElement("p");
    breedInfo.innerHTML = `
      <strong>Breed:</strong> ${breed.name}<br>
      <strong>Origin:</strong> ${breed.origin}<br>
      <strong>Temperament:</strong> ${breed.temperament}<br>
      <strong>Description:</strong> ${breed.description}<br>
      <strong>Life Span:</strong> ${breed.life_span} years
    `;
    factBox.appendChild(breedInfo);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

(async () => {
  try {
    await getApiKey();
    fetchBreedDetails();
  } catch (error) {
    console.error("Revise The Function Calls!", error.message);
  }
})();
