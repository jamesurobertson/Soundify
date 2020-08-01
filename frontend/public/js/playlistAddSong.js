import { renderCard } from './home.js'

export async function playlistAddSong() {
    const addSongModal = document.querySelector('.playlistAddSong')
    const userId = localStorage.getItem('SOUNDIFY_CURRENT_USER_ID')
    const songId = this.id.split('-')[1]

    const usersPlaylists = await getAllPlaylists(userId)

    const playlistContainer = document.createElement('div')
    playlistContainer.classList.add('all-users-playlists')

    usersPlaylists.playlists.forEach(playlist => {
        const { id, name, imageURL } = playlist
        playlistContainer.appendChild(renderCard('playlist', imageURL, name, id, null, songId))
    })

    addSongModal.innerHTML = ''
    addSongModal.appendChild(playlistContainer)
    document.querySelector('.playlistAddSong')
        .classList.remove('playlistAddSong--hidden')

}


export async function getAllPlaylists(userId) {

    try {
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


export async function addSong() {
    const playlistId = this.id.split('-')[1]
    const songId = this.classList[2].split('-')[1]

    try {
        const res = await fetch(`http://localhost:8080/playlist/${playlistId}/song/${songId}`,
            {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
                }
            })

        if (!res.ok) throw res

    } catch (e) {
        console.error(e)
    }

    const playListSong = document.querySelector('.playlistAddSong')
    playListSong.classList.add('playlistAddSong--hidden')

}
