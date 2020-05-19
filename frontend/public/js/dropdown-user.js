window.addEventListener("DOMContentLoaded", event => {
    const gearIcon = document.getElementById("header__user-buttons--dropdown");
    const settingsMenu = document.querySelector(".pref");
    const searchIcon = document.getElementById("search-icon");
    const searchTool = document.querySelector(".masthead__search-tool")

    gearIcon.addEventListener("click", event => {
        settingsMenu.classList.remove("pref--hidden");
    })
    searchIcon.addEventListener("click", event => {
        searchTool.classList.toggle("masthead__search-tool--hidden");
    })
})
