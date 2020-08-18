import { renderLibraryContent } from "./renderLibrary.js";
import {
  playlistAddSong,
  getAllPlaylists,
  addSong,
} from "./playlistAddSong.js";

export async function renderArtists() {
  try {
    // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
    const res = await fetch("http://localhost:8080/artist", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    if (!res.ok) throw res;

    const { artists } = await res.json();
    const cardContainers = artists.map(({ id, name, imageURL, artistId }) => {
      return renderCard("artist", imageURL, name, id);
    });
    const mainContent = document.getElementById("mainContent");

    const mainContentContainer = document.createElement("div");
    mainContentContainer.classList.add("main-content__container");

    const topBar = createTopBar("artist");
    mainContentContainer.appendChild(topBar);

    const title = document.createElement("div");
    title.classList.add("music-content__title");
    title.innerHTML = "Artists";

    mainContentContainer.appendChild(title);

    const mainContentGrid = document.createElement("div");
    mainContentGrid.classList.add("main-content__grid");

    cardContainers.forEach((card) => mainContentGrid.appendChild(card));
    mainContentContainer.appendChild(mainContentGrid);

    mainContent.innerHTML = "";
    mainContent.appendChild(mainContentContainer);

    const clearFooter = document.createElement("div");
    clearFooter.classList.add("clear-footer");
    mainContent.appendChild(clearFooter);

    const url = `#/browse/artists`;
    window.history.pushState("artists", "Title", url);
  } catch (e) {
    console.error(e);
  }
}

export async function renderAlbums() {
  try {
    // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
    const res = await fetch("http://localhost:8080/album", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    if (!res.ok) throw res;

    const { albums } = await res.json();
    const cardContainers = albums.map(
      ({ id, title, imageURL, artistId, Artist: { name } }) => {
        return renderCard("album", imageURL, title, id, name);
      }
    );

    const mainContent = document.getElementById("mainContent");

    const mainContentContainer = document.createElement("div");
    mainContentContainer.classList.add("main-content__container");

    const topBar = createTopBar("album");
    mainContentContainer.appendChild(topBar);

    const title = document.createElement("div");
    title.classList.add("music-content__title");
    title.innerHTML = "Albums";

    mainContentContainer.appendChild(title);

    const mainContentGrid = document.createElement("div");
    mainContentGrid.classList.add("main-content__grid");

    cardContainers.forEach((card) => mainContentGrid.appendChild(card));
    mainContentContainer.appendChild(mainContentGrid);

    mainContent.innerHTML = "";
    mainContent.appendChild(mainContentContainer);

    const clearFooter = document.createElement("div");
    clearFooter.classList.add("clear-footer");
    mainContent.appendChild(clearFooter);

    const url = `#/browse/albums`;
    window.history.pushState("albums", "Title", url);
  } catch (e) {
    console.error(e);
  }
}

export async function renderPlaylists() {
  try {
    // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
    const res = await fetch("http://localhost:8080/playlist", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    if (!res.ok) throw res;

    const { playlists } = await res.json();
    const cardContainers = playlists.map(
      ({ id, name, imageURL, User: { userName } }) => {
        return renderCard("playlist", imageURL, name, id, userName);
      }
    );

    const mainContent = document.getElementById("mainContent");

    const mainContentContainer = document.createElement("div");
    mainContentContainer.classList.add("main-content__container");

    const topBar = createTopBar("playlist");
    mainContentContainer.appendChild(topBar);

    const title = document.createElement("div");
    title.classList.add("music-content__title");
    title.innerHTML = "Playlists";

    mainContentContainer.appendChild(title);

    const mainContentGrid = document.createElement("div");
    mainContentGrid.classList.add("main-content__grid");

    cardContainers.forEach((card) => mainContentGrid.appendChild(card));
    mainContentContainer.appendChild(mainContentGrid);

    mainContent.innerHTML = "";
    mainContent.appendChild(mainContentContainer);

    const clearFooter = document.createElement("div");
    clearFooter.classList.add("clear-footer");
    mainContent.appendChild(clearFooter);

    const url = `#/browse/playlists`;
    window.history.pushState("playlists", "Title", url);
  } catch (e) {
    console.error(e);
  }
}

//Creates top bar where Albums, Artists, playlists button are
export function createTopBar(type) {
  const topBar = document.createElement("div");
  topBar.classList.add("main-content__container__topbar");

  const artistButton = document.createElement("button");
  artistButton.classList.add("topbar-home-button", "topbar__nav-link-artists");

  artistButton.addEventListener("click", renderArtists, false);
  artistButton.innerHTML = "Artist";

  const albumButton = document.createElement("button");
  albumButton.classList.add(
    "topbar--hover",
    "topbar-home-button",
    "topbar__nav-link-albums"
  );
  albumButton.addEventListener("click", renderAlbums, false);
  albumButton.innerHTML = "Albums";

  const playlistButton = document.createElement("button");
  playlistButton.classList.add(
    "topbar--hover",
    "topbar-home-button",
    "topbar__nav-link-playlists"
  );
  playlistButton.addEventListener("click", renderPlaylists, false);
  playlistButton.innerHTML = "Playlists";

  if (type === "playlist") {
    playlistButton.classList.add("topbar-home-button--selected");
  } else if (type === "artist") {
    artistButton.classList.add("topbar-home-button--selected");
  } else {
    albumButton.classList.add("topbar-home-button--selected");
  }

  topBar.appendChild(albumButton);
  topBar.appendChild(artistButton);
  topBar.appendChild(playlistButton);

  return topBar;
}

//Renders profile cards for albums,artists,playlist
export function renderCard(
  contentType,
  imageURL,
  title,
  id,
  name,
  addPlaylist
) {
  const contentCard = document.createElement("div");
  contentCard.classList.add("music-card", `${contentType}-card`);
  contentCard.setAttribute("id", `${contentType}-${id}`);

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("music-card__image");

  const contentImage = document.createElement("img");
  contentImage.setAttribute("src", imageURL);
  imageDiv.appendChild(contentImage);
  contentCard.appendChild(imageDiv);

  const contentTypeContainer = document.createElement("div");
  contentTypeContainer.classList.add("music-card-text-container");

  const contentTitle = document.createElement("div");
  contentTitle.classList.add(`music-card-title`);
  contentTitle.innerHTML = title;

  contentTypeContainer.appendChild(contentTitle);

  const type = document.createElement("div");
  type.classList.add("music-card-type");

  if (name) {
    type.innerHTML = name;
  } else {
    type.innerHTML = "Artist";
  }

  contentTypeContainer.appendChild(type);
  contentCard.appendChild(contentTypeContainer);

  const playButton = document.createElement("i");
  playButton.classList.add("music-card__play-button", "fas", "fa-play-circle");

  contentCard.appendChild(playButton);

  if (!addPlaylist) {
    contentCard.addEventListener("click", renderContent, false);
  } else {
    contentCard.classList.add(`songId-${addPlaylist}`);
    contentCard.addEventListener("click", addSong, false);
  }
  return contentCard;
}

export async function renderContent() {
  let contentType;
  if (!this.classList[1]) {
    contentType = "playlist";
  } else {
    contentType = this.classList[1].slice(0, this.classList[1].length - 5);
  }
  const contentId = this.id.split("-")[1];

  const res = await getRes(contentType, contentId);

  if (contentType === "artist") {
    renderArtistId(res);
  } else if (contentType === "playlist") {
    renderPlaylistId(res);
  } else {
    renderAlbumId(res);
  }

  const url = `#/${contentType}/${contentId}`;
  window.history.pushState("albums", "Title", url);
}

export async function getRes(type, id) {
  try {
    const res = await fetch(`http://localhost:8080/${type}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    if (!res.ok) throw res;
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

//Pulls home/artist information
export async function renderArtistId(res) {
  const mainContent = document.getElementById("mainContent");
  const {
    artist: { biography, name, imageURL, id },
  } = res;

  try {
    const res = await fetch(`http://localhost:8080/artist/${id}/album`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    if (!res.ok) throw res;

    const { albums } = await res.json();

    const contentHeader = `
        <div class="content-header">
        <div class="content-art">
        <img src=${imageURL}>
        </div>
        <div class="content-info">
        <div class="content-type">Artist</div>
        <div class="content-title">${name}</div>
        <div class="content-listeners">${Math.floor(
          Math.random() * 1000000
        )} listeners</div>
        </div>
        </div>
        `;

    const contentMiddle = renderContentArtistMiddleContainer(id);
    contentMiddle.classList.add("artist-middle-container");

    const albumsContainer = document.createElement("div");
    albumsContainer.classList.add("artist-albums-container");

    albums.forEach((album) => {
      const { title, Songs: songs, imageURL } = album;

      const albumContainer = document.createElement("div");
      albumContainer.classList.add("artist-album-container");

      const albumContainerHeader = document.createElement("div");
      albumContainerHeader.classList.add("artist-album-container-header");
      albumContainer.appendChild(albumContainerHeader);

      const albumImageContainer = document.createElement("div");
      albumImageContainer.classList.add("album-image-container");
      albumImageContainer.classList.add("album-container-image");

      const albumImage = document.createElement("img");
      albumImage.classList.add("album-image");
      albumImage.setAttribute("src", imageURL);
      albumImageContainer.appendChild(albumImage);
      albumContainerHeader.appendChild(albumImageContainer);

      const albumInfo = document.createElement("div");
      albumInfo.classList.add("album-info");
      const songContainer = document.createElement("div");
      songContainer.classList.add("album-song-container");

      songs.forEach((song) => {
        const { songLength, title: songTitle, songURL, id } = song;
        songContainer.appendChild(
          renderSongContainer(songLength, songTitle, name, songURL, id)
        );
      });
      albumContainer.appendChild(songContainer);
      albumsContainer.appendChild(albumContainer);
    });

    mainContent.innerHTML = contentHeader;
    mainContent.appendChild(contentMiddle);
    mainContent.appendChild(albumsContainer);

    const clearFooter = document.createElement("div");
    clearFooter.classList.add("clear-footer");
    mainContent.appendChild(clearFooter);
  } catch (e) {
    console.error(e);
  }
}

export function renderPlaylistId(res) {
  const mainContent = document.getElementById("mainContent");
  const {
    playlist: {
      User: { userName: name, id: userId },
      Songs,
      imageURL,
      name: title,
      id,
    },
  } = res;
  const contentHeader = renderPlayListHeader(title, imageURL, userId, name);

  const middleContainer = renderContentMiddleContainer("playlist", id);
  middleContainer.classList.add("content-middle");

  const songContainer = document.createElement("div");
  songContainer.classList.add("content-song-container");

  Songs.forEach((song) => {
    const {
      songLength,
      title: songTitle,
      id,
      songURL,
      Album: {
        Artist: { name },
      },
    } = song;
    songContainer.appendChild(
      renderSongContainer(songLength, songTitle, name, songURL, id)
    );
  });

  mainContent.innerHTML = "";
  mainContent.appendChild(contentHeader);
  mainContent.appendChild(middleContainer);
  mainContent.appendChild(songContainer);

  const clearFooter = document.createElement("div");
  clearFooter.classList.add("clear-footer");
  mainContent.appendChild(clearFooter);
}

export function renderAlbumId(res) {
  const mainContent = document.getElementById("mainContent");

  const {
    album: {
      Artist: { name },
      Songs,
      imageURL,
      title,
      id,
    },
  } = res;

  const contentHeader = `
    <div class="content-header" id="album-page-container">
    <div class="content-art">
    <img src=${imageURL}>
    </div>
    <div class="content-info">
    <div class="content-type">ALBUM</div>
    <div class="content-title">${title}</div>
    <div class="content-creator">${name}</div>
    </div>
    </div>`;

  const middleContainer = renderContentMiddleContainer("album", id);
  middleContainer.classList.add("content-middle");

  const songContainer = document.createElement("div");
  songContainer.classList.add("content-song-container");

  Songs.forEach((song) => {
    const { songLength, title: songTitle, songURL, id } = song;
    songContainer.appendChild(
      renderSongContainer(songLength, songTitle, name, songURL, id)
    );
  });

  mainContent.innerHTML = contentHeader;
  mainContent.appendChild(middleContainer);
  mainContent.appendChild(songContainer);

  const clearFooter = document.createElement("div");
  clearFooter.classList.add("clear-footer");
  mainContent.appendChild(clearFooter);
}

export function renderContentMiddleContainer(followableType, followableId) {
  const middleContentContainer = document.createElement("div");

  const middlePlayButton = document.createElement("div");
  middlePlayButton.classList.add("middle-play-button", "fas", "fa-play-circle");
  middlePlayButton.addEventListener("click", playContent, false);

  const likeContentButton = document.createElement("div");
  likeContentButton.classList.add("liked-song-button", "fas", "fa-heart");
  likeContentButton.setAttribute("id", `${followableType}-${followableId}`);
  likeContentButton.addEventListener("click", followContent, false);

  middleContentContainer.appendChild(middlePlayButton);
  middleContentContainer.appendChild(likeContentButton);

  return middleContentContainer;
}

function renderPlayListHeader(title, imageUrl, userId, name) {
  const contentHeader = document.createElement("div");
  contentHeader.classList.add("content-header");
  contentHeader.setAttribute("id", "playlist-page-container");

  const contentArt = document.createElement("div");
  contentArt.classList.add("content-art");
  const contentImage = document.createElement("img");
  contentImage.setAttribute("src", imageUrl);
  contentArt.appendChild(contentImage);

  const contentInfo = document.createElement("div");
  contentInfo.classList.add("content-info");

  const contentType = document.createElement("div");
  contentType.classList.add("content-type");
  contentType.innerHTML = "PLAYLIST";

  const contentTitle = document.createElement("div");
  contentTitle.classList.add("content-title");
  contentTitle.innerHTML = title;

  const contentCreator = document.createElement("div");
  contentCreator.classList.add("content-creator");
  contentCreator.innerHTML = "Created By";

  const userButton = document.createElement("button");
  userButton.classList.add("userPlaylist");
  userButton.classList.add("user-card");
  userButton.setAttribute("id", `user-${userId}`);
  userButton.addEventListener("click", renderLibraryContent, false);
  userButton.innerHTML = name;

  contentCreator.appendChild(userButton);
  contentInfo.appendChild(contentType);
  contentInfo.appendChild(contentTitle);
  contentInfo.appendChild(contentCreator);
  contentHeader.appendChild(contentArt);
  contentHeader.appendChild(contentInfo);

  return contentHeader;
}

export function renderContentArtistMiddleContainer(followableId) {
  const middleContentContainer = document.createElement("div");

  const middlePlayButton = document.createElement("div");
  middlePlayButton.classList.add(
    "artist-middle-play-button",
    "fas",
    "fa-play-circle"
  );
  middlePlayButton.addEventListener("click", playContent, false);

  const followArtistButton = document.createElement("button");
  followArtistButton.classList.add("follow-artist-button");
  followArtistButton.innerHTML = "FOLLOW";
  followArtistButton.setAttribute("id", `artist-${followableId}`);
  followArtistButton.addEventListener("click", followContent, false);

  middleContentContainer.appendChild(middlePlayButton);
  middleContentContainer.appendChild(followArtistButton);

  return middleContentContainer;
}

export function renderSongContainer(length, title, artist, songURL, id) {
  const songContainer = document.createElement("div");
  songContainer.classList.add("songContainer");

  const playIcon = document.createElement("div");
  playIcon.classList.add("play-song-icon", "fas", "fa-play-circle");
  playIcon.setAttribute("id", songURL);
  playIcon.addEventListener("click", playSong, false);

  const songInfo = document.createElement("div");
  songInfo.classList.add("song-info");

  const songTitle = document.createElement("div");
  songTitle.classList.add("song-title");
  songTitle.innerHTML = title;
  songInfo.appendChild(songTitle);

  const songArtist = document.createElement("div");
  songArtist.classList.add("song-artist");
  songArtist.innerHTML = artist;
  songInfo.appendChild(songArtist);

  const songContextMenu = document.createElement("div");
  songContextMenu.classList.add("song-context-menu", "fas", "fa-ellipsis-h");
  songContextMenu.addEventListener("click", openSongMenu, false);

  const songUlMenu = document.createElement("ul");
  songUlMenu.classList.add("ellipsis-ul", "ellipsis--hidden");
  songContextMenu.appendChild(songUlMenu);

  const addToPlaylist = document.createElement("li");
  addToPlaylist.classList.add("add-to-playlist");
  addToPlaylist.setAttribute("id", `song-${id}`);
  addToPlaylist.addEventListener("click", playlistAddSong, false);
  songUlMenu.appendChild(addToPlaylist);
  addToPlaylist.innerHTML = "Add to Playlist";

  const followSong = document.createElement("li");
  followSong.setAttribute("id", `song-${id}`);
  followSong.classList.add("follow-song");
  followSong.addEventListener("click", followContent, false);
  songUlMenu.appendChild(followSong);
  followSong.innerHTML = "Like Song";

  const songDuration = document.createElement("div");
  songDuration.classList.add("song-duration");
  songDuration.innerHTML = length;

  songContainer.appendChild(playIcon);
  songContainer.appendChild(songInfo);
  songContainer.appendChild(songContextMenu);
  songContainer.appendChild(songDuration);

  return songContainer;
}

export async function followContent(res) {
  const [followableType, followableId] = this.id.split("-");
  const userId = localStorage.getItem("SOUNDIFY_CURRENT_USER_ID");

  try {
    const res = await fetch(
      `http://localhost:8080/follow/${userId}/${followableType}/${followableId}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "SOUNDIFY_ACCESS_TOKEN"
          )}`,
        },
      }
    );
    if (!res.ok) throw res;
  } catch (e) {
    console.error(e);
  }
}

async function openSongMenu() {
  const ellipsisUl = this.firstChild;
  ellipsisUl.classList.toggle("ellipsis--hidden");
}
