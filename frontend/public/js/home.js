
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

    contentCard.addEventListener('click', gotoContent, false)
    return contentCard
}

function gotoContent() {
    const contentType = this.classList[1].slice(0, this.classList[1].length - 5)
    const contentId = this.id.split('-')[1]








    const url = `#/${contentType}/${contentId}`
    window.history.pushState('id', 'Title', url)

}
