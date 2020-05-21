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
            return renderCard('Artist', imageURL, name)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createTopBar()
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Artists'

        mainContentContainer.appendChild(title)

        cardContainers.forEach(card => mainContentContainer.appendChild(card))

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
        console.log('do we get here?')
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
        console.log(albums)
        const cardContainers = albums.map(({ id, title, imageURL, artistId, Artist: { name } }) => {
            return renderCard('Albums', imageURL, title, name)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createTopBar()
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Albums'

        mainContentContainer.appendChild(title)

        cardContainers.forEach(card => mainContentContainer.appendChild(card))

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
        const cardContainers = playlists.map(({ id, name, User: { userName } }) => {
            return renderCard('Playlists', null, name, userName)
        })

        const mainContent = document.getElementById('mainContent')

        const mainContentContainer = document.createElement('div')
        mainContentContainer.classList.add('main-content__container')

        const topBar = createTopBar()
        mainContentContainer.appendChild(topBar)

        const title = document.createElement('div')
        title.classList.add('music-content__title')
        title.innerHTML = 'Playlists'

        mainContentContainer.appendChild(title)

        cardContainers.forEach(card => mainContentContainer.appendChild(card))

        mainContent.innerHTML = ''
        mainContent.appendChild(mainContentContainer)

        const url = `#/browse/playlists`
        window.history.pushState('playlists', 'Title', url)
    } catch (e) {
        console.error(e)
    }
}

function createTopBar() {
    const mainContentContainer = document.createElement('div')
    mainContentContainer.classList.add('main-content__container')

    const topBar = document.createElement('div')
    topBar.classList.add('main-content__container__topbar')

    const artistButton = document.createElement('button')
    artistButton.classList.add('topbar--hover', 'home-artists')
    artistButton.addEventListener('click', renderArtists, false)
    artistButton.innerHTML = 'Artist'
    topBar.appendChild(artistButton)

    const albumButton = document.createElement('button')
    albumButton.classList.add('topbar--hover', 'home-albums')
    albumButton.addEventListener('click', renderAlbums, false)
    albumButton.innerHTML = 'Albums'

    topBar.appendChild(albumButton)

    const playlistButton = document.createElement('button')
    playlistButton.classList.add('topbar--hover', 'home-playlists')
    playlistButton.addEventListener('click', renderPlaylists, false)
    playlistButton.innerHTML = 'Playlists'
    topBar.appendChild(playlistButton)

    mainContentContainer.appendChild(topBar)
    return mainContentContainer
}

function renderCard(contentType, imageURL, title, name) {
    const mainContentGrid = document.createElement('div')
    mainContentGrid.classList.add('main-content__grid')

    const contentCard = document.createElement('div')
    contentCard.classList.add('music-card', `${contentType}-content-card`)

    const contentImage = document.createElement('img')
    contentImage.setAttribute('src', imageURL)
    contentCard.appendChild(contentImage)

    const contentTypeContainer = document.createElement('div')
    contentTypeContainer.classList.add('music-content-container')

    const contentTitle = document.createElement('div')
    contentTitle.classList.add(`music-content__title-text`)
    contentTitle.innerHTML = title

    contentTypeContainer.appendChild(contentTitle)

    const type = document.createElement('div')
    type.classList.add('music-content-type')

    if (name) {
        type.innerHTML = name
    } else {
        type.innerHTML = 'Artist'
    }

    contentTypeContainer.appendChild(type)
    contentCard.appendChild(contentTypeContainer)
    mainContentGrid.appendChild(contentCard)
    return mainContentGrid

}
