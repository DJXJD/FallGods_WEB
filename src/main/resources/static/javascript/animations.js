$(() => {
    var links = $('a');

    links.on('click', function(e) {
        e.preventDefault();
        
        var linkPos = $(this).offset();

        $('body').addClass('fall-enter-active');

        setTimeout(function() {
            window.location.href = $(e.target).attr('href');
        }, 500);




        for (let i = 0; i < 10; i++) {
            setTimeout(function() {
                let streak = $('<div class="streak"></div>').appendTo('body');
                let startPos = linkPos.top;
                let randomX = linkPos.left + (Math.random() * 50 - 25);

                streak.css({
                    top: startPos,
                    left: randomX
                });

                streak.fadeIn(100).animate({
                    top: startPos - 100,
                    opacity: 0
                }, 700, function() {
                    $(this).remove();
                });
            }, i * 1); 
        }
    });
});