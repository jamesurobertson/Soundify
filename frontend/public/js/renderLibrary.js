import { followContent } from './home.js'

const userId = localStorage.getItem("SOUNDIFY_CURRENT_USER_ID")

export async function renderLibraryArtists() {

    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/user/${userId}/follows`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { followedArtists } = await res.json()
        const cardContainers = followedArtists.map(({ id, name, imageURL }) => {
            return renderLibraryCard('artist', imageURL, name, id)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createLibraryTopBar('artist')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Artists'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')

        cardContainers.forEach(card => {
            card.then(cards => {
                mainContentGrid.appendChild(cards)
            })

        })
        mainContentContainer.appendChild(mainContentGrid)

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/collection/artists`
        window.history.pushState('artistsLibrary', 'Title', url)


    } catch (e) {
        console.error(e)
    }
}


export async function renderLibraryAlbums() {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/user/${userId}/follows`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { followedAlbums } = await res.json()
        const cardContainers = followedAlbums.map(({ id, title, imageURL, artistId, createdBy }) => {

            return renderLibraryCard('album', imageURL, title, id, artistId, createdBy)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createLibraryTopBar('album')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Albums'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')


        cardContainers.forEach(card => {
            card.then(cards => {
                mainContentGrid.appendChild(cards)
            })

        })
        mainContentContainer.appendChild(mainContentGrid)


        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/collection/albums`
        window.history.pushState('albumsLibrary', 'Title', url)

    } catch (e) {
        console.error(e)
    }

}

export async function renderLibraryPlaylists() {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/user/${userId}/follows`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { followedPlaylists } = await res.json()
        const cardContainers = followedPlaylists.map(({ id, name, imageURL, createdBy }) => {
            return renderLibraryCard('playlist', imageURL, name, id, createdBy)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createLibraryTopBar('playlist')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Playlists'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')

        cardContainers.forEach(card => {
            card.then(cards => {
                mainContentGrid.appendChild(cards)
            })

        })
        mainContentContainer.appendChild(mainContentGrid)

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/collection/playlists`
        window.history.pushState('playlistsLibrary', 'Title', url)


    } catch (e) {
        console.error(e)
    }
}


export async function renderLibraryUsers() {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/user/${userId}/follows`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { followedUsers } = await res.json()

        const cardContainers = followedUsers.map(({ id, userName }) => {
            return renderLibraryCard('user', '../images/generic-artist.png', userName, id)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createLibraryTopBar('user')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'User'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')

        cardContainers.forEach(card => {
            card.then(cards => {
                mainContentGrid.appendChild(cards)
            })

        })
        mainContentContainer.appendChild(mainContentGrid)

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/collection/users`
        window.history.pushState('usersLibrary', 'Title', url)


    } catch (e) {
        console.error(e)
    }
}



//Creates top bar where Albums, Artists, playlists button are
export function createLibraryTopBar(type) {

    const topBar = document.createElement('div')
    topBar.classList.add('main-content__container__topbar')

    const artistButton = document.createElement('button')
    artistButton.classList.add('topbar-home-button', 'topbar__nav-link-artists')

    artistButton.addEventListener('click', renderLibraryArtists, false)
    artistButton.innerHTML = 'Artists'

    const albumButton = document.createElement('button')
    albumButton.classList.add('topbar--hover', 'topbar-home-button', 'topbar__nav-link-albums')
    albumButton.addEventListener('click', renderLibraryAlbums, false)
    albumButton.innerHTML = 'Albums'


    const playlistButton = document.createElement('button')
    playlistButton.classList.add('topbar--hover', 'topbar-home-button', 'topbar__nav-link-playlists')
    playlistButton.addEventListener('click', renderLibraryPlaylists, false)
    playlistButton.innerHTML = 'Playlists'

    const userButton = document.createElement('button')
    userButton.classList.add('topbar--hover', 'topbar-home-button', 'topbar__nav-link-playlists')
    userButton.addEventListener('click', renderLibraryUsers, false)
    userButton.innerHTML = 'Users'

    if (type === 'playlist') {
        playlistButton.classList.add('topbar-home-button--selected')
    } else if (type === 'artist') {
        artistButton.classList.add('topbar-home-button--selected')
    } else if (type === 'album') {
        albumButton.classList.add('topbar-home-button--selected')
    }
    else {
        userButton.classList.add('topbar-home-button--selected')
    }

    topBar.appendChild(albumButton)
    topBar.appendChild(artistButton)
    topBar.appendChild(playlistButton)
    topBar.appendChild(userButton)

    return topBar
}

