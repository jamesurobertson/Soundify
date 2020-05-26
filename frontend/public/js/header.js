window.addEventListener("DOMContentLoaded", event => {
    const buttonIcon = document.querySelector(".header__user-buttons");
    const logoutMenu = document.querySelector(".header-logout");


    buttonIcon.addEventListener("click", event => {
        logoutMenu.classList.toggle("pref--hidden");
    })

    // const searchButton = document.querySelector('.left-nav__search-button')
    // searchButton.addEventListener('click', e => {
    //     const url = `/#/search`
    //     window.history.pushState('search', 'Title', url)
    // })

})
