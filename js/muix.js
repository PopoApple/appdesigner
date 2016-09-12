(function($) {
	$('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});
	$('.muix-scroll-wrapper-h').scroll({
		scrollY: false,
		scrollX: true,
		indicators: false
	});
})(mui);
/**
 * radiox
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name, undefined) {

	var CLASS_RADIOX = 'muix-radiox';
	var CLASS_ACTIVE = 'mui-active';

	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_RADIOX)) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 81,
		handle: handle,
		target: false
	});

	window.addEventListener('tap', function(e) {

		var targetRadiox = $.targets.radiox;
		if (!targetRadiox) {
			return;
		}
		if (targetRadiox.classList.contains(CLASS_ACTIVE)) {
			return;
		}
		var groupName = targetRadiox.getAttribute('name');
		var radioxs = $('.'+CLASS_RADIOX+'[name='+groupName+']');
		radioxs.each(function(i,rad){
			rad.classList.remove(CLASS_ACTIVE);
		});
		targetRadiox.classList.add(CLASS_ACTIVE);
	});

})(mui, window, document, 'radiox');
/**
 * toggle
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name, undefined) {

	var CLASS_TOGGLE = 'muix-toggle';
	var CLASS_ACTIVE = 'mui-active';

	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_TOGGLE)) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 82,
		handle: handle,
		target: false
	});

	window.addEventListener('tap', function(e) {
		var targetTogglex = $.targets.togglex;
		if (!targetTogglex) {
			return;
		}
		if (targetTogglex.classList.contains(CLASS_ACTIVE)) {
			targetTogglex.classList.remove(CLASS_ACTIVE);
		}else{
			targetTogglex.classList.add(CLASS_ACTIVE);
		}
	});
	
})(mui, window, document, 'togglex');

/**
 * 修改MUI中点击Label选中选框的方式，改为通过for找到选框的Id
 */
(function($, window, name) {
	if (window.FastClick) {
		return;
	}

	var handle = function(event, target) {
        if (target.tagName === 'LABEL') {
            var pNode = target.parentNode;
            var forId = target.getAttribute('for');
            var ele;
            if (pNode && (pNode.classList.contains('mui-radio') || pNode.classList.contains('mui-checkbox'))) {
                ele = target.parentNode.querySelector('input');
			}else if(forId){
                ele = document.getElementById(forId);
            }
            if(ele && !target.disabled && (ele.type === 'radio' || ele.type === 'checkbox')){
                target = ele;
            }
            return target;
		}
        return false;
	};

	$.registerTarget({
		name: name,
		index: 39,
		handle: handle,
		target: false
	});
	

})(mui, window, 'click');