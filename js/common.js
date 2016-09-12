var FREEZE_COMP_TIPS = '���������˫������༭';
var compNames = {
    image:'ͼƬ',
    text:'�ı�',
    icon:'ͼ��',
    div:'�װ�',
    grid:'����',
    slider:'�ֲ�ҳ',
    list:'���ݱ�� ',
    form:'��',
    input:'�ı���',
    textarea:'�����ı���',
    radioG:'��ѡ����',
    checkboxG:'��ѡ����',
    radio:'��ѡ��',
    checkbox:'��ѡ��',
    select:'ѡ���'
};
var listColClassName = {
    1:'mui-col-xs-12',
    2:'mui-col-xs-6',
    3:'mui-col-xs-4',
    4:'mui-col-xs-3'
};
var compData = {
    image:{
        type: 'image',
        src: 'images/image.jpg',
        align:'center'
    },
    text:{
        type: 'text',
        html: 'Ĭ������',
        align: 'left'
    },
    icon:{
        type: 'icon',
        align:'center'
    },
    div:{
        type: 'div',
        bgColor: '#FFFFFF',
        align:'center'
    },
    grid:{
        type: 'grid',
         containers: [
            {
                width: '50%',
            },
            {
                width: '50%',
            }
         ]
    },
    slider:{
        type: 'slider',
        containers:[
            {},{},{}
        ]
    },
    list:{
        type: 'list',
        rowCnt:3,
        colCnt:1,
        srcType:'article',
        srcSubtype:'0'
    },
    form:{
        type: 'form',
        padding:'0 10px'
    },
    input:{
        type: 'input'
    },
    textarea:{
        type: 'textarea'
    },
    radioG:{
        type: 'radioG',
        children:[
            {type:'radio',name:'ѡ��1',align:'left'},
            {type:'radio',name:'ѡ��2',align:'left'}
        ]
    },
    checkboxG:{
        type: 'checkboxG',
        children:[
            {type:'checkbox',name:'ѡ��1',align:'left'},
            {type:'checkbox',name:'ѡ��2',align:'left'}
        ]
    },
    radio:{
        type: 'radio',
        align:'left'
    },
    checkbox:{
        type: 'checkbox',
        align:'left'
    },
    select:{
        type: 'select',
        options:[{name:'��ѡ��...'},{name:'ѡ��1'},{name:'ѡ��2'}]
    },
    test:{"type":"div","borderT":"0px solid rgb(221, 221, 221)","borderB":"0px solid rgb(221, 221, 221)","bgColor":"#fff","children":[{"type":"grid","padding":"15px 5px 10px 5px","containers":[{"width":"36%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(254, 180, 148)","children":[{"type":"icon","shape":"flag","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"17"}],"id":"16","freeze":1},{"type":"text","html":"<span style=\"color:#A5A5A5;font-size:12px;\"><span style=\"color:#595959;\"></span><span style=\"color:#595959;\">�</span></span>","align":"center","id":"18"}]},{"width":"35%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(121, 168, 255)","children":[{"type":"icon","shape":"location","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"20"}],"id":"19","freeze":1},{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"font-size:12px;line-height:12px;\">��λ</span></span>","align":"center","id":"21"}]},{"width":"35%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(251, 159, 223)","children":[{"type":"icon","shape":"person","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"23"}],"id":"22","freeze":1},{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"font-size:12px;line-height:12px;\">����</span></span>","align":"center","id":"24"}]}],"id":"15","freeze":1},{"type":"grid","padding":"0 5px 15px 5px","containers":[{"width":"36%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(176, 149, 242)","children":[{"type":"icon","shape":"search","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"30"}],"id":"29","freeze":1},{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"font-size:12px;line-height:12px;\">����</span></span>","align":"center","id":"31"}]},{"width":"35%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(119,237,140)","children":[{"type":"icon","shape":"gear","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"33"}],"id":"32","freeze":1},{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"font-size:12px;line-height:12px;\">����</span></span>","align":"center","id":"34"}]},{"width":"35%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(239,223,78)","children":[{"type":"icon","shape":"paperclip","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"36"}],"id":"35","freeze":1},{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"font-size:12px;line-height:12px;\">����</span></span>","align":"center","id":"37"}]}],"id":"28","freeze":1}],"id":"14","padding":"0px 0px 10px","radius":"0px","freeze":1}
};
function cloneJSON(data){
    return JSON.parse(JSON.stringify(data));
}
function toInt(str) {
    if (!isNaN(str)) {
        return str;
    }
    var numStr = '';
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (/^[0-9]*$/.test(c)) {
            numStr += c;
        }
    }
    return parseInt(numStr);
}
function isNumber(val){
   var reg = new RegExp("^[0-9]+$");
   if(reg.test(val)){
       return true;
   }else{
       return false;
   }
}
function trim(str){
    return str.replace(/^\s+|\s+$/g,'');
}
function showLoading(containerId){
    $('#'+containerId+' > .loading').removeClass('none');
}
function hideLoading(containerId){
    $('#'+containerId+' > .loading').addClass('none');
}
function showToast(containerId,text){
    var toast = $('#'+containerId+' > .toast');
    var span = toast.find('span');
    toast.removeClass('none');
    if(text){
        span.html(text);
    }
    setTimeout(function(){
        span.addClass('transparent');
        setTimeout(function(){
            toast.addClass('none');
            span.removeClass('transparent');
        },600);
    },600);
}
function showTips(containerId,text){
	var tips = $('#'+containerId+' > .tips');
    var span = tips.find('span');
	tips.removeClass('none');
	span.html(text);
}
function hideTips(containerId){
    $('#'+containerId+' > .tips').addClass('none');
}
function getQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
function log(info,desc){
	if(desc){
		console.log('--------- '+desc+' ---------');
	}
	console.log(info);
}
/*
 btns = [
 	{txt:'����վ��',style:'green',callback:function(){}},
 	{txt:'�ݲ�����',style:'gray'}
 ]
 * */
function showDialog(info,btns){
	/*<div class="dialog" style="left:0px;top:0px">
        <div class="dialog_win">
        	<!--<div class="dialog_icon"></div>-->
        	<div class="dialog_txt">
            	ҳ�淢���ɹ�����վ����δ��������ҳ���Բ��ɷ��ʣ�
            </div>
            <div class="dialog_footer">
            	<button class="dialog_btn btn_green">����վ��</button>
            	<button class="dialog_btn btn_gray">�ݲ�����</button>
            </div>
        </div>
    </div>*/
   var dialog = $('<div class="dialog">'),
   		win = $('<div class="dialog_win">');
   if(info){
   		win.append($('<div class="dialog_txt">').html(info));
   }
   if(btns && btns.length>0){
   	    var footer = $('<div class="dialog_footer">');
   		$.each(btns,function(){
   			var btn = $('<button class="dialog_btn">');
   			var btnTxt = this.txt,
   				style = this.style,
   				callback = this.callback;
   			if(btnTxt){
   				btn.html(btnTxt);
   			}
   			if(style){
   				btn.addClass('btn_'+style);
   			}
   			if(callback){
   				btn.click(function(){
   					callback();
   					dialog.remove();
   				});
   			}else{
   				btn.click(function(){
   					dialog.remove();
   				});
   			}
   			footer.append(btn);
   		});
   		win.append(footer);
   }
   dialog.append(win);
   $('body').append(dialog);
}
