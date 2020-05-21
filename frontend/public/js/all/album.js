document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent')
    const allAlbums = document.querySelectorAll('.home-albums')
    console.log(allAlbums)
    allAlbums.forEach(link => {
        link.addEventListener('click', async e => {
            try {
                const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
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
                const mainContentHeaderHTML = `
                <div class="main-content__container">
                    <div class="main-content__container__topbar">
                        <button class="topbar--hover home-artists">Artists</button>
                        <button class="topbar--hover home-albums">Albums</button>
                        <button class="topbar--hover home-playlists">Playlists</button>
                    </div>
                    <div class="music-content__title">Albums</div>
                </div>`
                const albumContainerHTML = albums.map(
                    ({ id, title, imageURL, artistId, Artist: { name } }) => `
                    <div class="main-content__grid">
                        <div class='music-content artist-content-card'> 
                            <div class="music-content__image">
                                <img src="${imageURL}" />
                            </div>
                            <div class="music-content__artist">
                                <div class="music-content__artist-text">${title}</div>
                            </div>
                            <div class="music-content__bio">${name}</div>
                            <button id="music-content__play-button" type="button">
                                <i class="fas fa-play-circle" id="fa-play-circle"></i>
                            </button>
                        </div
                    </div>
                `
                )
                mainContent.innerHTML = mainContentHeaderHTML + albumContainerHTML.join('')
            } catch (e) {
                console.error(e)
            }
        })
    })
})
