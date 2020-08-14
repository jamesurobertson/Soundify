import {
  renderAlbums,
  renderPlaylistId,
  renderContent,
  renderSongContainer,
  renderContentMiddleContainer,
} from "./home.js";
import {
  renderLibraryAlbums,
  renderLibraryPlaylistId,
  renderLibraryContent,
} from "./renderLibrary.js";
import { renderSearch } from "./search.js";

window.addEventListener("DOMContentLoaded", async () => {
  renderAlbums();
  const allAlbums = document.querySelectorAll(".home-albums");
  const yourLibrary = document.querySelector(".your-library");

  allAlbums.forEach((link) => {
    link.addEventListener("click", async (e) => {
      renderAlbums();
    });
  });

  yourLibrary.addEventListener("click", (e) => {
    renderLibraryAlbums();
    const url = `#/collection/albums`;
    window.history.pushState("albums", "Title", url);
  });

  document.querySelectorAll(".left-nav__link-container").forEach((link) => {
    link.addEventListener("click", (e) => {
      document
        .querySelector(".left-nav__link-container--active")
        .classList.remove("left-nav__link-container--active");
      e.currentTarget.classList.add("left-nav__link-container--active");
    });
  });
  try {
    const res = await fetch("http://localhost:8080/#/browse", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    const { albums } = await res.json();

    if (res.status === 401) {
      window.location.href = "/home-landing";
    }
  } catch (e) {
    console.error(e);
  }

  document
    .querySelector(".createPlaylist-button")
    .addEventListener("click", (e) => {
      const createPlaylistScreen = document.querySelector(
        ".createPlaylistScreen"
      );

      createPlaylistScreen.classList.toggle("createPlaylistScreen--hidden");
    });

  try {
    const userId = localStorage.getItem("SOUNDIFY_CURRENT_USER_ID");
    const res = await fetch(`http://localhost:8080/user/${userId}/playlist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "SOUNDIFY_ACCESS_TOKEN"
        )}`,
      },
    });
    if (!res.ok) {
      throw res;
    }

    const { playlists } = await res.json();
    const playlistContainer = document.querySelector(
      ".left-nav__playlists-container"
    );
    playlists.forEach(({ name, id }) => {
      const playlistLinkContainer = document.createElement("div");
      playlistLinkContainer.classList.add("left-nav__playlist-link-container");

      const playlistButton = document.createElement("button");
      playlistButton.innerHTML = name;
      playlistButton.classList.add("left-nav__playlist-link");

      playlistButton.setAttribute("id", `playlistId-${id}`);
      playlistButton.addEventListener("click", renderContent, false);
      playlistLinkContainer.appendChild(playlistButton);

      playlistContainer.appendChild(playlistLinkContainer);
    });
  } catch (e) {
    console.error(e);
  }

  document
    .getElementById("header-logout-button")
    .addEventListener("click", (e) => {
      localStorage.removeItem("SOUNDIFY_CURRENT_USER_ID");
      localStorage.removeItem("SOUNDIFY_ACCESS_TOKEN");
      location.reload();
    });

  document
    .querySelector(".left-nav__liked-songs")
    .addEventListener("click", async (e) => {
      // let topContainer = document.querySelectorAll('topbar-home-button');
      // topContainer.forEach(el => {
      //     el.innerHTML = '';
      // })

      // let title = document.querySelector('.music-content__title');
      // title.innerHTML = 'Liked Songs';
      // let songContainer = document.querySelector('.main-content__grid');
      // songContainer.innerHTML = '';
      const userId = localStorage.getItem("SOUNDIFY_CURRENT_USER_ID");
      mainContent.innerHTML = "";
      const contentHeader = `
                <div class="content-header" id="album-page-container">
                <div class="content-art">
                <img src=${"./images/chance.jpg"}>
                </div>
                <div class="content-info">
                <div class="content-title">Liked Songs</div>
                </div>
                </div>`;

      const middleContainer = renderContentMiddleContainer("user", userId);
      middleContainer.classList.add("content-middle");
      try {
        const res = await fetch(
          `http://localhost:8080/user/${userId}/follows`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem(
                "SOUNDIFY_ACCESS_TOKEN"
              )}`,
            },
          }
        );
        if (!res.ok) {
          throw res;
        }
        const { followedSongs } = await res.json();

        followedSongs.forEach(async (song) => {
          const { songLength, title, songURL, id, albumId } = song;
          const albumRes = await fetch(
            `http://localhost:8080/album/${albumId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                  "SOUNDIFY_ACCESS_TOKEN"
                )}`,
              },
            }
          );
          if (!albumRes.ok) throw albumRes;
          const { album } = await albumRes.json();
          const {
            Artist: { name },
          } = album;
          mainContent.innerHTML = contentHeader;
          mainContent.appendChild(middleContainer);
          mainContent.appendChild(
            renderSongContainer(songLength, title, name, songURL, id)
          );
        });
      } catch (err) {
        console.error(err);
      }
    });

  let searchButton = document.querySelector(".left-nav__search-button");
  searchButton.addEventListener("click", (err) => {
    renderSearch();
  });
});
