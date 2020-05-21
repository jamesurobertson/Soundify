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

    const playButton = document.querySelector('.fa-play-circle')
    playButton.addEventListener('click', e => {
        const audio = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/eddy/2_Damn_Loud/eddy_-_03_-_All_The_Way_Up.mp3')
        audio.play()
    })

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
        const playlistHTML = playlists.map(
            ({ name, id }) => `
            <div class='left-nav__playlist-link-container'>
                <button class='left-nav__playlist-link' id='playlist-link-${id}'>
                    ${name}
                </button>
            </div >
               `
        )
        playlistContainer.innerHTML = playlistHTML.join('')
    } catch (e) {
        console.error(e)
    }

    const allAlbums = document.querySelectorAll('.home-albums')
    allAlbums.forEach(link => {
        link.addEventListener('click', async (e) => {
            renderAlbums()
        })
    })
    // const playlists = document.querySelectorAll('.left-nav__playlist-link');
    // playlists.forEach((playlist) => {
    //     playlist.addEventListener('click', async (e) => {
    //         e.preventDefault();
    //         const playlistId =
    //         try {
    //             const userId = localStorage.getItem("SOUNDIFY_CURRENT_USER_ID");
    //             const res = await fetch(`http://localhost:8080/playlist/${playlistId}`,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
    //                     }

    //                 })
    //             if (!res.ok) {
    //                 throw res
    //             }
    //             const { playlist } = await res.json();


    //         } catch (e) {

    //         }
    //         })
    //         href='/playlist/${parseInt(id)}'
    //     })
    // })
})
