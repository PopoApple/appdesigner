(function () {
    // Phantom Limb
    // ------------
    // http://viewinglens.com/phantom-limb
    // https://github.com/brian-c/phantom-limb
    // brian.carstensen@gmail.com

    "use strict";
    
    var isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;
    if (hasTouch) {
        return;
    }
    
    // Default configuration
    var config = {
        style: true,
        startOnLoad: true
    };

    // Apply overrides
    for (var param in window.phantomLimbConfig) {
        config[param] = window.phantomLimbConfig[param];
    }

    // Keep track of whether the mouse is down.
    var mouseIsDown = false;

    // A Finger is a representation on the screen.
    // It keeps track of its position and the node that it's over.
    function Finger() {
        this.node = document.createElement('span');
        this.node.classList.add('_phantom-limb_finger');
        this.place();
    }

    Finger.prototype = {
        node: null,

        x: NaN,
        y: NaN,

        target: null,

        place: function () {
            document.body.appendChild(this.node);
        },

        hide: function () {
            this.node.style.display = 'none';
        },

        show: function () {
            this.node.style.display = '';
        },

        move: function (x, y) {
            if (isNaN(x) || isNaN(y)) {
                this.hide();
                this.target = null;
            } else {
                this.show();

                this.node.style.left = x + 'px';
                this.node.style.top = y + 'px';

                this.x = x;
                this.y = y;

                if (!mouseIsDown) this.target = document.elementFromPoint(x, y);
            }
        }
    };

    // We'll instantiate the fingers when we start.
    var fingers = [];

    // Create a synthetic event from a real event and a finger.
    function createMouseEvent(eventName, originalEvent, finger) {
        var e = document.createEvent('MouseEvent');

        e.initMouseEvent(eventName, true, true,
            originalEvent.view, originalEvent.detail,
            finger.x || originalEvent.screenX, finger.y || originalEvent.screenY,
            finger.x || originalEvent.clientX, finger.y || originalEvent.clientY,
            originalEvent.ctrlKey, originalEvent.shiftKey,
            originalEvent.altKey, originalEvent.metaKey,
            originalEvent.button, finger.target || originalEvent.relatedTarget
        );

        e.synthetic = true;

        // Set this so we can match shared targets later.
        e._finger = finger;

        return e;
    }

    var startDistance = NaN;
    var startAngle = NaN;

    // Given a mouse event, fire a touch event for each finger.
    // Add the appropriate touch-specific event properties.
    function fireTouchEvents(eventName, originalEvent) {
        // All touch events, including "touchend".
        var events = [];
        var gestures = [];

        // For each finger with a target, create a touch event.
        fingers.forEach(function (finger) {
            if (!finger.target) return;

            // Convert "ontouch*" properties and attributes to listeners.
            var onEventName = 'on' + eventName;

            if (onEventName in finger.target) {
                console.warn('Converting `' + onEventName + '` property to event listener.', finger.target);
                finger.target.addEventListener(eventName, finger.target[onEventName], false);
                delete finger.target[onEventName];
            }

            if (finger.target.hasAttribute(onEventName)) {
                console.warn('Converting `' + onEventName + '` attribute to event listener.', finger.target);
                var handler = new Function('event', finger.target.getAttribute(onEventName));
                finger.target.addEventListener(eventName, handler, false);
                finger.target.removeAttribute(onEventName);
            }

            // Set up a new event with the coordinates of the finger.
            var touch = createMouseEvent(eventName, originalEvent, finger);

            events.push(touch);
        });

        // Figure out scale and rotation.
        if (events.length > 1) {
            var x = events[0].pageX - events[1].pageX;
            var y = events[0].pageY - events[1].pageY;

            var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            var angle = Math.atan2(x, y) * (180 / Math.PI);

            var gestureName = 'gesturechange';

            if (eventName === 'touchstart') {
                gestureName = 'gesturestart';
                startDistance = distance;
                startAngle = angle;
            }

            if (eventName === 'touchend') gestureName = 'gestureend';

            events.forEach(function (event) {
                var gesture = createMouseEvent(gestureName, event, event._finger);
                gestures.push(gesture);
            });

            events.concat(gestures).forEach(function (event) {
                event.scale = distance / startDistance;
                event.rotation = startAngle - angle;
            });
        }

        // Loop through the events array and fill in each touch array.
        events.forEach(function (touch) {
            touch.touches = events.filter(function (e) {
                return ~e.type.indexOf('touch') && e.type !== 'touchend';
            });

            touch.changedTouches = events.filter(function (e) {
                return ~e.type.indexOf('touch') && e._finger.target === touch._finger.target;
            });

            touch.targetTouches = touch.changedTouches.filter(function (e) {
                return ~e.type.indexOf('touch') && e.type !== 'touchend';
            });
        });

        // Then fire the events.
        events.concat(gestures).forEach(function (event, i) {
            event.identifier = i;
            event._finger.target.dispatchEvent(event);
        });
    }

    // Prevent all mousedown event from doing anything.
    // We'll fire one manually at touchend.
    function phantomTouchStart(e) {
        if (e.synthetic) return;

        mouseIsDown = true;

        if (e.target.tagName && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {

        } else {
            var isSearchWidget;
            var target = e.target;
            for (; target && target !== document; target = target.parentNode) {
                if (target.classList.contains('mui-search')) {
                    isSearchWidget = true;
                    break;
                }
            }
            if (!isSearchWidget) {
                e.preventDefault();
            }
        }
        e.stopPropagation();

        fireTouchEvents('touchstart', e);
    }

    // The center between two fingers
    var centerX = NaN;
    var centerY = NaN;

    // Set each finger's position target.
    // Pressing alt engages the second finger.
    // Pressing shift locks the second finger's position relative to the first's.
    function moveFingers(e) {
        // We'll use this if the second is locked with the first.
        var changeX = e.clientX - fingers[0].x || 0;
        var changeY = e.clientY - fingers[0].y || 0;

        // The first finger just follows the mouse.
        fingers[0].move(e.clientX, e.clientY);

        // TODO: Determine modifier keys independent of mouse movement.

        if (e.altKey) {
            // Reset the center.
            if (!centerX && !centerY) {
                centerX = innerWidth / 2;
                centerY = innerHeight / 2;
            }

            // Lock the center with the first finger.
            if (e.shiftKey) {
                centerX += changeX;
                centerY += changeY;
            }

            var secondX = centerX + (centerX - e.clientX);
            var secondY = centerY + (centerY - e.clientY);

            fingers[1].move(secondX, secondY);
        } else {
            // Disengage the second finger.
            fingers[1].move(NaN, NaN);

            // Reset the center next time the alt key is held.
            centerX = NaN;
            centerY = NaN;
        }
    }

    // Prevent all mousemove events from firing.
    // We'll fire one (and only one) manually at touchend.
    var disabledArea = {};

    function phantomTouchMove(e) {
        if (e.synthetic) return;

        window.parent.blockIdx = window.blockIdx;

        var target = e.target;
        var x = e.pageX,
            y = e.pageY;
        var fingerStyle = document.querySelector('._phantom-limb_finger').style;
        if (target.classList.contains('_phantom-limb_disabled')) {
            fingerStyle.pointerEvents = 'auto';
            disabledArea.t = target.offsetTop;
            disabledArea.l = target.offsetLeft;
            disabledArea.w = target.offsetWidth;
            disabledArea.h = target.offsetHeight;
        } else {
            if (fingerStyle.pointerEvents == 'auto' && !(x >= disabledArea.l && x <= disabledArea.l + disabledArea.w && y >= disabledArea.t && y <= disabledArea.t + disabledArea.h)) {
                fingerStyle.pointerEvents = 'none';
            }
        }

        if (e.target.tagName && e.target.tagName === 'INPUT' && e.target.type == 'range') {

        } else {
            e.preventDefault();
        }
        e.stopPropagation();

        moveFingers(e);

        if (mouseIsDown) {
            fireTouchEvents('touchmove', e);
        }
    }

    // Prevent all mouseup events from firing.
    // We'll fire one manually at touchend.
    function phantomTouchEnd(e) {
        if (e.synthetic) return;

        mouseIsDown = false;

        if (e.target.tagName && e.target.tagName === 'INPUT' && e.target.type == 'range') {

        } else {
            e.preventDefault();
        }
        e.stopPropagation();

        fireTouchEvents('touchend', e);

        fingers.forEach(function (finger) {
            if (!finger.target) return;

            // Mobile Safari moves all the mouse event to fire after the touchend event.
            finger.target.dispatchEvent(createMouseEvent('mouseover', e, finger));
            finger.target.dispatchEvent(createMouseEvent('mousemove', e, finger));
            finger.target.dispatchEvent(createMouseEvent('mousedown', e, finger));

            // TODO: These two only fire if content didn't change. How can we tell?
            finger.target.dispatchEvent(createMouseEvent('mouseup', e, finger));
            finger.target.dispatchEvent(createMouseEvent('click', e, finger));
        });
    }

    // Prevent clicks. We'll handle them manually.
    function phantomClick(e) {
        if (e.synthetic || e.forwardedTouchEvent) {
            var target = e.target;
            for (; target && target !== document; target = target.parentNode) {
                if (target.tagName == 'A' && target.hash) {
                    e.preventDefault();
                    break;
                }
            }
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    // Not entirely proud of this, but I can't serve CSS from GitHub
    // and I want the bookmarklet to be as simple as possible.
    var defaultCSS = ([
  '._phantom-limb,',
  '._phantom-limb .mui-pciker-list li,',
  '._phantom-limb a,',
        '._phantom-limb label,',
        '._phantom-limb button,',
        '._phantom-limb textarea,',
        '._phantom-limb input {',
   'cursor: none !important;',
  '}',
  '._phantom-limb_finger {',
   'background: rgba(0, 0, 0, 0.5);',
   'border: 2px solid rgba(255, 255, 255,.5);',
   'border-radius: 50%;',
   'display: none;',
   'height: 24px;',
   'margin: -12px 0 0 -12px;',
   'pointer-events: none;',
   'position: fixed;',
   'width: 24px;',
   'z-index: 9999999' +
  '}',
  '._phantom-limb ._phantom-limb_finger {',
   'display: block;',
  '}',
  '._phantom-limb_disabled{',
   'opacity: .3;',
  '}'
 ]).join('\n');

    if (config.style) {
        var styleTag = document.createElement('style');
        styleTag.id = '_phantom-limb_default-style';
        styleTag.innerHTML = defaultCSS;
        document.querySelector('head').appendChild(styleTag);
    }

    // On/off switch
    function start() {
        if (fingers.length === 0) fingers.push(new Finger(), new Finger());

        document.addEventListener('mousedown', phantomTouchStart, true);
        document.addEventListener('mousemove', phantomTouchMove, true);
        document.addEventListener('mouseup', phantomTouchEnd, true);
        document.addEventListener('click', phantomClick, true);

        document.documentElement.classList.add('_phantom-limb');

        var disabledIpts = document.querySelectorAll('input[type=checkbox][disabled],input[type=radio][disabled]');
        for (var i = 0; i < disabledIpts.length; i++) {
            var input = disabledIpts[i];
            input.classList.add('_phantom-limb_disabled');
            input.removeAttribute('disabled');

            if (input.type == 'radio') {
                input.setAttribute('data-name', input.getAttribute('name'));
                input.removeAttribute('name');
            }

            var id = input.id;
            if (id) {
                var labels = document.querySelectorAll('label[for=' + id + ']');
                for (var j = 0; j < labels.length; j++) {
                    var label = labels[j];
                    label.setAttribute('data-for', id);
                    label.removeAttribute('for');
                }
            }
        }
    }

    function stop() {
        document.removeEventListener('mousedown', phantomTouchStart, true);
        document.removeEventListener('mousemove', phantomTouchMove, true);
        document.removeEventListener('mouseup', phantomTouchEnd, true);
        document.removeEventListener('click', phantomClick, true);

        document.documentElement.classList.remove('_phantom-limb');

        var disabledIpts = document.querySelectorAll('input[type=checkbox]._phantom-limb_disabled,input[type=radio]._phantom-limb_disabled');
        for (var i = 0; i < disabledIpts.length; i++) {
            var input = disabledIpts[i];
            input.classList.remove('_phantom-limb_disabled');
            input.setAttribute('disabled', 'disabled');

            if (input.type == 'radio') {
                input.setAttribute('name', input.getAttribute('data-name'));
                input.removeAttribute('data-name');
            }
        }
        var labels = document.querySelectorAll('label[data-for]');
        for (var j = 0; j < labels.length; j++) {
            var label = labels[j];
            label.setAttribute('for', label.getAttribute('data-for'));
            label.removeAttribute('data-for');
        }
    }

    // Detect keyup, exit when esc.
    function phantomKeyUp(e) {
        if (e.keyCode === 27) {
            if (document.documentElement.classList.contains('_phantom-limb')) {
                stop();
            } else {
                start();
            }
        }
    }

    var phantomLimb = {
        start: start,
        stop: stop
    };

    if (typeof define === 'function' && define.amd) define(phantomLimb);
    if (typeof module !== 'undefined') module.exports = phantomLimb;
    window.phantomLimb = phantomLimb;

    document.addEventListener('keyup', phantomKeyUp, false);

    /*if (config.startOnLoad) addEventListener('DOMContentLoaded', function(){
           start();
           fingers.forEach(function(finger) {
               finger.hide();
           });
       }, false);*/

    document.addEventListener('mouseover', function (e) {
        if (!document.documentElement.classList.contains('_phantom-limb')) {
            start();
        }
    }, false);
    document.addEventListener('mouseleave', function (e) {
        mouseIsDown = false;
        fireTouchEvents('touchend', e);
        stop();
        fingers.forEach(function (finger) {
            finger.hide();
            finger.target = null;
        });
    }, false);
    
    //
    var dragX,dragY;
    document.addEventListener('drag',function(e){
        var oriE = e.detail.touches[0];
        var dragX2 = oriE.clientX, dragY2 = oriE.clientY;
        if(dragX&&dragY){
            var deltaX = dragX2-dragX,deltaY = dragY2-dragY;
            if(Math.abs(deltaX)<Math.abs(deltaY)){
                document.body.scrollTop = document.body.scrollTop - deltaY;
            }
        }
        dragX = dragX2;
        dragY = dragY2;
    },false);
    document.addEventListener('dragend',function(e){
        dragX = dragY = undefined;
    },false);
    
    
}());