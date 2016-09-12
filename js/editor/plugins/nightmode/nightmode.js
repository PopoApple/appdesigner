/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('nightmode', function(K) {
	var self = this, name = 'nightmode', lang = self.lang(name + '.');
	self.clickToolbar(name, function() {
        var body = $('iframe.ke-edit-iframe').contents().find('body');
        var btn = $('[data-name=nightmode]');
        console.log(btn[0]);
        if(btn.is('.ke-selected')){
        console.log(111);
            btn.removeClass('ke-selected');
            body.css('background-color','rgba(0, 0, 0, 0)');
        }else{
        console.log(222);
            btn.addClass('ke-selected');
            body.css('background-color','rgb(44,62,80)');
        }
		//var curVal = $('iframe.ke-edit-iframe').contents().find('body')[0].style.lineHeight;
		/*var menu = self.createMenu({
			name : name,
			width : 150
		});*/
		/*K.each(lang.lineHeight, function(i, row) {
			K.each(row, function(key, val) {
				menu.addItem({
					title : val,
					checked : curVal === key,
					click : function() {
                        textLineheight(key);
                        $('iframe.ke-edit-iframe').contents().find('body').css('line-height',key);
                        self.hideMenu();
					}
				});
			});
		});*/
	});
});