//Renders profile cards for albums,artists,playlist
export async function renderLibraryCard(contentType, imageURL, title, id, artistId) {

    const contentCard = document.createElement('div')
    contentCard.classList.add('music-card', `${contentType}-card`)
    contentCard.setAttribute('id', `${contentType}-${id}`)

    const imageDiv = document.createElement('div')
    imageDiv.classList.add('music-card__image')

    const contentImage = document.createElement('img')
    contentImage.setAttribute('src', imageURL)
    imageDiv.appendChild(contentImage)
    contentCard.appendChild(imageDiv)

    const contentTypeContainer = document.createElement('div')
    contentTypeContainer.classList.add('music-card-text-container')

    const contentTitle = document.createElement('div')
    contentTitle.classList.add(`music-card-title`)
    contentTitle.innerHTML = title

    contentTypeContainer.appendChild(contentTitle)

    const type = document.createElement('div')
    type.classList.add('music-card-type')

    if (contentType === 'album') {
        const res = await fetch(`http://localhost:8080/artist/${artistId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            }
        );
        const { artist } = await res.json();

        let artistName = artist.name;
        type.innerHTML = artistName

    }
    if (contentType === 'artist') {
        const res = await fetch(`http://localhost:8080/artist/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            }
        );
        const { artist } = await res.json();

        let artistName = artist.name;
        type.innerHTML = artistName

    }
    if (contentType === 'playlist') {
        const res = await fetch(`http://localhost:8080/playlist/${artistId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            }
        );
        const { playlist } = await res.json();

        let createdBy = playlist.User.userName;
        type.innerHTML = createdBy

    }
    // if(contentType === 'user'){

    // }
    // if (contentType === 'album') {
    // } else {
    //     type.innerHTML = 'test'
    // }

    contentTypeContainer.appendChild(type)
    contentCard.appendChild(contentTypeContainer)

    const playButton = document.createElement('i')
    playButton.classList.add('music-card__play-button', 'fas', 'fa-play-circle')

    contentCard.appendChild(playButton)

    contentCard.addEventListener('click', renderLibraryContent, false)
    return contentCard
}

export async function renderUserLibraryCard(contentType, id, userName) {
    const contentCard = document.createElement('div')
    contentCard.classList.add('music-card', `${contentType}-card`)
    contentCard.setAttribute('id', `${contentType}-${id}`)

    const imageDiv = document.createElement('div')
    imageDiv.classList.add('music-card__image')

    //const contentImage = document.createElement('img')
    //contentImage.setAttribute('src', imageURL)
    //imageDiv.appendChild(contentImage)
    //contentCard.appendChild(imageDiv)

    const contentTypeContainer = document.createElement('div')
    contentTypeContainer.classList.add('music-card-text-container')

    //const contentTitle = document.createElement('div')
    //contentTitle.classList.add(`music-card-title`)
    //contentTitle.innerHTML = title

    //contentTypeContainer.appendChild(contentTitle)

    const type = document.createElement('div')
    type.classList.add('music-card-type')

    const res = await fetch(`http://localhost:8080/user/${id}/follows`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
            }
        }
    );
    const { followedPlaylist } = await res.json();





    contentTypeContainer.appendChild(type)
    contentCard.appendChild(contentTypeContainer)

    const playButton = document.createElement('i')
    playButton.classList.add('music-card__play-button', 'fas', 'fa-play-circle')

    contentCard.appendChild(playButton)

    contentCard.addEventListener('click', renderLibraryContent, false)
    return contentCard
}

export async function renderLibraryContent() {
    let contentType
    if (!this.classList[1]) {
        contentType = 'playlist'
    } else {
        contentType = this.classList[1].slice(0, this.classList[1].length - 5)
    }
    const contentId = this.id.split('-')[1]
    let res
    if (contentType !== 'user') {
        res = await getLibraryRes(contentType, contentId)
    } else {
        res = await getUsersPlaylists(contentId)
    }

    if (contentType === 'artist') {
        renderLibraryArtistId(res)
    } else if (contentType === 'playlist') {
        renderLibraryPlaylistId(res)
    } else if (contentType === 'album') {
        renderLibraryAlbumId(res)
    } else {
        renderLibraryUserId(res)
    }

    const url = `#/${contentType}/${contentId}`
    window.history.pushState('contentType', 'Title', url)

}


