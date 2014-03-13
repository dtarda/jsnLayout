jsnlayout.leftmenu = (function($, undefined) {
    "use strict";

    var init = function() {

        var $menu = $('#menu-wrapper #menu-container'),
            $background = $('#menu-wrapper #menu-background'),
            isMenuOpened = false;

        $('header').tap(function() {
            if(!isMenuOpened) {
                showMenu();
            } else {
                hideMenu($('#menu-container').width());
            }
        });
        
        var boxleft, // left position of moving box
            startx, // starting x coordinate of touch point
            dist = 0, // distance traveled by touch point
            touchobj = null // Touch object holder

        var menuWidth = $menu.width();
        $menu.css('-webkit-transform', 'translate3d(-' + (menuWidth - 10) + 'px, 0, 0)');
        $menu.css('opacity', '0');
         
        //Binding touch events
        $menu.on('touchstart', function(e) {
            $menu.css('opacity', '1');
            touchobj = e.changedTouches[0]          // reference first touch point
            boxleft = _getLeftPosition($menu)     // get left position of box
            startx = parseInt(touchobj.clientX)     // get x coord of touch point
            e.preventDefault()                      // prevent default click behavior
        })
         
        $menu.on('touchmove', function(e) {
            $background.show();

            touchobj = e.changedTouches[0] // reference first touch point for this event
            var dist = parseInt(touchobj.clientX) - startx // calculate dist traveled by touch point

            // move box according to starting pos plus dist
            var move = (boxleft + dist > 0) ? 0 : (boxleft + dist < -$menu.width()) ? -$menu.width() : boxleft + dist;
            $menu.css('-webkit-transform',  'translate3d(' + (move) + 'px, 0, 0)');

            var bgOpacity = (1 + (move / $menu.width())) * jsnlayout.params.maxBgOpacity;
            $background.css('opacity', bgOpacity);

            e.preventDefault()
        })

        $menu.on('touchend', function(e) {
            if(_getLeftPosition($menu) > -$menu.width() / 2) {
                showMenu();
            } else {
                hideMenu(menuWidth);
            }
        });

        var showMenu = function() {
            $menu.css('opacity', '1');
            $menu.anim({translate3d: '0px,0,0'}, jsnlayout.params.speed, jsnlayout.params.easing);
            $background.show();
            $background.anim({opacity: jsnlayout.params.maxBgOpacity}, jsnlayout.params.speed, jsnlayout.params.easing);
            isMenuOpened = true;
            $('#open-menu').anim({translate3d: '-15px,0,0'}, jsnlayout.params.speed, jsnlayout.params.easing);
        }

        var hideMenu = function(width) {
            $menu.anim({translate3d: -(width) + 'px,0,0'}, jsnlayout.params.speed, jsnlayout.params.easing, function(){
                $menu.css('opacity', '0');
                $menu.css('-webkit-transform', 'translate3d(-' + (menuWidth - 10) + 'px, 0, 0)');
            });
            $background.anim({opacity: 0}, jsnlayout.params.speed, jsnlayout.params.easing, function(){
                $background.hide();
            });
            isMenuOpened = false;
            $('#open-menu').anim({translate3d: '-10px,0,0'}, jsnlayout.params.speed, jsnlayout.params.easing);
        }

        var _getLeftPosition = function($menu) {
            var results = $menu.css('-webkit-transform');
            var start = results.indexOf('(') + 1,
                end = results.indexOf(',');
            return parseInt(results.substring(start, end));
        }
    }

    return {
    	init: init
    }

})(Zepto);