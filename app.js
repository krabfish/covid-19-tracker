const loader = document.querySelector(".loader");
const date = document.querySelector(".date");
const globe = document.querySelector(".global__tracking");
const local = document.querySelector(".country__tracking");
const input = document.getElementById("search__input");
const categories = [
  "New Confirmed",
  "Total Confirmed",
  "New Deaths",
  "Total Deaths",
  "New Recovered",
  "Total Recovered"
]
let countries = {};

// TODO: Dev
fetch('testing.json')
// fetch('https://api.covid19api.com/summary')
.then((response) => {
  return response.json();
})
.then((data) => {
  // console.log(data);
  date.innerHTML = new Date();

  obj = data.Global;
  globally(obj);

  obj = data.Countries;

  country(obj);
  countries = obj;
  loader.classList.add("hidden");
});

input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    search();
  }
})

const submitBtn = document.getElementById("search__button");
submitBtn.addEventListener("click", search);

const toTopBtn = document.querySelector(".top");
toTopBtn.addEventListener("click", scrollToTop);

window.addEventListener("scroll", showTopBtn);

function globally(obj) {
  let index = 0;
  for (const item in obj) {
    const li = document.createElement("li");
    li.innerText = categories[index] + ': ' + obj[item];
    globe.appendChild(li);
    index++;
  }
}

function country(obj) {

  obj.forEach(element => {
    const li = document.createElement("li");
    li.classList.add("country__name");
    li.id = element.Country.toLowerCase();
    li.innerText = element.Country;
    local.appendChild(li);

    const list = document.createElement("ul");
    list.classList.add("country__list")
    const arr = ["Country", "CountryCode", "Slug" ,"Date"];

    let index = 0;
    for (const item in element) {
      if (!arr.includes(item)) {
        const listItem = document.createElement("li");
        listItem.innerText = categories[index] + ': ' + element[item];
        listItem.classList.add("country__category");
        list.appendChild(listItem);
        index++;
      }
    }
    local.appendChild(list);
  });
}

function search() {
  const options = {
    isCaseSensitive: false,
    findAllMatches: false,
    includeMatches: false,
    includeScore: false,
    useExtendedSearch: false,
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    keys: [
      "Country",
      "CountryCode"
    ]
  };

  const fuse = new Fuse(countries, options);

// Change the pattern
  const pattern = "Austria";

  const result = fuse.search(input.value.toLowerCase());

  const ref = document.getElementById(`${result[0].item.Country.toLowerCase()}`);
  input.value = ""
  ref.scrollIntoView();
}

function scrollToTop() {
  window.scrollTo({ top: 0});
}

function showTopBtn() {
  if (window.scrollY > 1200) {
    toTopBtn.classList.remove('hidden');
  } else {
    toTopBtn.classList.add('hidden');
  }
}