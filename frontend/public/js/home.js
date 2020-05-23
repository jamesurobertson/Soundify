window.addEventListener('DOMContentLoaded', () => {
    renderAlbums()
    const allAlbums = document.querySelectorAll('.home-albums')
    allAlbums.forEach(link => {
        link.addEventListener('click', async (e) => {
            renderAlbums()
        })
    })
})
const player = document.createElement("audio")


async function renderArtists() {

    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch('http://localhost:8080/artist',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { artists } = await res.json()
        const cardContainers = artists.map(({ id, name, imageURL, artistId }) => {
            return renderCard('artist', imageURL, name, id)
        })
        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createTopBar('artist')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Artists'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')

        cardContainers.forEach(card => mainContentGrid.appendChild(card))
        mainContentContainer.appendChild(mainContentGrid)

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/browse/artists`
        window.history.pushState('artists', 'Title', url)


    } catch (e) {
        console.error(e)
    }
}

async function renderAlbums() {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch('http://localhost:8080/album',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { albums } = await res.json()
        const cardContainers = albums.map(({ id, title, imageURL, artistId, Artist: { name } }) => {
            return renderCard('album', imageURL, title, id, name)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createTopBar('album')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Albums'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')

        cardContainers.forEach(card => mainContentGrid.appendChild(card))
        mainContentContainer.appendChild(mainContentGrid)

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/browse/albums`
        window.history.pushState('albums', 'Title', url)

    } catch (e) {
        console.error(e)
    }

}

