/*
* Import App functions from function.js
*/
import { globally, country, search, scrollToTop, showTopBtn } from "./functions.js";
import apiTesting from './apitesting.json'

/*
* Query Elements & define Array
* */
const loader = document.querySelector(".loader");
const date = document.querySelector(".date");
const input = document.getElementById("search__input");
const categories = [
  "New Confirmed",
  "Total Confirmed",
  "New Deaths",
  "Total Deaths",
  "New Recovered",
  "Total Recovered"
]
let obj = {};
const MODE = 'development'

if (MODE === 'production') {
  fetch('https://api.covid19api.com/summary')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        date.innerHTML = new Date();

        obj = data.Global;
        globally(obj, categories);

        obj = data.Countries;

        country(obj, categories);
        const countries = obj;
        loader.classList.add("hidden");
      });
} else {
  date.innerHTML = new Date();

  obj = apiTesting.Global;
  globally(obj, categories);

  obj = apiTesting.Countries;

  country(obj, categories);
  const countries = obj;
  loader.classList.add("hidden");
}

/*
* Input setup
* Add EL for enter key stroke.
* */
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    search(input, obj);
  }
})


/*
* Search button setup.
* Get element by ID; add EL
* */
const submitBtn = document.querySelector(".search__button");
submitBtn.addEventListener("click", function() {search(input, obj)});

/*
* To top button setup.
* Query button; add EL; add to window EL
*/
const toTopBtn = document.querySelector(".top");
toTopBtn.addEventListener("click", scrollToTop);
window.addEventListener("scroll", function() {showTopBtn(toTopBtn)});
