document.addEventListener('DOMContentLoaded', e => {

    const cancelPlaylist = document.querySelector('.createPlaylist-button-cancel')
    const createPlaylist = document.querySelector('.createPlaylist-button-create')

    createPlaylist.addEventListener("click", async (e) => {
        e.preventDefault();
        const form = document.querySelector('.create-playlist-form');
        const formData = new FormData(form);
        const name = formData.get("name");
        const body = { name };

        try {
            const res = await fetch("http://localhost:8080/playlist",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",

                    }
                })
            if (!res.ok) {
                throw res
            }
            document.querySelector('.createPlaylistScreen')
                .classList.add('createPlaylistScreen--hidden')
            document.querySelector('.left-nav__createPlaylist-input')
                .value = ''
        } catch (err) {
            //Create HTML rendered errors
        }
    })

    cancelPlaylist.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.createPlaylistScreen')
            .classList.add('createPlaylistScreen--hidden')
        document.querySelector('.left-nav__createPlaylist-input')
            .value = ''
    })


})
