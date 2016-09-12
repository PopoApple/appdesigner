var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
    hasTouch = 'ontouchstart' in window && !isTouchPad;
if(hasTouch){
	document.body.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, false);
}