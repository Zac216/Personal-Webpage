$(document).ready(function () {
    


    




    //////////////////////////////////////////////////////////// initializing variables and listeners
    var isOnEngineering = false;
    $('#engineeringProjects').mouseenter(function () {
            engineeringFlag = true;
    });
    $('#engineeringProjects').mouseleave(function () {
            engineeringFlag = false;
    });
    var isOnProgramming = false;
    $('#programmingProjects').mouseenter(function () {
            programmingFlag = true;
    });
    $('#programmingProjects').mouseleave(function () {
            programmingFlag = false;
    });


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
    var pageHeight = $(document).height();
    var pageWidth = $(document).width();
    var windowHeight = $(window).height();
    var lastIsOnEngineering = false;
    var lastIsOnProgramming = false;
    var percentPageDown = 0;

    var engineeringFlag = false;
    var programmingFlag = false;

    $(window).scroll(function () {

        var st = $(this).scrollTop();
        percentPageDown = st / (pageHeight - windowHeight) * 100;


        if (percentPageDown < 1) {
            $('#engineeringProjects').width("50%")
            $('#programmingProjects').width("50%")
            $('#programmingProjects').children().width(pageWidth / 2 - pageWidth * .01);
            $('#engineeringProjects').children().width(pageWidth / 2 - pageWidth * .01);
            return;
        }


        if (percentPageDown < 8) {
            isOnEngineering = engineeringFlag;
            isOnProgramming = programmingFlag;
        }
        

        console.log("engineering=" + isOnEngineering + ", programming" + isOnProgramming + ", %=" + percentPageDown);


        /////////////// on engineering
        if (isOnEngineering && percentPageDown < 50) {
            //console.log((pageWidth / 2) - percentPageDown * 2 / 100 * (pageWidth / 2) )
            

            $('#programmingProjects').width(50 - percentPageDown + "%");
            $('#programmingProjects').children().width((pageWidth / 2) - percentPageDown * 2 / 100 * (pageWidth / 2) - pageWidth * .01);

            $('#engineeringProjects').children().width((pageWidth / 2) - pageWidth * .01);
            $('#engineeringProjects').width(percentPageDown + 50 + "%");
        }
        else if (isOnEngineering && percentPageDown >= 50) {
            $('#programmingProjects').children().width(0);
            $('#programmingProjects').width("0px");
            $('#engineeringProjects').width("100%");
            return;
        }

        ///////////// on programming
        if (isOnProgramming && percentPageDown < 50) {
            $('#engineeringProjects').width(50 - percentPageDown + "%");
            $('#engineeringProjects').children().width((pageWidth / 2) - percentPageDown * 2 / 100 * (pageWidth / 2) - pageWidth * .01);

            $('#programmingProjects').children().width((pageWidth / 2) - pageWidth * .01);
            $('#programmingProjects').width(percentPageDown + 50 + "%");
        }
        else if (isOnProgramming && percentPageDown >= 50) {
            $('#engineeringProjects').children().width(0);
            $('#engineeringProjects').width("0px");
            $('#programmingProjects').width("100%");
            return;
        }


    });










});


