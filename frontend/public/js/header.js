window.addEventListener("DOMContentLoaded", event => {
    const buttonIcon = document.querySelector(".header__user-buttons");
    const logoutMenu = document.querySelector(".header-logout");


    buttonIcon.addEventListener("click", event => {
        logoutMenu.classList.toggle("pref--hidden");
    })

    const backButton = document.querySelector('.header__leftArrow')
    backButton.addEventListener('click', e => {
        window.history.back();
    })

    const forwardButton = document.querySelector('.header__rightArrow')
    forwardButton.addEventListener('click', e => {
        window.history.forward();
    })


    const searchButton = document.querySelector('.left-nav__search-button')
    searchButton.addEventListener('click', e => {
        const url = `/#/search`
        window.history.pushState('search', 'Title', url)

        // window.addEventListener("hashchange", toggleSearchBar, false)
    })

})

// #/browse/artists
let toggleSearchBar = (event) => {
    console.log(`hashchange`)
    const url = "#/search"
}

function searchBarStatus() {
    const searchBar = document.querySelector(".header__search-bar")
    if (window.location.href.endsWith('/search')) {
        searchBar.classList.remove("search--hidden")
    } else {
        searchBar.classList.add('search--hidden')
    }
}
