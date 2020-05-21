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

    let toggleSearchBar = (event) => {
        console.log(event)
        const url = "localhost:4001/#/search"
        const searchBar = document.querySelector(".header__search-bar")
        if (event.newUrl !== url) {
            searchBar.classList.add("search--hidden")
        } else {
            searchBar.classList.remove("search--hidden")
        }
    }

    window.addEventListener("hashchange", toggleSearchBar, false)


})