async function getUsersPlaylists(userId) {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/user/${userId}/playlist`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        return await res.json()


    } catch (e) {
        console.error(e)
    }
}


export async function getLibraryRes(type, id) {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/${type}/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        return await res.json()


    } catch (e) {
        console.error(e)
    }

}

export async function renderLibraryUserId(res) {
    const { User: { userName }, createdBy: userId } = res.playlists[0]

    const contentHeader = `
    <div class="content-header" id="user-page-container">
        <div class="content-info">
            <div class="content-type">USER</div>
            <div class="content-title">${userName}</div>
        </div>
    </div>`

    const contentMiddle = renderLibraryContentUserMiddleContainer(userId)
    contentMiddle.classList.add('content-middle')

    const playlistContainer = document.createElement('div')
    playlistContainer.classList.add('user-playlists-container')
    playlistContainer.classList.add('main-content__grid')



    res.playlists.forEach(({ id, name, imageURL, createdBy }) => {
        renderLibraryCard('playlist', imageURL, name, id, createdBy)
            .then(playListCard => playlistContainer.appendChild(playListCard))
    })

    mainContent.innerHTML = contentHeader
    mainContent.appendChild(contentMiddle)
    mainContent.appendChild(playlistContainer)
}

export async function renderLibraryArtistId(res) {
    const mainContent = document.getElementById('mainContent')
    const { artist: { biography, name, imageURL, id } } = res

    try {
        const res = await fetch(`http://localhost:8080/artist/${id}/album`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { albums } = await res.json()


        const contentHeader = `
        <div class="artist-content-header">
        <div class="artist-content-art">
        <img src=${imageURL}>
        </div>
        <div class="artist-content-info">
        <div class="artist-content-type">Artist</div>
        <div class="artist-content-title">${name}</div>
        <div class="artist-content-listeners">${Math.floor(Math.random() * 1000000)} listeners</div>
        </div>
        </div>
        `

        const contentMiddle = renderLibraryContentArtistMiddleContainer()
        contentMiddle.classList.add('artist-middle-container')

        const albumsContainer = document.createElement('div')
        albumsContainer.classList.add('artist-albums-container')

        albums.forEach(album => {
            const { title, Songs: songs } = album

            const albumContainer = document.createElement('div')
            albumContainer.classList.add('artist-album-container')

            const albumContainerHeader = document.createElement('div')
            albumContainerHeader.classList.add('artist-album-container-header')
            albumContainer.appendChild(albumContainerHeader)

            const albumImageContainer = document.createElement('div')
            albumImageContainer.classList.add('album-image-container')
            albumImageContainer.classList.add('album-container-image')

            const albumImage = document.createElement('img')
            albumImage.classList.add('album-image')
            albumImageContainer.appendChild(albumImage)

            const albumInfo = document.createElement('div')
            albumInfo.classList.add('album-info')
            albumInfo.innerHTML = title
            albumContainerHeader.appendChild(albumInfo)

            const songContainer = document.createElement('div')
            songContainer.classList.add('album-song-container')

            songs.forEach(song => {
                const { songLength, title: songTitle, songURL } = song
                songContainer.appendChild(renderLibrarySongContainer(songLength, songTitle, name, songURL))
            })
            albumContainer.appendChild(songContainer)
            albumsContainer.appendChild(albumContainer)
        })

        mainContent.innerHTML = contentHeader
        mainContent.appendChild(contentMiddle)
        mainContent.appendChild(albumsContainer)

    } catch (e) {
        console.error(e)
    }
}

export function renderLibraryPlaylistId(res) {
    const mainContent = document.getElementById('mainContent')

    const { playlist: { User: { userName: name }, Songs, imageURL, name: title } } = res

    const contentHeader = `
    <div class="content-header" id="playlist-page-container">
    <div class="content-art">
    <img src=${imageURL}>
    </div>
    <div class="content-info">
    <div class="content-type">PLAYLIST</div>
    <div class="content-title">${title}</div>
    <div class="content-creator">Created by ${name}</div>
    </div>
    </div>`

    const middleContainer = renderLibraryContentMiddleContainer()
    middleContainer.classList.add('content-middle')

    const songContainer = document.createElement('div')
    songContainer.classList.add('content-song-container')

    Songs.forEach(song => {
        const { songLength, title: songTitle, songURL } = song
        songContainer.appendChild(renderLibrarySongContainer(songLength, songTitle, 'artistName', songURL))
    })

    mainContent.innerHTML = contentHeader
    mainContent.appendChild(middleContainer)
    mainContent.appendChild(songContainer)
}

