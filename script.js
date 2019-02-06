$(document).ready(function () {

    //////////////////////////////////////////////////////////// initializing variables and listeners
    var isOnEngineering = false;
    $('#engineeringProjects').mouseenter(function () { isOnEngineering = true; });
    $('#engineeringProjects').mouseleave(function () { isOnEngineering = false; });
    var isOnProgramming = false;
    $('#programmingProjects').mouseenter(function () { isOnProgramming = true; });
    $('#programmingProjects').mouseleave(function () { isOnProgramming = false; });



    ///////////////////////////////////////////////////////////////Fade out and transition to the clicked page
    $('a').click(function () { 

        event.preventDefault();
        newLocation = this.href;
        if (newLocation != $(location).attr("href")) {
            $('#body2').fadeOut(500, function () {
                window.location = newLocation;
            });
        }
    });


  


   
    ///////////////////////////////////////////////////////////////////////// window is being scrolled
    var scrolled = 0;
    var pageHeight = $(document).height();
    var windowHeight = $(window).height();
    $(window).scroll(function () {

        var st = $(this).scrollTop();
        var percentPageDown = st / (pageHeight - windowHeight) * 100;



        if (percentPageDown < 1) {
            $('#engineeringProjects').css({ "-webkit-transform": "translate(0px, 0px)" });
            $('#programmingProjects').css({ "-webkit-transform": "translate(0px, 0px)" });
            $('#engineeringProjects').fadeTo(0, 1);
            $('#programmingProjects').fadeTo(0, 1);
            return;
        }

        /////////////// on engineering
        if (isOnEngineering && percentPageDown < 50 && percentPageDown > 0) {
            $('#engineeringProjects').css({ "-webkit-transform": "translate(" + percentPageDown + "%, 0px)" });
            $('#programmingProjects').css({ "-webkit-transform": "translate(" + percentPageDown + "%, 0px)" });
            $('#programmingProjects').fadeTo(0, 1 - percentPageDown / 100);
        }
        else if (isOnEngineering && percentPageDown >= 50) {
            $('#engineeringProjects').css({ "-webkit-transform": "translate(50%, 0px)" });
            $('#programmingProjects').css({ "-webkit-transform": "translate(50%, 0px)" });
            $('#engineeringProjects').fadeTo(0, 1);
            $('#programmingProjects').fadeTo(0, 0);
            return;
        }

        ///////////// on programming
        if (isOnProgramming && percentPageDown < 50 && percentPageDown > 0) {
            $('#programmingProjects').css({ "-webkit-transform": "translate(" + -1 * percentPageDown + "%, 0px)" });
            $('#engineeringProjects').css({ "-webkit-transform": "translate(" + -1 * percentPageDown + "%, 0px)" });
            $('#engineeringProjects').fadeTo(0, 1 - percentPageDown / 100);
        }
        else if (isOnProgramming && percentPageDown >= 50) {
            $('#programmingProjects').css({ "-webkit-transform": "translate(-50%, 0px)" });
            $('#engineeringProjects').css({ "-webkit-transform": "translate(-50%, 0px)" });
            $('#programmingProjects').fadeTo(0, 1);
            $('#engineeringProjects').fadeTo(0, 0);
            return;
        }


    });










});


