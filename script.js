const countriesContainer = document.querySelector(".countries-container");
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card");
      const countryName = country.name.common;

      const countryTitle = document.createElement("h3");
      countryTitle.classList.add("card-title");
      countryTitle.textContent = countryName;
      countryCard.appendChild(countryTitle);

      const flagImage = document.createElement("img");
      flagImage.src = country.flags.svg;
      flagImage.alt = "flag";
      countryCard.appendChild(flagImage);

      const countryInfo = document.createElement("div");
      countryInfo.classList.add("card-text");
      countryInfo.innerHTML = `
        <p><b>Capital: </b>${country.capital?.[0]}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Country Code: </b>${country.cca3}</p>
      `;
      countryCard.appendChild(countryInfo);

      const weatherButton = document.createElement("button");
      weatherButton.type = "button";
      weatherButton.classList.add("btn", "btn-primary");
      weatherButton.textContent = "Click for weather";
      countryCard.appendChild(weatherButton);

      const temperatureDisplay = document.createElement("p");
      temperatureDisplay.classList.add("temperature-display");
      countryCard.appendChild(temperatureDisplay);

      countriesContainer.appendChild(countryCard);

      weatherButton.addEventListener("click", () => getWeather(countryName, temperatureDisplay));
    });
  });

function getWeather(countryName, temperatureDisplay) {
  fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data[0].latlng[0];
      const longitude = data[0].latlng[1];
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ae0ddc20aca0de9b50d6e35eac27a537`
      )
        .then((response) => response.json())
        .then((weatherData) => {
          const temperature = weatherData.main.temp;
          temperatureDisplay.textContent = `Temperature: ${temperature}°C`;
        })
        .catch((error) => {
          console.log("Error retrieving weather data:", error);
        });
    })
    .catch((error) => {
      console.log("Error retrieving country data:", error);
    });
}
