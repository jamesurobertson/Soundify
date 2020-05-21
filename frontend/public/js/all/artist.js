document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent')
    const allArtists = document.querySelectorAll('.home-artists')

    allArtists.forEach(link => {
        link.addEventListener('click', async e => {
            try {
                const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
                const res = await fetch('http://localhost:8080/artist',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                        }
                    })
                if (!res.ok) throw res

                const { artists } = await res.json()
                const mainContentHeaderHTML = `
                <div class="main-content__container">
                    <div class="main-content__container__topbar">
                    <button class="topbar--hover home-artists">Artists</button>
                    <button class="topbar--hover home-albums">Albums</button>
                    <button class="topbar--hover home-playlists">Playlists</button>
                    </div>
                    <div class="music-content__title">Artists</div>
                </div>`
                const artistContainerHTML = artists.map(
                    ({ id, name, imageURL, artistId }) => `
                    <div class="main-content__grid">
                        <div class='music-content artist-content-card'> 
                            <div class="music-content__image">
                                <img src="${imageURL}" />
                            </div>
                            <div class="music-content__artist">
                                <div class="music-content__artist-text">${name}</div>
                            </div>
                            <div class="music-content__bio">Artist</div>
                            <button id="music-content__play-button" type="button">
                                <i class="fas fa-play-circle" id="fa-play-circle"></i>
                            </button>
                        </div
                    </div>
                `
                )
                mainContent.innerHTML = mainContentHeaderHTML + artistContainerHTML.join('')
            } catch (e) {
                console.error(e)

            }
        })
    })
})
