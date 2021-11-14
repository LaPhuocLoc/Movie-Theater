$(document).ready(function () {

    $(".tabs").click(function () {

        $(".tabs").removeClass("active bg-white");
        $(".tabs h5").removeClass("text-black");
        $(".tabs h5").addClass("text-white");
        $(this).children("h5").removeClass("text-white");
        $(this).children("h5").addClass("text-black");
        $(".tabs i").removeClass("text-black");
        $(".tabs i").addClass("text-white");
        $(this).children("i").removeClass("text-white");
        $(this).children("i").addClass("text-black");
        $(this).addClass("active bg-white");

        current_fs = $(".active");

        next_fs = $(this).attr('id');
        next_fs = "#" + next_fs + "1";

        $("fieldset").removeClass("show");
        $(next_fs).addClass("show");

        current_fs.animate({}, {
            step: function () {
                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({
                    'display': 'block'
                });
            }
        });
    });

});