const api_key =
  "live_9qsDo06Vg5Pxaa604wIEVHs9aftnsHprdefdLvlwawfjpeXQJQDVTfIKRdW6P7k8";

function catGenerator() {
  fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=true`, {
    headers: {
      "x-api-key": api_key,
    },
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("Response JSON", resJson);

      const imageData = resJson[0];
      const breed = imageData.breeds[0];

      // RESET //
      const photoBox = document.getElementById("photoBox");
      const factBox = document.getElementById("factBox");
      photoBox.innerHTML = "";
      factBox.innerHTML = "";

      const image = document.createElement("img");
      image.src = imageData.url;
      image.alt = `A cat of breed ${breed.name}`;
      image.style.maxWidth = "100%";
      photoBox.appendChild(image);

      // DYNAMIC STYLING //
      photoBox.style.border = "3px solid #FFD700";
      photoBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      photoBox.style.background = "linear-gradient(135deg, #fffaf0, #fff5e1)";

      const breedInfo = document.createElement("h3");
      breedInfo.innerHTML = `
        <strong>Breed:</strong> ${breed.name}<br>
        `;
      factBox.appendChild(breedInfo);

      // GENERATE NEW BUTTON FOR MORE DETAILS //
      const detailsButton = document.createElement("button");
      detailsButton.innerText = "More Details";
      detailsButton.onclick = () => {
        window.location.href = `breed.html?breedId=${breed.id}`;
      };
      factBox.appendChild(detailsButton);
    })
    .catch((err) => console.error("Error, Check JS File", err));
}

document.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  catGenerator();
};
