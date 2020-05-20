document.addEventListener('DOMContentLoaded', e => {

    const form = document.getElementById('create-playlist-form');
    console.log('The form', form)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const name = formData.get("name");
        const description = formData.get("description");
        const body = { name, description };

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
            window.location.href = "/#/browse";
        } catch (err) {
            //Create HTML rendered errors
        }

    })
})
