jsnlayout.bootstrap = (function($, undefined) {
    "use strict";

    var init = function() {

    	//Adding leftMenu functionallity
    	jsnlayout.leftmenu.init();
	    jsnlayout.hscroll.init();
    }

    return {
    	init: init
    }

})(Zepto);