//You can edit ALL of the code here
const searchBox = document.getElementById("search-box");
const searchCount = document.getElementById("search-count");
let navbar = document.querySelector(".navbar");
let pageNavigation = document.createElement("nav");
navbar.appendChild(pageNavigation);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchBox.addEventListener("keyup", onSearchKeyUp);
  addEpisodesSelector();
}

const formatTitleNumbers = (number) =>
  number < 10 ? `0${number}` : `${number}`;

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  allEpisodes.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.className = "episode";
    let title = document.createElement("h3");
    title.classList.add("episodeName");
    title.innerText = `${episode.name} - S${formatTitleNumbers(
      episode.season
    )}E${formatTitleNumbers(episode.number)}`;
    let episodeImage = document.createElement("img");
    episodeImage.src = episode.image.medium;
    let summaryOfEpisode = document.createElement("p");
    summaryOfEpisode.innerText = episode.summary
      .replace("<p>", "")
      .replace("</p>", "");
    episodeContainer.appendChild(title);
    episodeContainer.appendChild(episodeImage);
    episodeContainer.appendChild(summaryOfEpisode);
    rootElem.appendChild(episodeContainer);
  });
}
function onSearchKeyUp(event) {
  const searchTerm = event.target.value.toLowerCase();
  const allEpisodes = getAllEpisodes();
  const filteredEpisodes = allEpisodes.filter((e) => {
    const episodeName = e.name.toLowerCase();
    const episodeSummary = e.summary.toLowerCase();
    return (
      episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)
    );
  });
  const filteredCount = filteredEpisodes.length;
  const allCount = allEpisodes.length;
  const countString = `Displaying ${filteredCount} / ${allCount}`;
  searchCount.innerText = countString;
  makePageForEpisodes(filteredEpisodes);
}

// click to choose addition
function addEpisodesSelector() {
  let selectAnEpisode = document.createElement("select");
  selectAnEpisode.setAttribute("id", "episodes");

  pageNavigation.prepend(selectAnEpisode);

  let getEpisodesTitles = document.getElementsByClassName("episodeName");

  let episodeOption = document.createElement("option");
  episodeOption.innerText = "Click to choose";
  selectAnEpisode.appendChild(episodeOption);

  for (
    let titleIndex = 0;
    titleIndex < getEpisodesTitles.length;
    titleIndex++
  ) {
    episodeOption = document.createElement("option");
    selectAnEpisode.appendChild(episodeOption);

    episodeOption.innerText = getEpisodesTitles[titleIndex].innerText;
  }

  selectAnEpisode.addEventListener("change", changeEpisode);
}

function changeEpisode(e) {
  let selectedOption = e.target.value;
  let getResultsOnPage = document.getElementsByClassName("episode");

  let allResultsOnPage = Array.from(getResultsOnPage);

  allResultsOnPage.forEach((result) => {
    if (result.innerText.includes(selectedOption)) {
      result.style.display = "flex";
    } else {
      result.style.display = "none";
    }

    searchCount.innerText = `Displaying 1/${getResultsOnPage.length} results`;

    if (selectedOption === "Click to choose") {
      result.style.display = "flex";
      searchCount.innerText = `Displaying ${getResultsOnPage.length} results`;
    }
  });
}

window.onload = setup;
