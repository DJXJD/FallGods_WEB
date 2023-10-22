$(() => {
    var links = $('a');

    links.on('click', function(e) {
        e.preventDefault();
        
        var linkPos = $(this).offset();

        setTimeout(function() {
        $('body').addClass('fall-enter-active');
        	setTimeout(function() {
           		window.location.href = $(e.target).attr('href');
        	}, 500);
    	}, 50);

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
    /*const $button = $('.fallGuysBtnView');
    $button.on('click', function(e) {
        e.preventDefault();
        $(this).addClass('button-poof');
        setTimeout(() => {
            $(this).removeClass('button-poof').hide();
		}, 1);
    });*/
    

});