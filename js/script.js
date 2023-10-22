const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayCountries(data))
}

loadCountryAPI()

const displayAllCountries = countries => {
    // console.log(countries);
    const countriesHTML = countries.map(country => getCountry(country))
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
}

const getCountry = (country) => {
    // console.log(country)
    return `
        <div class="country-div">
            <img src="${country.flags.png}">
            <h2>${country.name.common}</h2>
            <h4>Population: ${country.name.common}</h4>
            <h4>Region: ${country.name.common}</h4>
            <h4>Capital: ${country.name.common}</h4>
        </div>
    `
}

document.getElementById('regionMenu').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default behavior of anchor links
    const target = event.target;
    if (target.tagName === 'A') {
        const selectedRegion = target.getAttribute('data-region');
        populateCountries(selectedRegion);
    }
});

const asiaCountriesDiv = document.getElementById('country-div');

// const populateCountries = (region) => {
//     fetch(`https://restcountries.com/v3.1/region/${region}`)
//         .then(res => res.json())
//         .then(data => displayCountries(data));
// }

// const displayCountries = (countries) => {
//     asiaCountriesDiv.innerHTML;
//     countries.forEach(country => {
//         asiaCountriesDiv.innerHTML += getCountryCard(country);
//     });
// }

const populateCountries = (region) => {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(res => res.json())
        .then(data => displayCountries(data));
}

const displayCountries = (countries) => {
    // Clear the previous content before adding new country cards
    asiaCountriesDiv.innerHTML = '';

    countries.forEach(country => {
        asiaCountriesDiv.innerHTML += getCountryCard(country);
    });
}

const getCountryCard = (country) => {
    return `
        <div class="country-div">
            <img src="${country.flags.png}">
            <h2>${country.name.common}</h2>
            <h4>Population: ${country.population}</h4>
            <h4>Region: ${country.region}</h4>
            <h4>Capital: ${country.capital}</h4>
        </div>
    `;
}

const searchBox = document.getElementById('searchBox');

searchBox.addEventListener('input', () => {
    const searchText = searchBox.value.trim().toLowerCase();
    const filteredCountries = filterCountriesBySearch(countries, searchText);
    displayAllCountries(filteredCountries);
});

function filterCountriesBySearch(countries, searchText) {
    return countries.filter(country => {
        return country.name.common.toLowerCase().startsWith(searchText);
    });
}
