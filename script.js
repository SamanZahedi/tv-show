//You can edit ALL of the code here
const searchBox = document.getElementById("search-box");
const searchCount = document.getElementById("search-count");
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchBox.addEventListener("keyup", onSearchKeyUp);
}

const formatTitleNumbers = (number) =>
  number < 10 ? `0${number}` : `${number}`;

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  // rootElem.textContent = `Got ${allEpisodes.length} episode(s)`;
  allEpisodes.forEach((episode) => {
    let episodeContainer = document.createElement("div");
    episodeContainer.className = "episode";
    let title = document.createElement("h3");
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

window.onload = setup;
