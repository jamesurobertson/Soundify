window.addEventListener('DOMContentLoaded', e => {

    const volumeControl = document.querySelector('.footer__volume-control')
    console.log('hello?')
    console.log(volumeControl)
    volumeControl.addEventListener('input', e => {
        const value = volumeControl.value
        player.
    })
})

const player = document.createElement("audio")

async function playContent() {
    console.log('Played Content')
}

async function addPlaylistContent() {
    console.log(`added to playlist`)
}

async function playSong() {
    // stop current song if there is one playing
    if (player) {
        player.pause()
    }
    const songUrl = this.id

    const songInfo = await getSongInfo(songUrl)
    console.log(`SONG INFO`, songInfo)
    const { song: { title: songName, Album: { imageURL: albumImage,
        title: albumName }, Album: { Artist: { name: artistName } } } } = songInfo


    // renderPlayBar()
    // left side footer
    const footerAlbumArt = document.querySelector('.footer__album-art')
    const albumArt = document.createElement('img')
    albumArt.classList.add('footer__album-art')
    albumArt.setAttribute('src', albumImage)
    footerAlbumArt.innerHTML = ''
    footerAlbumArt.appendChild(albumArt)

    const footerSongName = document.querySelector('.footer__song-name').innerHTML = songName
    const footerAlbumName = document.querySelector('.footer__song-artist-album').innerHTML = albumName

    // middle footer
    const footerPlayBar = document.querySelector('.footer__progress-bar')
    const nowPlayingBar = document.querySelector('.footer__progress-bar-playing')
    const footerShuffle = document.getElementById('shuffle')
    const footerBackward = document.getElementById('backward')
    const footerPlay = document.getElementById('footer__play-song')
    const footerPause = document.getElementById('footer__pause-song')
    const footerForward = document.getElementById('forward')
    const footerRedo = document.getElementById('redo')

    //end footer
    const volumeControl = document.querySelector('.footer__volume-control')

    // set src of this song and play it
    player.setAttribute('src', songUrl)
    player.play();

    footerPlay.classList.add('footer__play-song--hidden')
    footerPause.classList.remove('footer__pause-song--hidden')

    footerSongName.innerHTML = songName

    player.addEventListener("canplay", function () {
        $("#footer__song-length").text(secondsToMMSS(Math.floor(player.duration)));
        renderPlayBar(Math.ceil(player.duration))
    });
    //  REDO SONG BUTTON
    // time length is set once audio can play.
    // footerRedo.addEventListener('click', event => {
    //     footerRedo.classList.toggle('footer__button--selected')
    //     if (!footerRedo.classList.contains('footer__button--selected')) {
    //         player.addEventListener('ended', function () {
    //             this.play();
    //         }, false);
    //     }
    // })



    // Time left updating
    player.addEventListener("timeupdate", function () {
        const footerPlayBar = document.querySelector('.footer__progress-bar')
        const nowPlayingBar = document.querySelector('.footer__progress-bar-playing')

        $("#song_start").text(secondsToMMSS(Math.floor(player.currentTime)));
        const currentTime = player.currentTime;
        const duration = player.duration;
        const timePlayed = (currentTime) / duration
        footerPlayBar.value = currentTime
        // 'width': (currentTime / duration) * 100 / 635 + '%' 
        const currentPosition = (currentTime * (window.innerWidth * .38) * .875) / duration
        nowPlayingBar.style.width = `${currentPosition}px`
    });

    //play
    footerPlay.addEventListener('click', e => {
        player.play();
        footerPlay.classList.add('footer__play-song--hidden')
        footerPause.classList.remove('footer__pause-song--hidden')
    });

    //pause
    footerPause.addEventListener('click', e => {
        player.pause();
        footerPlay.classList.remove('footer__play-song--hidden')
        footerPause.classList.add('footer__pause-song--hidden')
    });

    //backward
    footerBackward.addEventListener('click', e => {
        player.currentTime = 0;
    })

}


function secondsToMMSS(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}


function renderPlayBar(songLength) {
    const playBarContainer = document.querySelector('.footer__progress-bar-container')
    const progressBar = document.createElement('input')
    progressBar.setAttribute('type', 'range')
    progressBar.setAttribute('max', songLength)
    progressBar.setAttribute('min', '0')
    progressBar.setAttribute('step', '1')
    progressBar.setAttribute('value', '0')
    progressBar.classList.add('footer__progress-bar')

    const playedPortion = document.createElement('div')
    playedPortion.classList.add('footer__progress-bar-playing')

    playBarContainer.innerHTML = ''
    playBarContainer.appendChild(progressBar)
    playBarContainer.appendChild(playedPortion)
    return true
}


async function getSongInfo(songUrl) {
    try {
        const songPathEncoded = songUrl.split('/').join('%2F')
        const res = await fetch(`http://localhost:8080/album/${songPathEncoded}`,
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
