
window.addEventListener('DOMContentLoaded', e => {

    const volumeControl = document.querySelector('.footer__volume-control')
    volumeControl.addEventListener('input', e => {
        const value = volumeControl.value
        player.volume = value / 100;
        volumeControl.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
    })
})

const player = document.createElement("audio")

async function playContent() {
    console.log('Played Content')
}


async function playSong() {

    // stop current song if there is one playing
    if (player) {
        player.pause()
    }

    // the player and playhead
    const footerPlayBar = document.querySelector('.footer__progress-bar')
    const footerPlayBarPlayhead = document.querySelector('.footer__progress-bar-playhead')

    // player buttons TODO: move out of playSong?
    const footerPlay = document.getElementById('footer__play-song')
    const footerPause = document.getElementById('footer__pause-song')
    const footerBackward = document.getElementById('backward')
    const footerForward = document.getElementById('forward')
    const footerShuffle = document.getElementById('shuffle')
    const footerRedo = document.getElementById('redo')

    const volumeControl = document.querySelector('.footer__volume-control')

    const songUrl = this.id
    renderFooterInfo(songUrl)

    // set src of 'this' song and play it
    player.setAttribute('src', songUrl)
    player.play();

    // audio only updates after playhead has been released.
    //variable to keep track of playhead status
    let onPlayHead = false;


    // variables for player
    const footerPlayBarWidth = footerPlayBar.offsetWidth - footerPlayBarPlayhead.offsetWidth;

    // set play button to 'pause' upon starting a song play
    footerPlay.classList.add('footer__play-song--hidden')
    footerPause.classList.remove('footer__pause-song--hidden')

    // songs are played at value of volume control bar
    volumeControl.value = player.volume * 100

    // makes playbar clickable
    footerPlayBar.addEventListener('click', e => {
        const duration = player.duration
        movePlayHead(e)
        player.currentTime = duration * clickPercent(e)
    }, false);

    function clickPercent(event) {
        return (event.clientX - getPosition(footerPlayBar)) / footerPlayBarWidth;
    }

    function movePlayHead(event) {
        var newMargLeft = event.clientX - getPosition(footerPlayBar);

        if (newMargLeft >= 0 && newMargLeft <= footerPlayBarWidth) {
            footerPlayBarPlayhead.style.marginLeft = newMargLeft + "px";
        }
        if (newMargLeft < 0) {
            footerPlayBarPlayhead.style.marginLeft = "0px";
        }
        if (newMargLeft > footerPlayBarWidth) {
            footerPlayBarPlayhead.style.marginLeft = footerPlayBarWidth
                + "px";
        }
    }

    function getPosition(el) {
        return el.getBoundingClientRect().left;
    }
    // makes playhead draggable
    footerPlayBarPlayhead.addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

    function mouseDown() {
        onPlayHead = true;
        window.addEventListener('mousemove', movePlayHead, true)
        player.removeEventListener('timeupdate', timeUpdate, false)
    }

    function mouseUp(event) {
        if (onPlayHead == true) {
            movePlayHead(event);
            window.removeEventListener('mousemove', movePlayHead, true);
            // change current time
            player.currentTime = player.duration * clickPercent(event);
            player.addEventListener('timeupdate', timeUpdate, false);
        }
        onPlayHead = false;
    }

    function timeUpdate() {
        $("#song_start").text(secondsToMMSS(Math.floor(player.currentTime)));
        const playPercent = footerPlayBarWidth * (player.currentTime / player.duration);
        footerPlayBarPlayhead.style.marginLeft = playPercent + "px";
        if (player.currentTime === player.duration) {
            footerPlay.classList.add('footer__play-song--hidden')
            footerPause.classList.remove('footer__pause-song--hidden')
        }
    }

    player.addEventListener('timeupdate', timeUpdate, false)

    // once song can be played set the time control
    player.addEventListener("canplay", function () {
        $("#footer__song-length").text(secondsToMMSS(Math.floor(player.duration)));
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

    //forward  TODO: needs to change once playing multile songs implemented.
    // forwards needs to go to next song.
    footerForward.addEventListener('click', e => {
        player.currentTime = 0
        player.pause()
        footerPlay.classList.remove('footer__play-song--hidden')
        footerPause.classList.add('footer__pause-song--hidden')
    })

    // REDO
    footerRedo.addEventListener('click', e => {
        if (e.target.classList.contains('footer__button--selected')) {
            e.target.classList.remove('footer__button--selected')
            player.loop = false
        } else {
            e.target.classList.add('footer__button--selected')
            player.loop = true;
        }
    })

}



function secondsToMMSS(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return minutes + ':' + seconds;
}

async function renderFooterInfo(songUrl) {

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
        const { song } = await res.json()

        console.log(song)

        const { title: songName, Album: { imageURL: albumImage,
            title: albumName }, Album: { Artist: { name: artistName } } } = song


        // renderPlayBar()
        // left side footer
        const footerAlbumArt = document.querySelector('.footer__album-art')
        const albumArt = document.createElement('img')
        albumArt.classList.add('footer__album-art')
        albumArt.setAttribute('src', albumImage)
        footerAlbumArt.innerHTML = ''
        footerAlbumArt.appendChild(albumArt)

        document.querySelector('.footer__song-name').innerHTML = songName
        document.querySelector('.footer__song-artist-album').innerHTML = albumName

    } catch (e) {
        console.error(e)
    }
}