async function renderPlaylists() {
    try {
        // const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch('http://localhost:8080/playlist',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) throw res

        const { playlists } = await res.json()
        const cardContainers = playlists.map(({ id, name, imageURL, User: { userName } }) => {
            return renderCard('playlist', imageURL, name, id, userName)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createTopBar('playlist')
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Playlists'

        mainContentContainer.appendChild(title)

        const mainContentGrid = document.createElement('div')
        mainContentGrid.classList.add('main-content__grid')

        cardContainers.forEach(card => mainContentGrid.appendChild(card))
        mainContentContainer.appendChild(mainContentGrid)

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/browse/playlists`
        window.history.pushState('playlists', 'Title', url)


    } catch (e) {
        console.error(e)
    }
}

function createTopBar(type) {

    const topBar = document.createElement('div')
    topBar.classList.add('main-content__container__topbar')

    const artistButton = document.createElement('button')
    artistButton.classList.add('topbar-home-button', 'topbar__nav-link-artists')

    artistButton.addEventListener('click', renderArtists, false)
    artistButton.innerHTML = 'Artist'

    const albumButton = document.createElement('button')
    albumButton.classList.add('topbar--hover', 'topbar-home-button', 'topbar__nav-link-albums')
    albumButton.addEventListener('click', renderAlbums, false)
    albumButton.innerHTML = 'Albums'


    const playlistButton = document.createElement('button')
    playlistButton.classList.add('topbar--hover', 'topbar-home-button', 'topbar__nav-link-playlists')
    playlistButton.addEventListener('click', renderPlaylists, false)
    playlistButton.innerHTML = 'Playlists'


    if (type === 'playlist') {
        playlistButton.classList.add('topbar-home-button--selected')
    } else if (type === 'artist') {
        artistButton.classList.add('topbar-home-button--selected')
    } else {
        albumButton.classList.add('topbar-home-button--selected')
    }

    topBar.appendChild(albumButton)
    topBar.appendChild(artistButton)
    topBar.appendChild(playlistButton)

    return topBar
}

function renderCard(contentType, imageURL, title, id, name) {

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

    if (name) {
        type.innerHTML = name
    } else {
        type.innerHTML = 'Artist'
    }

    contentTypeContainer.appendChild(type)
    contentCard.appendChild(contentTypeContainer)

    const playButton = document.createElement('i')
    playButton.classList.add('music-card__play-button', 'fas', 'fa-play-circle')

    contentCard.appendChild(playButton)

    contentCard.addEventListener('click', renderContent, false)
    return contentCard
}





async function renderContent() {
    console.log('rendering')
    let contentType
    if (!this.classList[1]) {
        contentType = 'playlist'
    } else {
        contentType = this.classList[1].slice(0, this.classList[1].length - 5)
    }
    const contentId = this.id.split('-')[1]

    const res = await getRes(contentType, contentId)

    if (contentType === 'artist') {
        renderArtistId(res)
    } else if (contentType === 'playlist') {
        renderPlaylistId(res)
    } else {
        renderAlbumId(res)
    }

    const url = `#/${contentType}/${contentId}`
    window.history.pushState('albums', 'Title', url)

}


async function getRes(type, id) {
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


async function renderArtistId(res) {
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

        const contentMiddle = renderContentArtistMiddleContainer()
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
                songContainer.appendChild(renderSongContainer(songLength, songTitle, name, songURL))
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

function renderPlaylistId(res) {
    const mainContent = document.getElementById('mainContent')

    const { playlist: { createdBy: { userName: name }, Songs, imageURL, name: title } } = res

    const contentHeader = `
    <div class="content-header" id="playlist-page-container">
    <div class="content-art">
    <img src=${imageURL}>
    </div>
    <div class="content-info">
    <div class="content-type">PLAYLIST</div>
    <div class="content-title">${title}</div>
    <div class="content-creator">${name}</div>
    </div>
    </div>`

    const middleContainer = renderContentMiddleContainer()
    middleContainer.classList.add('content-middle')

    const songContainer = document.createElement('div')
    songContainer.classList.add('content-song-container')

    Songs.forEach(song => {
        const { songLength, title: songTitle, songURL } = song
        songContainer.appendChild(renderSongContainer(songLength, songTitle, 'artistName', songURL))
    })

    mainContent.innerHTML = contentHeader
    mainContent.appendChild(middleContainer)
    mainContent.appendChild(songContainer)
}



function renderAlbumId(res) {
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

    const middleContainer = renderContentMiddleContainer()
    middleContainer.classList.add('content-middle')

    const songContainer = document.createElement('div')
    songContainer.classList.add('content-song-container')

    Songs.forEach(song => {
        const { songLength, title: songTitle, songURL } = song
        songContainer.appendChild(renderSongContainer(songLength, songTitle, name, songURL, song))
    })

    mainContent.innerHTML = contentHeader
    mainContent.appendChild(middleContainer)
    mainContent.appendChild(songContainer)

}

function renderContentMiddleContainer() {
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

function renderContentArtistMiddleContainer() {
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



function renderSongContainer(length, title, artist, songURL, song) {
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
async function playContent() {
    console.log('Played Content')
}

async function followContent() {
    console.log('followed the content!')
}

async function openSongMenu() {
    console.log(`opened song menu`)
}

async function addPlaylistContent() {
    console.log(`added to playlist`)
}

async function playSong() {
    const songUrl = this.id
    const songName = getSongName(songUrl)
    if (player) {
        player.pause()
    }
    try {

        const res = await fetch('http//:localhost8080/')

    } catch (e) {
        console.error(e)
    }

    // stop current song if there is one playing

    // left side footer
    const footerAlbumArt = document.querySelector('.footer__album-art')
    const footerSongName = document.querySelector('.footer__song-name')
    const footerAlbumName = document.querySelector('.footer__song-artist-album')

    // middle footer
    const footerShuffle = document.getElementById('shuffle')
    const footerBackward = document.getElementById('backward')
    const footerPlay = document.getElementById('footer__play-song')
    const footerPause = document.getElementById('footer__pause-song')
    const footerForward = document.getElementById('forward')
    const footerRedo = document.getElementById('redo')

    // set src of this song and play it
    player.setAttribute('src', songUrl)
    player.play();

    footerPlay.classList.add('footer__play-song--hidden')
    footerPause.classList.remove('footer__pause-song--hidden')

    footerSongName.innerHTML = songName

    //  REDO SONG BUTTON
    // footerRedo.addEventListener('click', event => {
    //     footerRedo.classList.toggle('footer__button--selected')
    //     if (!footerRedo.classList.contains('footer__button--selected')) {
    //         player.addEventListener('ended', function () {
    //             this.play();
    //         }, false);
    //     }
    // })


    // footer set up and controls
    player.addEventListener("canplay", function () {
        $("#footer__song-length").text(secondsToMMSS(Math.floor(player.duration)));
    });

    player.addEventListener("timeupdate", function () {
        $("#song_start").text(secondsToMMSS(Math.floor(player.currentTime)));
        const currentTime = player.currentTime;
        const duration = player.duration;
        $('.footer__progress-bar--playing').stop(true, true).animate({ 'width': (currentTime + .25) / duration * 100 + '%' }, 250, 'linear');
    });

    footerPlay.addEventListener('click', e => {
        player.play();
        footerPlay.classList.add('footer__play-song--hidden')
        footerPause.classList.remove('footer__pause-song--hidden')
        console.log(`hidden~`)
    });

    footerPause.addEventListener('click', e => {
        player.pause();
        footerPlay.classList.remove('footer__play-song--hidden')
        footerPause.classList.add('footer__pause-song--hidden')
        console.log(`hidden~`)
    });


    footerBackward.addEventListener('click', e => {
        player.currentTime = 0;
    })



}


function secondsToMMSS(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}


function getSongName(songUrl) {
    const parts = songUrl.split('/')
    const songName = parts[parts.length - 1].split('.')[0]
    return songName.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
}
