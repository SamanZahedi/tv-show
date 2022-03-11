//You can edit ALL of the code here
const searchBox = document.getElementById("search");
const episodesDropdown = document.getElementById("episodelist");
const showsDropdown = document.getElementById("allshows");
const displayCountEl = document.getElementById("result-count");
let allEpisodes;
function setup() {
  document.documentElement.scrollTop = 0;
  episodesDropdown.innerText = "";
  showsDropdown.innerText = "";
  searchBox.value = "";
  removeDisplayCount();
  allShows = getAllShows();
  const sortedAllShows = allShows.sort((a, b) => {
    return a.name < b.name ? -1 : a.name < b.name ? 1 : 0;
  });
  createShowsDropdownOptions(sortedAllShows);
  populateCards(sortedAllShows, "show");
}

// I need to get my data from API using after choosing shows which gives me show IDs
// So I'll use my next then to get data once "change" is done

function getEpisodes(showId) {
  const endpoint = `https://api.tvmaze.com/shows/${showId}/episodes`;
  return fetch(endpoint).then((response) => response.json());
}

searchBox.addEventListener("input", (e) => {
  let searchPhrase = e.target.value.toLowerCase();
  let searchResult = search(searchPhrase, allEpisodes);
  populateCards(searchResult);
  displayCount(searchResult);
});

function search(phrase, episodes) {
  const filteredEpisodes = episodes.filter((episode) => {
    const { name, summary } = episode;
    return (
      name.toLowerCase().includes(phrase) ||
      summary.toLowerCase().includes(phrase)
    );
  });
  return filteredEpisodes;
}

// to calculate length of both searched and allEpisodes arrays.
function displayCount(searchedEpisodes) {
  const totalEpisodesLength = allEpisodes.length;
  const searchedEpisodesLength = searchedEpisodes.length;
  displayCountEl.innerText = `Displaying ${searchedEpisodesLength}/${totalEpisodesLength} episodes`;
}

function removeDisplayCount() {
  displayCountEl.innerText = "";
}

function concatenateSeasonAndNumber(episode) {
  const { season, number } = episode;
  let result = "";
  result += season < 10 ? `S0${season}` : `S${season}`;
  result += number < 10 ? `E0${number}` : `E${number}`;
  return result;
}

function createOptionForShowList(episode) {
  const option = document.createElement("option");
  option.setAttribute("value", episode.id);
  option.innerText = episode.name;
  return option;
}

function createShowsDropdownOptions(allEpisodes) {
  showsDropdown.appendChild(
    createOptionForShowList({ name: "all shows", id: "all" })
  );
  allEpisodes.forEach((episode) => {
    const option = createOptionForShowList(episode);
    showsDropdown.appendChild(option);
  });
}

showsDropdown.addEventListener("change", (e) => {
  let showId = e.target.value;
  if (showId === "all") {
    populateCards(allShows, "show");
    removeDisplayCount();
    makeEpisodeList([]);
  } else {
    getEpisodes(showId).then((data) => {
      allEpisodes = data;
      populateCards(allEpisodes);
      displayCount(allEpisodes);
      makeEpisodeList(allEpisodes);
    });
  }
});

function createOption(episode) {
  const option = document.createElement("option");
  option.setAttribute("value", episode.id);
  let title = concatenateSeasonAndNumber(episode);
  option.innerText = title + ` - ${episode.name}`;
  return option;
}

function makeEpisodeList(allEpisodes) {
  episodesDropdown.innerHTML = "";
  allEpisodes.forEach((episode) => {
    const option = createOption(episode);
    episodesDropdown.appendChild(option);
  });
}

// location.href property will set the href value to point to an anchor
episodesDropdown.addEventListener("change", (e) => {
  let value = e.target.value;
  console.log(value);
  location.href = `#${value}`;
  let selectedCard = document.getElementById(value);
  selectedCard.classList.add("selected-card");
  setTimeout(() => {
    selectedCard.classList.remove("selected-card");
  }, 3000);
});

function createCard(episode, type) {
  const li = document.createElement("li");
  const cardTitleWrapper = document.createElement("div");
  const episodeTitle = document.createElement("p");
  const image = document.createElement("img");
  const description = document.createElement("p");
  const link = document.createElement("a");

  li.setAttribute("class", "card");
  cardTitleWrapper.setAttribute("class", "card-title-wrapper");

  episodeTitle.setAttribute("class", "episode-title");

  li.setAttribute("id", episode.id);
  if (type !== "show") {
    let title = concatenateSeasonAndNumber(episode);
    episodeTitle.innerText = episode.name + " - " + title;
  } else {
    episodeTitle.innerText = episode.name;
  }

  image.setAttribute("class", "card-img");
  image.setAttribute(
    "src",
    episode.image
      ? episode.image.medium
      : "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg"
  );

  description.setAttribute("class", "card-desc");
  description.innerHTML = episode.summary;

  link.setAttribute("class", "imageLink");
  link.href = episode.url;
  link.innerHTML = '<img id="playBtn" src="./play.jpg" />';

  cardTitleWrapper.appendChild(episodeTitle);
  li.appendChild(cardTitleWrapper);
  li.appendChild(image);
  li.appendChild(description);
  li.appendChild(link);
  return li;
}
// type parameter is defined to be used in if statement where I want to display show names in title
function populateCards(episodeList, type) {
  const ul = document.getElementById("cards");
  ul.innerHTML = "";
  episodeList.forEach((episode) => {
    const li = createCard(episode, type);
    ul.appendChild(li);
  });
}

window.onload = setup;
