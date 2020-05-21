document.addEventListener("DOMContentLoaded", () => {
    // playlist/:id
    // href="/playlist/1"
    const playlists = document.querySelectorAll('.left-nav__playlist-link');
    playlists.forEach((playlist) => {
        playlist.addEventListener('click', async (e) => {
            //e.preventDefault();
            //const link = window.location.href
            // try {
            //     const userId = localStorage.getItem("SOUNDIFY_CURRENT_USER_ID");
            //     const res = await fetch(`http://localhost:8080/playlist/${playlistId}`,
            //         {
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "Authorization": `Bearer ${localStorage.getItem("SOUNDIFY_ACCESS_TOKEN")}`
            //             }

            //         })
            //     if (!res.ok) {
            //         throw res
            //     }
            //     const { playlist } = await res.json();


            // } catch (e) {

            // }
        })
    })

})
