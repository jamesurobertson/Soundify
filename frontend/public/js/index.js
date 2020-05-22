window.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('.left-nav__link-container')
        .forEach(link => {
            link.addEventListener('click', e => {
                document.querySelector('.left-nav__link-container--active')
                    .classList.remove('left-nav__link-container--active')
                e.currentTarget.classList.add('left-nav__link-container--active')
            })
        })
    try {
        const res = await fetch("http://localhost:8080/#/browse",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('SOUNDIFY_ACCESS_TOKEN')}`
                }
            })
        const { albums } = await res.json();

        if (res.status === 401) {
            window.location.href = "/log-in"
        }
    } catch (e) {
        console.error(e);

    }


    document.querySelector('.createPlaylist-button')
        .addEventListener('click', e => {
            const createPlaylistScreen = document.querySelector('.createPlaylistScreen')

            createPlaylistScreen.classList.toggle('createPlaylistScreen--hidden')

        })

    try {
        const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
        const res = await fetch(`http://localhost:8080/user/${userId}/playlist`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })
        if (!res.ok) {
            throw res
        }

        const { playlists } = await res.json()
        const playlistContainer = document.querySelector('.left-nav__playlists-container')
        playlists.forEach(({ name, id }) => {

            const playlistLinkContainer = document.createElement('div')
            playlistLinkContainer.classList.add('left-nav__playlist-link-container')

            const playlistButton = document.createElement('button')
            playlistButton.innerHTML = name
            playlistButton.classList.add('left-nav__playlist-link')

            playlistButton.setAttribute('id', `playlistId-${id}`)
            playlistButton.addEventListener('click', renderContent, false)
            playlistLinkContainer.appendChild(playlistButton)

            playlistContainer.appendChild(playlistLinkContainer)
        })
    } catch (e) {
        console.error(e)
    }
})
