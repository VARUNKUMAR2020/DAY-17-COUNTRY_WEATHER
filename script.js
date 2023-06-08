const countriesContainer = document.querySelector(".countries-container");
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      // console.log(country);
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `/country.html?name=${country.name.common}`;
      countryCard.innerHTML = `
            <h3 class="card-title">${country.name.common}</h3>
            <img src="${country.flags.svg}" alt="flag" />
            <div class="card-text">
            <p><b>Capital: </b>${country.capital?.[0]}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Country Code: </b>${country.cca3}</p>
            <button onclick="weather()"type="button" class="btn btn-primary">Click for weather</button>
             </div>`;
      countriesContainer.append(countryCard);
    });
  });
