export function globally(obj, categories) {
  const globe = document.querySelector(".global__tracking");
  let index = 0;
  for (const item in obj) {
    const li = document.createElement("li");
    li.innerText = categories[index] + ': ' + obj[item];
    globe.appendChild(li);
    index++;
  }
}

export function country(obj, categories) {
  const local = document.querySelector(".country__tracking");
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
      if (!arr.includes(item) && index < 6) {
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

export function search(element ,countries) {
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

  const result = fuse.search(element.value.toLowerCase());

  const ref = document.getElementById(`${result[0].item.Country.toLowerCase()}`);
  element.value = ""
  ref.scrollIntoView();
}

export function scrollToTop() {
  window.scrollTo({ top: 0});
}

export function showTopBtn(element) {
  if (window.scrollY > 1200) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}
