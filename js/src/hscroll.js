jsnlayout.hscroll = (function($, undefined) {
    "use strict";

    var offset = 0,
        maxPage, myScroll;

    var init = function() {

        //Moving divs to correct position
        var i = 0;
        $('.vscrollable').each(function() {
            $(this).css('margin-left', (i * 100) + '%');
            $(this).attr('id', 'vscrollable' + i);
            _iScrollStart($('.vscrollable')[i].id);
            i++;
        });

        maxPage = $('.vscrollable').length - 1;

        $('#main-wrapper').swipeRight(function() {
            gotoPage(offset - 1);
        }).swipeLeft(function() {
            gotoPage(offset + 1);
        })
    }

    var gotoPage = function(pageNumber) {

        if(pageNumber == offset || pageNumber < 0 || pageNumber > maxPage)
            return;

        $('#main-wrapper .vscrollable').anim({translate3d: -(pageNumber * 100) + '%,0,0'}, jsnlayout.params.speed, jsnlayout.params.easing);
        offset = pageNumber;
    }

    var _iScrollStart = function(id) {
        //Adding iScroll4
        myScroll = new iScroll(id, {
            lockDirection: 'y',
            hScroll: false,
            vScrollbar: false,
            bounce: false,
            hideScrollbar: true,
        });
    }

    return {
    	init: init,
        gotoPage: gotoPage
    }

})(Zepto);