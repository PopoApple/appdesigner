var NV = {};
var UA = navigator.userAgent.toLowerCase();
try {
	NV.name = !-[1, ] ? 'ie' :
		(UA.indexOf("msie") >= 0) ? 'ie' :
		isIE() ? 'ie' :
		(UA.indexOf("firefox") >= 0) ? 'firefox' :
		(UA.indexOf("chrome") >= 0) ? 'chrome' :
		window.opera ? 'opera' :
		window.openDatabase ? 'safari' :
		'unkonw';
} catch (e) {};
function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)  
        return true;  
    else  
        return false;  
}
var body = document.body || document.documentElement,
	style = body.style,
	vendor = ['webkit', 'khtml', 'moz', 'ms', 'o'],
	i = 0;
while (i < vendor.length) {
	if (typeof style[vendor[i] + 'Transition'] === 'string') {
		NV.vendor = vendor[i];
	}
	i++;
}
console.log(NV.name);