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
        const res = await fetch("http://localhost:8080/browse")
        // {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem('SOUNDIFY_ACCESS_TOKEN')}`
        //     }
        // }
        const { albums } = await res.json();
        console.log(albums);

        // if (res.status === 401) {
        //     // window.location.href = "/login"
        // }
    } catch (e) {
        console.error(e);

    }



    // try {
    //     const res = await fetch("http://localhost:8080/user/1") //Retrieve from localstorage token
    //     const { playlists } = await res.json()
    //     console.log(playlists)
    // const playlistContainer = document.querySelector('.left-nav__playlists-container')
    // const playlistHTML = playlists.map(
    //     ({ name, id }) => `
    //     <div class='left-nav__playlist-link'>
    //         <a href='playlist/${parseInt(id)}'>
    //             ${name}
    //         </a>
    //     </div >
    //     `
    // )
    // playlistContainer.innerHTML = playlistHTML.join('')
    //     } catch (e) {
    //     console.error(e)
    // }

    const playButton = document.querySelector('.fa-play-circle')
    playButton.addEventListener('click', e => {
        console.log(e.currentTarget)
        const audio = new Audio('https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/eddy/2_Damn_Loud/eddy_-_03_-_All_The_Way_Up.mp3')
        audio.play()
    })

    document.querySelector('.createPlaylist-button')
        .addEventListener('click', e => {
            const createPlaylistScreen = document.querySelector('.createPlaylistScreen')

            createPlaylistScreen.classList.toggle('createPlaylistScreen--hidden')

        })


})
