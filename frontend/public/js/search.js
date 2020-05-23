
function renderSearch() {

    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    searchContainer.appendChild(searchBox);
    searchContainer.appendChild(searchBoxEmpty);
    searchContainer.appendChild(searchContentFound);

    const searchBox = document.createElement('div');
    searchBox.classList.add('search-box');
    searchBox.appendChild(searchBoxInput);

    const searchBoxInput = document.createElement('div');
    searchBoxInput.classList.add('id', 'search-box-input');
    searchBoxInput.appendChild(searchInputId);

    const searchInputId = document.createElement('id');
    searchInputId.classList.setAttribute('id', 'search-input');

    const searchContentEmpty = document.createElement('div');
    searchContentEmpty.classList.add('search-content-empty');

    const searchContentFound = document.createElement('div');
    searchContentFound.classList.add('search-content-found');

    return searchContainer;
}


// .search - container
//     .search - box
//         .search - box - input
//             input#search - input(type = "text" placeholder = "Search for music content...")
//     .search - content - empty
//     .search - content - found
