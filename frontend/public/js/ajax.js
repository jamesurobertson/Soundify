let newHash = ''
const $mainContent = $('#mainContent');

$('body').delegate('a', 'click', function () {
    window.location.hash = $(this).attr('href');
    return false;
});

// Not all browsers support hashchange
// For older browser support: http://benalman.com/projects/jquery-hashchange-plugin/
$(window).bind('hashchange', function () {
    newHash = window.location.hash.substr(1);
    $mainContent.load(newHash + " #mainContent > *");
});
