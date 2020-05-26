import { renderSongContainer } from "./home.js";

export async function renderSearch() {
    mainContent.innerHTML = ''
    const searchContainer = document.createElement('div');

    const searchBox = document.createElement('div');
    searchBox.classList.add('search-box');

    const searchInput = document.createElement('input');
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('placeholder', 'Search here...');
    searchInput.setAttribute('type', 'text');
    searchInput.addEventListener('input', search, false)


    const searchContentEmpty = document.createElement('div');
    searchContentEmpty.setAttribute('id', 'empty-search');

    const searchEmptyHeader = document.createElement('span');
    searchEmptyHeader.setAttribute('id', 'empty-search-header');
    searchEmptyHeader.innerHTML = "Search Soundify"

    const searchEmptyText = document.createElement('span');
    searchEmptyText.setAttribute('id', 'empty-search-text');
    searchEmptyText.innerHTML = "Find your favorite songs, artists, albums, and playlists."


    const searchContentFound = document.createElement('div');
    searchContentFound.setAttribute('id', 'search-found')




    mainContent.appendChild(searchContainer);
    searchContainer.appendChild(searchBox);
    searchContainer.appendChild(searchContentEmpty);
    searchBox.appendChild(searchInput);
    searchContentEmpty.appendChild(searchEmptyHeader);
    searchContentEmpty.appendChild(searchEmptyText);
    searchContainer.appendChild(searchContentFound);

}

async function search() {
    let searchFound = document.getElementById('search-found');
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();

    let emptySearchScreen = document.getElementById('empty-search')
    emptySearchScreen.innerHTML = '';


    try {
        const res = await fetch(`http://localhost:8080/search`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) {
            throw res
        }
        const { songs } = await res.json();

        songs.forEach(song => {
            let songTitle = song.title.toLowerCase()
            if (searchInput.includes(songTitle)) {
                searchFound.appendChild(renderSongContainer(song.songLength, song.title, 'artist', song.songURL, song.id))
            }
        })
        //const { albums } = await res.json();
        // albums.forEach(album => {
        //     const { title: albumTitle, imageurl: albumImage, id: albumId,
        //         Artist: { name: artistName, imageURL: artistImage,
        //             id: artistId }, Songs } = album;
        //     Songs.forEach(song => {
        //         const { title } = song;
        //         // console.log(title);

        //         if (searchInput.includes(title)) {
        //             console.log('Searched')

        //         }
        //     })
        //     if (searchInput.includes(albumTitle)) {
        //         console.log('Searched')

        //     }
        // })
        // const { title } = searchAll[0]
        //|| searchInput.includes(title) || searchInput.includes(albumTitle)


    } catch (error) {
        console.error(error)
    }
}
// .search - container
//     .search - box
//         .search - box - input
//             input#search - input(type = "text" placeholder = "Search for music content...")
//     .search - content - empty
//          .search - header
//          .search - text
//     .search - content - found