export function renderLibraryAlbumId(res) {
    const mainContent = document.getElementById('mainContent')

    const { album: { Artist: { name }, Songs, imageURL, title } } = res

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
    </div>`

    const middleContainer = renderLibraryContentMiddleContainer()
    middleContainer.classList.add('content-middle')

    const songContainer = document.createElement('div')
    songContainer.classList.add('content-song-container')

    Songs.forEach(song => {
        const { songLength, title: songTitle, songURL } = song
        songContainer.appendChild(renderLibrarySongContainer(songLength, songTitle, name, songURL))
    })

    mainContent.innerHTML = contentHeader
    mainContent.appendChild(middleContainer)
    mainContent.appendChild(songContainer)

}

export function renderLibraryContentMiddleContainer() {
    const middleContentContainer = document.createElement('div')

    const middlePlayButton = document.createElement('div')
    middlePlayButton.classList.add('middle-play-button', 'fas', 'fa-play-circle')
    middlePlayButton.addEventListener('click', playContent, false)

    const likeSongButton = document.createElement('div')
    likeSongButton.classList.add('liked-song-button', 'fas', "fa-heart")
    likeSongButton.addEventListener('click', followContent, false)


    middleContentContainer.appendChild(middlePlayButton)
    middleContentContainer.appendChild(likeSongButton)

    return middleContentContainer
}

export function renderLibraryContentUserMiddleContainer(userId) {
    const middleContentContainer = document.createElement('div')

    const likeContentButton = document.createElement('div')
    likeContentButton.classList.add('liked-song-button', 'fas', "fa-heart")
    likeContentButton.setAttribute('id', `user-${userId}`)
    likeContentButton.addEventListener('click', followContent, false)

    middleContentContainer.appendChild(likeContentButton)

    return middleContentContainer
}


export function renderLibraryContentArtistMiddleContainer() {
    const middleContentContainer = document.createElement('div')

    const middlePlayButton = document.createElement('div')
    middlePlayButton.classList.add('artist-middle-play-button', 'fas', 'fa-play-circle')
    middlePlayButton.addEventListener('click', playContent, false)

    const followArtistButton = document.createElement('button')
    followArtistButton.classList.add('follow-artist-button')
    followArtistButton.innerHTML = 'FOLLOW'
    followArtistButton.addEventListener('click', followContent, false)


    middleContentContainer.appendChild(middlePlayButton)
    middleContentContainer.appendChild(followArtistButton)

    return middleContentContainer
}

export function renderLibrarySongContainer(length, title, artist, songURL, song) {
    const songContainer = document.createElement('div')
    songContainer.classList.add('songContainer')

    const playIcon = document.createElement('div')
    playIcon.classList.add('play-song-icon', 'fas', 'fa-play-circle')
    playIcon.setAttribute('id', songURL)
    playIcon.addEventListener('click', playSong, false)

    const songInfo = document.createElement('div')
    songInfo.classList.add('song-info')

    const songTitle = document.createElement('div')
    songTitle.classList.add('song-title')
    songTitle.innerHTML = title
    songInfo.appendChild(songTitle)

    const songArtist = document.createElement('div')
    songArtist.classList.add('song-artist')
    songArtist.innerHTML = artist
    songInfo.appendChild(songArtist)

    const songContextMenu = document.createElement('div')
    songContextMenu.classList.add('song-context-menu', 'fas', 'fa-ellipsis-h')
    songContextMenu.addEventListener('click', openSongMenu, false)

    const addToPlaylist = document.createElement('div')
    addToPlaylist.classList.add('add-to-playlist')
    addToPlaylist.addEventListener('click', addPlaylistContent, false)
    songContextMenu.appendChild(addToPlaylist)

    const followSong = document.createElement('div')
    followSong.classList.add('follow-song')
    followSong.addEventListener('click', followContent, false)
    songContextMenu.appendChild(followSong)

    const songDuration = document.createElement('div')
    songDuration.classList.add('song-duration')
    songDuration.innerHTML = length

    songContainer.appendChild(playIcon)
    songContainer.appendChild(songInfo)
    songContainer.appendChild(songContextMenu)
    songContainer.appendChild(songDuration)

    return songContainer
}


//Import from home.js?

async function openSongMenu() {
    const ellipsisUl = document.querySelector('.ellipsis-ul')
    ellipsisUl.classList.toggle('ellipsis--hidden');
}

async function addPlaylistContent() {
}
