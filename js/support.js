if ((NV.name == 'chrome' || NV.name == 'safari') && (NV.vendor == 'webkit' || NV.vendor == 'khtml') && support_draggable()) {
	
} else {
	/*document.body.innerHTML = '<div id="nosupp" class="error">'+
							        '<div class="error_icon"></div>'+
							        '<div class="error_title">该浏览器不能很好地支持HTML5</div>'+
							        '<div class="error_txt">推荐使用Chrome（谷歌）、QQ、360、搜狗浏览器的最新版本</div>'+
							    '</div>';*/
}
function support_draggable(){
    var div = document.createElement('div');
    return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
}
/*
 .error{
    position: absolute;
    z-index: 10;
    top:0;
    bottom:0;
    left:0;
    right:0;
    text-align: center;
    color:#666;
    background:rgb(237,239,240);
}
.error .error_icon{
	background-image: url(../images/nosupp.png);
	background-repeat: no-repeat;
	width:100px;
	height:100px;
	margin:auto;
	opacity: .6;
}
.error .error_title{
	font-size:18px;
	color:#333;
	font-weight: bold;
}
.error .error_txt{
	margin-top:20px;
	font-size:12px;
	color:#666;
}
#nosupp{
	padding-top:200px;
}
*/

