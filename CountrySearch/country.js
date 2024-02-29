let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");
let searchInputvalue = "";
let countryList = [];
//condition
function createAndAppend(country) {
    let cardContainerEl = document.createElement("div");
    cardContainerEl.classList.add("d-flex", "flex-row", "col-11", "col-md-5", "mr-auto", "ml-auto", "country-card");
    resultCountriesEl.appendChild(cardContainerEl);
    //HTMLImageElement
    let ImgEl = document.createElement("img");
    ImgEl.classList.add("country-flag", "mt-auto", "mb-auto");
    ImgEl.src = country.flag;
    cardContainerEl.appendChild(ImgEl);

    //text div
    let textCardEl = document.createElement("div");
    textCardEl.classList.add("d-flex", "flex-column", "ml-3");
    cardContainerEl.appendChild(textCardEl);
    // HTMLParagraphElement name
    let nameEl = document.createElement("p");
    nameEl.classList.add("country-name");
    nameEl.textContent = country.name;
    textCardEl.appendChild(nameEl);

    let populationEl = document.createElement("p");
    populationEl.textContent = country.population;
    populationEl.classList.add("country-population");
    textCardEl.appendChild(populationEl);
}

function displaySearchinfo() {
    resultCountriesEl.textContent = "";
    for (let country of countryList) {
        let countryName = country.name;
        if (countryName.includes(searchInputvalue)) {//this .includes  method searche objects  
            createAndAppend(country);
        }
    }
}

function getcountriesdata() {
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/countries-data";
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.add("d-none");
            console.log(jsonData);
            countryList = jsonData;
            displaySearchinfo();
        });
}

function onchangesearchInput(event) {
    searchInputvalue = event.target.value;
    displaySearchinfo();
}
getcountriesdata();
searchInputEl.addEventListener("keyup",onchangesearchInput);