$(document).ready(function ($) {

    window.onscroll = function () {
        if (window.pageYOffset > 140) {
            $('#header').addClass('active')
        } else {
            $('#header').removeClass('active')
        }

    }
});

function projeto_view() {
    window.location.href = "projeto-view.html"
}
