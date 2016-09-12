var pageList;
function checkSave(){
	var pDataOld = cloneJSON(pWin.pageDataInit);
	var pDataCurr = cloneJSON(pWin.pageData);
	clearPageManageInfo(pDataOld);
	clearPageManageInfo(pDataCurr);
	clearCompEditInfo(pDataOld);
	clearCompEditInfo(pDataCurr);
	if(JSON.stringify(pDataOld) == JSON.stringify(pDataCurr)){
		return true;
	}else{
		return false;
	}
}
function clearPageManageInfo(pData){
	delete pData.pageid;
	delete pData.name;
	delete pData.pUrl;
}
function clearCompEditInfo(parData){
	delete parData.id;
	if(parData.header){
		clearCompEditInfo(parData.header);
	}
	if(parData.footer){
		clearCompEditInfo(parData.footer);
	}
	if(parData.leftmenu){
		clearCompEditInfo(parData.leftmenu);
	}
	if(parData.rightmenu){
		clearCompEditInfo(parData.rightmenu);
	}
	for(var key in parData){
		if(key=='children' || key=='containers'){
			var sub = parData[key];
			for(var i=0;i<sub.length;i++){
				var subI = sub[i];
				clearCompEditInfo(subI);
			}
		}
	}
}
function getPageDataById(pageId){
    for(var i=0;i<pageList.length;i++){
        var page = pageList[i];
        if(page.pageid==pageId){
            return page;
        }
    }
    return null;
}
var pWin, maxPageId = 0;
$(function(){
    for(var i=0;i<blockData.length;i++){
        var block = blockData[i],
            id = block.id,
            name = block.name,
            item = $('<div class="component" id="block_'+id+'">'+
                            '<div class="block_title">'+name+'</div>'+
                            '<div class="block_img"></div>'+
                        '</div>');
            item.find('.block_img').css('background-image','url(images/blocks/'+id+'.jpg)');
        $('#tab_content_blocks').append(item);
    }
    $('body').on('click', bodyClick)
             .on('mouseleave',bodyMouseleave)
             .on('dragover',bodyDragover)
             .on('drop',bodyDrop)
             .on('dragstart',bodyDragstart)
             .on('dblclick', bodyDblClick);
    document.onselectstart=function(){return false;} 
    $('#setContainer').click(function(e){
    	e.stopPropagation();
    });
    $('.previewOri').click(function(){
        if(!$(this).is('.active')){
            $('.previewOri').removeClass('active');
            $(this).addClass('active');
        }
        if($('#previewOriH').is('.active')){
            $('#previewPhone').addClass('landscape');
        }else{
            $('#previewPhone').removeClass('landscape');
        }
    });
    
    $('.collapseBox .box_title').on('click',function(){
        var bar = $(this),
            box = bar.parent();
            if(!box.is('.active')){
                $('#leftBox .collapseBox').removeClass('active');
                box.addClass('active');
            }else{
                $('#leftBox .collapseBox').addClass('active');
                box.removeClass('active');
            }
    });
    $('#addPage').on('click',function(){
        var row = $('.pageRow').eq(0),
            newName = '新建页面',
            newRow = row.clone().removeClass('homePage active'),
            ipt = $('<input type="text" class="renameIpt">'),
            pageNames = $('.pageName');
        newRow.find('.pageName').text(newName);
        newRow.find('.homeBtn').attr('title','设为主页');
        $('#pageList').prepend(newRow);
        
        var data = {
                        id:'0',
                        name:newName,
                        header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"16","shape":"back","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"page","linkSubtype":"prev","linkSubtype2":"1"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":1,"html":newName,"padding":"14px 0px 0px","id":"14"}]},{"width":"15%"}],"id":"15"}]},
                        footer:{id:'4',show:0},
                        children:[]
                    };
        //pageList.push(data);
        
        //newRow[0].click();
        renameType = 'add';
        reqingPageData = data;
        reqingNewRow = newRow;
        //newRow.find('.renameBtn')[0].click();
        renamePagename(newRow);
    });
    
    $('#pageList').on('click','.pageRow',function(e){
        e.stopPropagation();
        var row = $(this);
        if(!row.is('.active')){
        	var currPageId = pWin.pageData.pageid;
        	if(!checkSave()){
        		var flag = confirm('当前页面没有保存，确定离开吗？');
        		if(flag){
        			pWin.pageData = pWin.pageDataInit;
        			for(var i=0;i<pageList.length;i++){
        				if(pageList[i].pageid == currPageId){
        					pageList[i] = pWin.pageDataInit;
        				}
        			}
        		}else{
        			return;
        		}
        	}
            $('.pageRow.active').removeClass('active');
            row.addClass('active');
            var pageId = row.attr('id').replace('pageRow_','');
            for(var i=0;i<pageList.length;i++){
                var page = pageList[i];
                if(page.pageid==pageId){
    				hideTips('phoneContainer');
                    pWin.closePage();
                    if(page.isinit){
            			$('#phoneTool_save').addClass('disable');
                        showLoading('phoneContainer');
                        AJAXRequestPage(reqPageCb,pageId);
                    }else{
                        hideLoading('phoneContainer');
                        openPage('',page);
                    }
                }
            }
        }
    });
    function pageToolBtnStopPropagation(e){
        e.stopPropagation();
        pWin.selectComp();
    }
    $('#pageList').on('click','.renameBtn',function(e){
        pageToolBtnStopPropagation(e);
        var btn = $(this),
            row = btn.parent().parent();
        renamePagename(row);
        renameType = 'rename';
    });
    function renamePagename(row){
    	var ipt = $('<input type="text" class="renameIpt">');
    	ipt.val(row.find('.pageName').text());
        row.append(ipt);
        ipt[0].focus();
        ipt[0].select();
    }
    $('#pageList').on('click','.copyBtn',function(e){
        pageToolBtnStopPropagation(e);
        var btn = $(this),
            row = btn.parent().parent(),
            newName = row.find('.pageName').text()+' 复制',
            newRow = row.clone().removeClass('homePage active'),
            ipt = $('<input type="text" class="renameIpt">');
        newRow.find('.pageName').text(newName);
        newRow.find('.homeBtn').attr('title','设为主页');
        row.after(newRow);
        
        var data = cloneJSON(getPageDataById(row.attr('id').replace('pageRow_','')));
        data.name = newName;
        //pageList.push(data);
        
        //newRow[0].click();
        renameType = 'copy';
        reqingPageData = data;
        reqingNewRow = newRow;
        newRow.find('.renameBtn')[0].click();
    });
    $('#pageList').on('click','.homeBtn',function(e){
        pageToolBtnStopPropagation(e);
        var btn = $(this),
            row = btn.parent().parent();
        if(!row.is('.homePage')){
            var pageId = row.attr('id').replace('pageRow_','');
            reqingOldHomePageId = homePageId;
            setHomePage(pageId);
            showLoading('pagesContainer');
            AJAXRequestHomePage('reqHomePageCb',pageId);
        }
    });
    $('#pageList').on('click','.deleteBtn',function(e){
        pageToolBtnStopPropagation(e);
        var btn = $(this),
            row = btn.parent().parent();
        if(row.is('.homePage')){
            return;
        }
        var yes = confirm('确定删除页面吗？');
        if(yes){
            row.addClass('none');
            
            if(row.is('.active')){
                $('.pageRow.homePage')[0].click();
            }
            //pageList.splice(pageList.indexOf(pData),1);
            
            
            showLoading('pagesContainer');
            reqingPageData = getPageDataById(row.attr('id').replace('pageRow_',''));
          
            AJAXRequestDeletePage('reqDeletePageCb',reqingPageData.pageid);
        }
    });
    $('#pageList').on('blur','.renameIpt',function(){
        var ipt = $(this),
            val = ipt.val(),
            row = ipt.parent();
        row.find('.pageName').text(val);
        ipt.remove();
        console.log(renameType);
        if(renameType=='add' || renameType=='copy'){
            reqingNewName = val;
            
            showLoading('pagesContainer');
            AJAXRequestAddPage('reqAddPageCb',reqingNewName,reqingPageData);
        }else{
            reqingPageData = getPageDataById(row.attr('id').replace('pageRow_',''));
            if(reqingPageData.name != val){
                reqingNewName = val;
                
                showLoading('pagesContainer');
                AJAXRequestRenamePage('reqRenamePageCb',reqingPageData.pageid,val);
            }
        }
    });
    $(document).on('keyup',function(e){
        var curKey = e.which; 
        if(curKey==13){
            $('.renameIpt').blur();
        }
    });
    
    $('.component').attr('draggable', true).on('dragstart', dragstart);
    $('.tab_item').on('click',changeTab);
    $('#commonSpaceT').on('change', commonSpaceT);
    $('#commonSpaceB').on('change', commonSpaceB);
    $('#commonSpaceL').on('change', commonSpaceL);
    $('#commonSpaceR').on('change', commonSpaceR);
    $('#phoneTool_delete').on('click', phoneTool_delete);
    $('#phoneTool_copy').on('click', phoneTool_copy);
    $('#phoneTool_paste').on('click', phoneTool_paste);
    $('#phoneTool_freeze').on('click', phoneTool_freeze);
    $('#phoneTool_preview').on('click', phoneTool_preview);
    $('#phoneTool_save').on('click', phoneTool_save);
    $('#phoneTool_publish').on('click', phoneTool_publish);
    
    $('#previewClose').on('click',previewWinClose);

    $('input[name=commonAlign]').on('change', commonAlign);
    
    $('#phonecontent').load(function(){
        pWin = this.contentWindow;
        if(homePage){
            openPage('',homePage);
        }
    });
    AJAXRequestPageList(reqPagelistCb);
});
function openPage(pageId,data){
	pWin.openPage(pageId,data);
	$('#phoneTool_save').removeClass('disable');
}
function setHomePage(pageId){
    var row = $('#pageRow_'+pageId),
        btn = row.find('homeBtn');
    var currHomeRow = $('.homePage');
        currHomeRow.find('.homeBtn').attr('title','设为主页');
        currHomeRow.removeClass('homePage');
        row.addClass('homePage');
        btn.removeAttr('title');

		homePageId = pageId;
}
var renameType,reqingPageData,reqingNewRow,reqingNewName,reqingOldHomePageId;

function reqHomePageCb(d){
    hideLoading('pagesContainer');
    var data = JSON.parse(d);
    var statu = data.statu;
    if(statu){
        
    }else{
        setHomePage(reqingOldHomePageId);
        showToast('pagesContainer','设置失败！');
    }
}
function reqAddPageCb(d){
    hideLoading('pagesContainer');
    var data = JSON.parse(d);
    var statu = data.statu;
    if(statu){
    	var pageId = data.pageId;
    	reqingPageData.pageid = pageId;
    	reqingPageData.name = reqingNewName;
        pageList.push(reqingPageData);
        reqingNewRow.attr('id','pageRow_'+pageId);
    }else{
        reqingNewRow.remove();
        var info;
        if(renameType=='copy'){
            info = '复制失败！';
        }else{
            info = '添加失败！';
        }
        showToast('pagesContainer',info);
    }
}
function reqRenamePageCb(d){
    hideLoading('pagesContainer');
    var data = JSON.parse(d);
    var statu = data.statu;
    var row = $('#pageRow_'+reqingPageData.pageid);
    if(statu){
        reqingPageData.name = reqingNewName;
        /*if(row.is('.active')){
            pWin.updatePagenameText();
        }*/
    }else{
        row.find('.pageName').html(reqingPageData.name);
        showToast('pagesContainer','修改失败！');
    }
}
function reqDeletePageCb(d){
    hideLoading('pagesContainer');
    var data = JSON.parse(d);
    var statu = data.statu;
    var row = $('#pageRow_'+reqingPageData.pageid);
    if(statu){
        row.remove();
        pageList.splice(pageList.indexOf(reqingPageData),1);
    }else{
        row.removeClass('none active');
        showToast('pagesContainer','删除失败！');
    }
}
function hideSetting(){
    $('#pageSetting').removeClass('block');
}
function reqPageCb(d){  

    var data = d;
    var statu = data.statu;
    var id = data.pageId;
    var currPageid = $('.pageRow.active').attr('id').replace('pageRow_','');
   
    if(statu){
        var page = data.page;
        var replaceList = data.replaceList;
    	//updatePageLinks(page,replaceList);
        for(var i=0;i<pageList.length;i++){
            var p = pageList[i];
            if(p.pageid==id){
                page.pageid = id;
                page.id = '0';
                page.name = p.name;
                page.pUrl = p.pUrl;
                pageList[i] = page;
                if(currPageid == id){
                    hideLoading('phoneContainer');
                    openPage('',page);
                }
            }
        }
    }else{
        if(currPageid == id){
            hideLoading('phoneContainer');
            showTips('phoneContainer','页面加载失败！');
        }
    }
}
/*function updatePageLinks(pageData,replaceList){
	if(!replaceList || replaceList=={}){
		return;
	}
	for(key in pageData){
		var obj = pageData[key];
		if(typeof obj == 'string'){
			if(key=='linkSubtype2'){
				pageData[key] = replaceList[obj];
			}
		}else if(typeof obj == 'object'){
			updatePageLinks(obj,replaceList);
		}
	}
}*/
var homePageId, homePage;
function reqPagelistCb(data){ //TODO
    hideLoading('mainContainer');
    var statu = data.statu;
    if(statu){
        pageList = [];
        var plist = data.pageList;
        homePageId = data.homePageid;
        homePage = data.homePage;
    	var replaceList = data.replaceList;
    	//updatePageLinks(homePage,replaceList);
        homePage.pageid = homePageId;
        homePage.id = '0';
        for(var i=0;i<plist.length;i++){
            var pi = plist[i];
            var id = pi.id;
            var name = pi.name;
            var pUrl = pi.pUrl;
            if(id == homePageId){
            	
                homePage.name = name;
                homePage.pUrl = pUrl;
            	pageList.push(homePage);
            	
            }else{
                var page = {
	                            pageid:id,
	                            name:name,
	                            pUrl:pUrl,
	                            id:'0',
	                            isinit:1
	                        };
                
                pageList.push(page);
            }
        }
		$('#phoneTool_preview').removeClass('disable');
        initSite();
    }else{
        //showToast('mainContainer','站点加载失败！');
        var info = data.info;
        if(!info || info==''){
        	info = '站点加载失败！';
        }
        showToast('mainContainer',info);
    }
}
function initSite(){
    var pList = $('#pageList').empty();
    for(var i=0;i<pageList.length;i++){
        var page = pageList[i],
            pageId = page.pageid,
            isHomePage = (pageId==homePageId);
        //alert(page.name);
        var row = $('<div class="pageRow'+(isHomePage?' homePage':'')+(isHomePage?' active':'')+'" id="pageRow_'+pageId+'">'+
                       '<span class="pageName">'+page.name+'</span>'+
                       '<div class="pageTool">'+
                           '<span title="重命名" class="iconfont icon-bianji renameBtn"></span>'+
                           '<span title="复制" class="iconfont icon-fuzhi copyBtn"></span>'+
                           '<span title="删除" class="iconfont icon-shanchu deleteBtn"></span>'+
                           '<span'+(isHomePage?'':' title="设为主页"')+' class="iconfont icon-home3 homeBtn"></span>'+
                       '</div>'+
                    '</div>');
        //alert(JSON.stringify(row));
        pList.append(row);
    }
    if(pWin){
        openPage('',homePage);
    }
}

function bodyDragstart(){
    var e = window.event || (arguments[0].originalEvent),
        ele = $(e.target);
    if(ele.is('.col-edit-bar,.col-edit-bar-btn')){
        e.preventDefault();
    }
}

var dragingType;

function bodyDragover(){
    var e = window.event || (arguments[0].originalEvent);
    e.preventDefault();
    if(dragingType != 'gridColSetting'){
        return;
    }
    var ele = $(e.target);
    if (ele.hasClass('colPlaceHolder transparent')) {
        ele.removeClass('transparent');
    }
    if (ele.hasClass('col-edit-cell')) {
        var x = e.pageX;
        var eleL = ele.offset().left;
        var eleW = ele[0].offsetWidth;
        if (x - eleL < eleW / 2) {
            removeBar(grid_colPlaceHolder);
            ele.before(grid_colPlaceHolder);
            addBar(grid_colPlaceHolder);
        } else {
            removeBar(grid_colPlaceHolder);
            ele.after(grid_colPlaceHolder);
            addBar(grid_colPlaceHolder);
        }
    }
}
function bodyDrop(){
    if(dragingType == 'component'){
        pWin.drop();
    }else if(dragingType == 'gridColSetting'){
        var colPlaceHolder = $('.colPlaceHolder');
        var flag;
        if (!colPlaceHolder.hasClass('transparent') || (colPlaceHolder.hasClass('transparent') && $('.col-edit-cell').length < 2)) {
            flag = true;
        } else {
            var del = confirm('确定删除列以及包含的所有组件吗？');
            if (del) {
                removeBar(colPlaceHolder);
                colPlaceHolder.remove();
                deleteGridCell(grid_dragingColIdx);
                var extra = toInt(grid_dragingCol.html());
                var rest = 100 - extra;
                var cols = $('.col-edit-cell');
                var percent = 100;
                for (var i = 1; i < cols.length; i++) {
                    var col = cols.eq(i);
                    var w = toInt(col.html());
                    w += Math.floor(extra * w / rest);
                    col.width(w + '%').html(w + '%');
                    percent -= w;
                }
                cols.eq(0).width(percent + '%').html(percent + '%');
                synGridWidth();
            } else {
                flag = true;
            }
        }
        if (flag) {
            colPlaceHolder.after(grid_dragingCol);
            colPlaceHolder.remove();
            moveGridCell(grid_dragingColIdx, $('.col-edit-cell').index(grid_dragingCol));
        }
    }
} 
function bodyDblClick() {
	pWin.bodyDblClick();
}
function bodyClick() {
    if(grid_isMouseDown){
        return;
    }
    var e = window.event || (arguments[0].originalEvent);
    if (e) {
        var ele = $(e.target);
        var x = e.pageX;
        /*if(((x>327 && x<825) || ele.is('body')) && !ele.is('.phoneTool')){*/
        if((x<910 || ele.is('body')) && !ele.is('.phoneTool,select')){
            pWin.selectComp();
        }
    }
}
function bodyMouseleave(){
    var e = window.event || (arguments[0].originalEvent);
    if(e.target.id=='phonecontent'){
        $('#phonecontent').contents().find('.mouseover').removeClass('mouseover');
    }
}
function changeTab(){
    var par = $(this).parent();
    var items = par.children('.tab_item');
    var contents = par.children('.tab_content');
    
    items.removeClass('active');
    $(this).addClass('active');
    contents.removeClass('active');
    contents.eq(items.index(this)).addClass('active');
}

function synPhoneTool() {
    var sels = $('#phonecontent').contents().find('.comp.selected');
    if (sels.length > 0) {
        $('#phoneTool_delete,#phoneTool_copy').removeClass('disable');
        var selComp = sels.eq(0);  //暂不考虑多选
        if(selComp.is('.comp_div,.comp_grid,.comp_slider,.comp_list,.comp_form,.comp_radioG,.comp_checkboxG')){
            $('#phoneTool_freeze').removeClass('disable');
            if(selComp.is('.freeze')){  
                activeFreezeBtn(true);
            }else{
                activeFreezeBtn(false);
            }
        }else{
            $('#phoneTool_freeze').addClass('disable');
            activeFreezeBtn(false);
        }
    } else {
        $('#phoneTool_delete,#phoneTool_copy,#phoneTool_freeze').addClass('disable');
        activeFreezeBtn(false);
    }
}

function activeFreezeBtn(statu){
    var btn = $('#phoneTool_freeze');
    if(statu){
        btn.addClass('active').attr('title','解冻');
    }else{
        btn.removeClass('active').attr('title','冻结');
    }
}

function phoneTool_delete() {
    pWin.phoneTool_delete();
}

function phoneTool_copy() {
    pWin.phoneTool_copy();
}

function phoneTool_paste() {
    pWin.phoneTool_paste();
}

function phoneTool_freeze() {
    pWin.phoneTool_freeze();
}

function phoneTool_preview(){
	if(!checkSave()){
		alert('请先保存页面');
		return;
	}
	var pUrl;
	if(testMode){
		pUrl = getPageDataById(pWin.pageData.pageid).pUrl;
	}else{
		pUrl = "../preview/"+siteId+"/"+pWin.pageData.pageid+".html";//如果页面保存后，立即预览，通过getPageDataById就查不到预览地址，
	}

	/*var rootPath = $('#rootPath').val();
	if(rootPath && rootPath!=''){*/
		/*http://10.17.47.75:8080/portal/site/preview/21/1.html
		 ../preview/21/1.html
		 * */
	/*	pUrl = pUrl.replace('../',rootPath+'/site/');
	}*/
    $('#previewContent')[0].contentWindow.location = pUrl;
    $('#previewWin').removeClass('none');
}
function previewWinClose(){
    $('#previewWin').addClass('none');
}
function phoneTool_save(){
    showLoading('mainContainer');
    var pageId = pWin.pageData.pageid;
    var saveData = cloneJSON(pWin.pageData);
    delete saveData.id;
    delete saveData.pageid;
    AJAXRequestSavePage('reqSavePageCb',pageId,saveData);
}
function phoneTool_publish(){
    showLoading('mainContainer');
    var pageId = pWin.pageData.pageid;
    var saveData = cloneJSON(pWin.pageData);
    delete saveData.id;
    delete saveData.pageid;
    AJAXRequestReleasePage('reqReleasePageCb',pageId,saveData);
}
function reqReleasePageCb(d){
    hideLoading('mainContainer');
    var data = JSON.parse(d);
    var statu = data.statu;
    if(statu){
    	if(data.isRelease==0){
    		var publishSite = function(){
    			window.parent.location.href=rootPath+"/site/toRelease.action?siteId="+siteId;
    		}
    		var btns = [
					 	{txt:'发布站点',style:'green',callback:publishSite},
					 	{txt:'暂不发布',style:'gray'}
					 ];
    		showDialog('页面发布成功，但站点尚未发布，<br/>该页面仍不可访问！',btns);
    	}else{
        	showToast('mainContainer','发布成功！');
    	}
    }else{
        showToast('mainContainer','发布失败！');
    }
}
function reqSavePageCb(d){
    hideLoading('mainContainer');
    var data = JSON.parse(d);
    var statu = data.statu;
    if(statu){
    	pWin.pageDataInit = cloneJSON(pWin.pageData);
        showToast('mainContainer','保存成功！');
    }else{
        showToast('mainContainer','保存失败！');
    }
}
function dragstart() {
    var e = window.event || (arguments[0].originalEvent);
    if(NV.name == 'firefox'){
    	e.dataTransfer.setData('t','');
    }
    dragingType = 'component';
    var id = e.target.id,
        a = id.split('_'),
        dataType = a[0],
        dataId = a[1],
        data;
    if(dataType == 'comp'){
        data = cloneJSON(compData[dataId]);
    }else{
        data = cloneJSON(getBlockData(dataId));
    }
    pWin.dragingEleData = data;
    pWin.dragingEle = pWin.buildComp(data);
    pWin.checkDragLimit();
}
var currComp, //在手机模拟区域中当前选中的组件
    currComps, //当前选中的组件如果在数据表格中，此变量包含该组件以及它的复制组件
    currData; //当前组件对应的数据对象
var commonSetting = { //各种类型需要的公用设置项，其中公用设置项包括：awh、位置和大小,space、调整边距,link、链接
    div: ['align', 'space', 'link'],
    grid: ['space'],
    text: ['space', 'link'],
    image: ['align', 'space', 'link'],
    icon: ['align', 'space', 'link'],
    list: ['space'],
    slider: ['space'],
    form: ['space'],
    input: ['space'],
    textarea: ['space'],
    radioG: ['space'],
    checkboxG: ['space'],
    radio: ['align','space'],
    checkbox: ['align','space'],
    select: ['space']
};
function showSettingPanel(type,title){
    $('.setting').removeClass('block');
    $('#' + type + 'Setting').addClass('block');
    $('#compType').html(' - ' + title);
    window['initSetting_' + type]();
}
function showSetting() {
    var subDoc = $('#phonecontent').contents();
    currComp = subDoc.find('.comp.selected'); //暂时只能选中一个组件
    if(currComp.length<=0){
        currData = pWin.pageData;
        showSettingPanel('page','页面');
        return;
    }
    currData = pWin.getCompData(currComp.attr('id').split('_')[1]);
    var dynidx = currComp.attr('data-dynidx');
    if(dynidx){
        currComps = subDoc.find('.comp[data-dynidx='+dynidx+']');
    }else{
        currComps = currComp;
    }
    compType = currComp.attr('data-type');
    showSettingPanel(compType,compNames[compType]);
                     
    var cs = commonSetting[compType];
    cs.forEach(function (s) {
        switch (s) {
        case 'align':
            {
                $('#' + compType + 'Setting').append($('#commonSetting_align').removeClass('none'));
                var alignRads = $('#commonAlign input');
                var alignType = 0;
                if (currComp.hasClass('align-center')) {
                    alignType = 1;
                } else if (currComp.hasClass('align-right')) {
                    alignType = 2;
                }
                alignRads[alignType].checked = true;
                break;
            }
        case 'space':
            {
                $('#' + compType + 'Setting').append($('#commonSetting_space').removeClass('none'));
                $('#commonSpaceT')[0].value = toInt(currComp.css('padding-top'));
                $('#commonSpaceB')[0].value = toInt(currComp.css('padding-bottom'));
                $('#commonSpaceL')[0].value = toInt(currComp.css('padding-left'));
                $('#commonSpaceR')[0].value = toInt(currComp.css('padding-right'));
                break;
            }
        case 'link':
            {
                $('#' + compType + 'Setting').append($('#commonSetting_link').removeClass('none'));
                initSetting_common_link();
                break;
            }
        }
    });
}
function commonSynData(type){
    switch(type){
        case 'space':{
            var val = currComp.css('padding');
            if(val=='0px'){
                delete currData.padding;
            }else{
                currData.padding = val;
            }
            break;
        }
        case 'align':{
            var center = currComp.hasClass('align-center'),
                right = currComp.hasClass('align-right');
            if(center){
                currData.align = 'center';
            }else if(right){
                currData.align = 'right';
            }else{
                currData.align = 'left';
            }
            break;
        }
        case 'link':{
            currData.linkType = currComp.attr('data-linktype');
            currData.linkSubtype = currComp.attr('data-linksubtype');
            currData.linkSubtype2 = currComp.attr('data-linksubtype2');
            currData.link = currComp.attr('data-link');
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
/*通用属性-边距设置*/
function commonSpace(val,n){
    var a = [
        currComp.css('padding-top'),
        currComp.css('padding-right'),
        currComp.css('padding-bottom'),
        currComp.css('padding-left'),
    ];
    var newPadding = '';
    for(var i=0;i<4;i++){
        if(i+1==n){
            newPadding += val;
        }else{
            newPadding += a[i];
        }
        if(i<3){
            newPadding += ' ';
        }
    }
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        currCompsK.css('padding', newPadding);
    }
    
    commonSynData('space');
}

function commonSpaceT() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    commonSpace(this.value+'px',1);
}

function commonSpaceR() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    commonSpace(this.value+'px',2);
}

function commonSpaceB() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    commonSpace(this.value+'px',3);
}

function commonSpaceL() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    commonSpace(this.value+'px',4);
}

/*通用属性-对齐方式设置*/
function commonAlign(val) {
    var type = typeof val=='string'?val:this.value;
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        currCompsK.removeClass('align-center align-right');
        if (type == '1') {
            currCompsK.addClass('align-center');
        } else if (type == '2') {
            currCompsK.addClass('align-right');
        }
    }
    
    commonSynData('align');
}
/*通用属性-链接设置*/

$('#link_sel').on('change',link_sel);
$('#link_sel_page').on('change',link_sel_page);
$('#link_sel_page_custom').on('change',link_sel_page_custom);
$('#link_sel_page_url').on('change',link_sel_page_url);
$('#link_sel_menu').on('change',link_sel_menu);

function initSetting_common_link() {
    linkInitSel();   //第一级选框
    linkInitSel_page();  //第二级选框——跳转页面
    linkInitSetting();
}
function linkInitSel(){
    var sel = $('#link_sel');
    var formOpt = sel.find('option[value=form]');
    var menuOpt = sel.find('option[value=menu]');
    var menuCloseOpt = sel.find('option[value=menu_close]');
    var inForm = false, inMenu = false;
    var obj = currComp;
    while(obj && !obj.is('body')){
        if(obj.is('.comp_form')){
            inForm = true;
        }
        if(obj.is('aside')){
            inMenu = true;
        }
        obj = obj.parent();
    }
    if(inForm){
        formOpt.removeClass('none');
    }else{
        formOpt.addClass('none');
    }
    if(inMenu){
        menuOpt.addClass('none');
        menuCloseOpt.removeClass('none');
    }else{
        menuOpt.removeClass('none');
        menuCloseOpt.addClass('none');
    }
    sel.val(sel.find('option').not('.none').eq(0).attr('value'));
}
function linkInitSel_page(){
    var sel = $('#link_sel_page');
    sel.find('option[value="product"],option[value="article"]').addClass('none');
    if(currComp.is('[data-srcfield]')){
        var listComp = $('#phonecontent').contents().find('#'+currComp.attr('data-listid'));
        var srcType = listComp.attr('data-srctype');
        sel.find('option[value="'+srcType+'"]').removeClass('none');
    }
    
    var customOpt = sel.find('option[value=custom]');
    var pages = $('.pageRow').not('.active');
    if(pages.length>0){
        customOpt.removeClass('none');
        linkInitSel_custom();
    }else{
        customOpt.addClass('none');
    }
    
    sel.val(sel.find('option').not('.none').eq(0).attr('value'));
}
function linkInitSel_custom(){
    var sel = $('#link_sel_page_custom');
    sel.empty();
    var pages = $('.pageRow').not('.active');
    for(var i=0;i<pages.length;i++){
        var page = pages[i];
        sel.append('<option value="'+page.id.replace('pageRow_','')+'">'+$(page).find('.pageName').html()+'</option>');
    }
    sel.val(sel.find('option').not('.none').eq(0).attr('value'));
}

function linkRemove(){
    $('#link_sel').val('none');
    $('[id^=link_sel_]').addClass('none');
    currComp.attr('data-linktype','none').removeAttr('data-linksubtype').removeAttr('data-linksubtype2').removeAttr('data-link');
}
function LinkSelectValue(sel,val){
    if(val == undefined){
        return false;
    }
    if(sel.is('select') && sel.find('option[value="'+val+'"]').not('.none').length==0){
        linkRemove();
        return false;
    }
    sel.val(val);
    return true;
}
function linkInitSetting(){
    var val = currComp.attr('data-linktype');
    $('[id^=link_sel_]').addClass('none');
    if(LinkSelectValue($('#link_sel'),val)){
        if(val=='page'){
            $('#link_sel_page').removeClass('none');
            linkInitSetting_page();
        }else if(val=='menu'){
            $('#link_sel_menu').removeClass('none');
            linkInitSetting_menu();
        }
    }
}
function linkInitSetting_page(){
    var val = currComp.attr('data-linksubtype');
    $('[id^=link_sel_page_]').addClass('none');
    if(LinkSelectValue($('#link_sel_page'),val)){
        if(val=='custom'){
            $('#link_sel_page_custom').removeClass('none');
            linkInitSetting_custom();
        }else if(val=='url'){
            $('#link_sel_page_url').removeClass('none');
            linkInitSetting_url();
        }
    } 
}
function linkInitSetting_menu(){
    LinkSelectValue($('#link_sel_menu'),currComp.attr('data-linksubtype'));
}
function linkInitSetting_custom(){
    LinkSelectValue($('#link_sel_page_custom'),currComp.attr('data-linksubtype2'));
}
function linkInitSetting_url(){
    LinkSelectValue($('#link_sel_page_url'),currComp.attr('data-link'));
}

function link_sel(){
    var val = $('#link_sel').val();
    $('[id^=link_sel_]').addClass('none');
    if(val=='page'){
        $('#link_sel_page').removeClass('none').focus();
        link_sel_page();
    }else if(val=='menu'){
        $('#link_sel_menu').removeClass('none').focus();
        link_sel_menu();
    }
    currComp.attr('data-linktype',val);
    commonSynData('link');
}
function link_sel_page(){
    var val = $('#link_sel_page').val();
    $('[id^=link_sel_page_]').addClass('none');
    if(val=='custom'){
        $('#link_sel_page_custom').removeClass('none').focus();
        link_sel_page_custom();
    }else if(val=='url'){
        $('#link_sel_page_url').removeClass('none').focus();
        link_sel_page_url();
    }
    currComp.attr('data-linksubtype',val);
    commonSynData('link');
}
function link_sel_menu(){
    currComp.attr('data-linksubtype',$('#link_sel_menu').val());
    commonSynData('link');
}
function link_sel_page_custom(){
    currComp.attr('data-linksubtype2',$('#link_sel_page_custom').val());
    commonSynData('link');
}
function link_sel_page_url(){
    currComp.attr('data-link',$('#link_sel_page_url').val());
    commonSynData('link');
}

/*页面属性设置*/

function initSetting_page() {
    $('#pageShowHeader')[0].checked = currData.header?currData.header.show:false;
    $('#pageShowFooter')[0].checked = currData.footer?currData.footer.show:false;
    
    $('#pageFreezeHeader')[0].checked = currData.header?currData.header.freeze:false;
    $('#pageFreezeFooter')[0].checked = currData.footer?currData.footer.freeze:false;
    
    var offCanvas = $('#phonecontent').contents().find('.mui-off-canvas-wrap');
    var leftStatu = 'open',rightStatu = 'open';
    if(offCanvas.is('.left-menu.mui-active')){
        leftStatu = 'close';
    }
    if(offCanvas.is('.right-menu.mui-active')){
        rightStatu = 'close';
    }
    $('#pageEditMenu_left').html(page_EDIT_TIPS[leftStatu]);
    $('#pageEditMenu_right').html(page_EDIT_TIPS[rightStatu]);
}
$('#pageEditMenu_left').on('click',pageEditMenu_left);
$('#pageEditMenu_right').on('click',pageEditMenu_right);
$('#pageShowHeader').on('change',pageShowHeader);
$('#pageShowFooter').on('change',pageShowFooter);
$('#pageFreezeHeader').on('change',pageFreezeHeader);
$('#pageFreezeFooter').on('change',pageFreezeFooter);
function pageSynData(type){
    switch(type){
        case 'showHeader':{
            currData.header.show = $('#pageShowHeader').is(':checked')?1:0;
            break;
        }
        case 'showFooter':{
            currData.footer.show = $('#pageShowFooter').is(':checked')?1:0;
            break;
        }
        case 'freezeHeader':{
            currData.header.freeze = $('#pageFreezeHeader').is(':checked')?1:0;
            break;
        }
        case 'freezeFooter':{
            currData.footer.freeze = $('#pageFreezeFooter').is(':checked')?1:0;
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
function pageShowHeader(){
    var checked = $(this).is(':checked');
    var header = $('#phonecontent').contents().find('#root_1');
    if(checked){
        header.removeClass('none');
    }else{
        header.addClass('none');
    }
    pageSynData('showHeader');
}
function pageShowFooter(){
    var checked = $(this).is(':checked');
    var footer = $('#phonecontent').contents().find('#root_4');
    if(checked){
        footer.removeClass('none');
    }else{
        footer.addClass('none');
    }
    pageSynData('showFooter');
}
function pageFreezeHeader(){
    var checked = $(this).is(':checked');
    var header = $('#phonecontent').contents().find('#root_1');
    if(checked){
        header.addClass('freeze');
    }else{
        header.removeClass('freeze');
    }
    pageSynData('freezeHeader');
}
function pageFreezeFooter(){
    var checked = $(this).is(':checked');
    var footer = $('#phonecontent').contents().find('#root_4');
    if(checked){
        footer.addClass('freeze');
    }else{
        footer.removeClass('freeze');
    }
    pageSynData('freezeFooter');
}
var page_EDIT_TIPS = {open:'打开并编辑',close:'完成并关闭'};
function pageEditMenu_left(){
    var wrap = $('#phonecontent').contents().find('.mui-off-canvas-wrap');
    if($(this).html() == page_EDIT_TIPS.open){
        $(this).html(page_EDIT_TIPS.close);
        $('#pageEditMenu_right').html(page_EDIT_TIPS.open);
        wrap.removeClass('right-menu').addClass('mui-active left-menu');
    }else{
        $(this).html(page_EDIT_TIPS.open);
        wrap.removeClass('mui-active left-menu');
    }
    
    pWin.goOutAll();
}
function pageEditMenu_right(){
    var wrap = $('#phonecontent').contents().find('.mui-off-canvas-wrap');
    if($(this).html() == page_EDIT_TIPS.open){
        $(this).html(page_EDIT_TIPS.close);
        $('#pageEditMenu_left').html(page_EDIT_TIPS.open);
        wrap.removeClass('left-menu').addClass('mui-active right-menu');
    }else{
        $(this).html(page_EDIT_TIPS.open);
        wrap.removeClass('mui-active right-menu');
    }
    
    pWin.goOutAll();
}
    /*网格属性设置*/
function initSetting_grid(id) {
    var str = '';
    var grid = currComp.children('.muix-grid').eq(0);
    var cols = grid.children('.muix-grid-cell');
    for (var i = 0; i < cols.length; i++) {
        var col = cols[i];
        var w = col.style.width;
        if (i > 0) {
            str += '<div class="col-edit-bar">' +
                '<div class="col-edit-bar-btn"></div>' +
                '</div>';
        }
        str += '<div class="col-edit-cell" style="width:' + w + '" draggable="true" >' + w + '</div>';
    }
    $('#colEditBox').html(str);
    
    /*var datasrcType = currComp.attr('data-srctype');
    datasrcType = datasrcType?datasrcType:'article';
    $('#gridDatasrcType').val(datasrcType);
    
    var subSel,subType;
    $('#gridDatasrcType_article,#gridDatasrcType_product').addClass('none');
    if(datasrcType == 'article'){
        subSel = $('#gridDatasrcType_article');
        subType = articleType;
    }else{
        subSel = $('#gridDatasrcType_product');
        subType = productType;
    }
    subSel.removeClass('none');*/
    //gridUpdateDatasrcSel();
}
/*function gridUpdateDatasrcSel(){
    var datasrcTypes = ['article','product'];
    var sel,type;
    for(var j=0;j<datasrcTypes.length;j++){
        if(datasrcTypes[j] == 'article'){
            sel = $('#gridDatasrcType_article');
            type = articleType;
        }else{
            sel = $('#gridDatasrcType_product');
            type = productType;
        }
        sel = sel.find('select');
        sel.empty();
        sel.append('<option value="0">全部</option>');
        for(var i=0;i<type.length;i++){
            sel.append('<option value="'+type[i].id+'">'+type[i].name+'</option>');
        }
    }
}*/
$('#gridSetting').on('mousedown', '.col-edit-bar-btn', colbarMousedown)
    .on('mousemove', colbarMousemove)
    .on('mouseup', colbarMouseup)
    .on('dragstart', '.col-edit-cell', colDragstart)
    .on('drag', '.col-edit-cell', colDrag)
    .on('dragleave', colDragleave);
$('#addColBtn').on('click', addCol);
$('#gridDatasrcType').on('change',gridDatasrcType);

function gridSynData(type,idx1,idx2){ //  idx1:删除操作时，删除的列序号；移动操作时，第一个列的序号   idx2：移动操作时，第二个列的序号
    switch(type){
        case 'width':{
            var cols = currComp.children('.muix-grid').eq(0).children('.muix-grid-cell');
            var containers = currData.containers;
            for (var i = 0; i < cols.length; i++) {
                containers[i].width = cols[i].style.width;
            }
            break;
        }
        case 'add':{
            currData.containers.push({});
            break;
        }
        case 'delete':{
            currData.containers.splice(idx1,1);
            break;
        }
        case 'move':{
            var arry = currData.containers;
            var temp = arry.splice(idx1,1)[0];
            if(idx2 == arry.length){
                arry.push(temp);
            }else{
                arry.splice(idx2,0,temp);
            }
            break;
        }
        default:{
            break;
        }
    }
    ////console.log(JSON.stringify(pWin.pageData));
}

var grid_dragingCol, //正在拖动的单元格
    grid_dragingColIdx, //正在拖动的单元格在所有单元格中的序列号
    grid_colPlaceHolder = $('<div class="colPlaceHolder" style="width:10%"></div>'); //标识可放置单元格的位置
function gridDatasrcType(){
    var val = this.value;
    
}

/*function gridRow() {
    var n = this.value;
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        var rows = currCompsK.children('.muix-grid');
        var currN = rows.length;
        if (n > currN) {
            var newRow = rows.eq(0).clone();
            newRow.children('.muix-grid-cell').addClass('dashBorder').find('.container').empty().addClass('fill');
            for (var i = 0; i < n - currN; i++) {
                currCompsK.append(newRow.clone());
            }
        } else if (n < currN) {
            for (var i = n; i < currN; i++) {
                $(rows[i]).remove();
            }
        }
    }
}*/
function colDragstart(){
    var e = window.event || (arguments[0].originalEvent);
    dragingType = 'gridColSetting';
}
function colDrag() {
    var e = window.event || (arguments[0].originalEvent);
    var ele = $(e.target);
    grid_colPlaceHolder[0].style.width = ele[0].style.width;
    ele.after(grid_colPlaceHolder);
    grid_dragingColIdx = $('.col-edit-cell').index(ele);
    grid_dragingCol = ele.remove();
}

function colDragleave() {
    var e = window.event || (arguments[0].originalEvent);
    var x = e.pageX,
        y = e.pageY;
    var t = $('#colEditBox').offset().top,
        l = $('#colEditBox').offset().left,
        h = $('#colEditBox')[0].offsetHeight,
        w = $('#colEditBox')[0].offsetWidth;
    /* console.log(t,l,h,w);
     console.log(x,y);*/
    if (x <= l || x >= l + w || y <= t || y >= t + h) {
        //removeBar(grid_colPlaceHolder);
        $('.colPlaceHolder').addClass('transparent');
    }
}

/*function colDragover() {
    var e = window.event || (arguments[0].originalEvent);
    e.preventDefault();
    var ele = $(e.target);
    if (ele.hasClass('colPlaceHolder transparent')) {
        ele.removeClass('transparent');
    }
    if (ele.hasClass('col-edit-cell')) {
        var x = e.pageX;
        var eleL = ele.offset().left;
        var eleW = ele[0].offsetWidth;
        if (x - eleL < eleW / 2) {
            removeBar(grid_colPlaceHolder);
            ele.before(grid_colPlaceHolder);
            addBar(grid_colPlaceHolder);
        } else {
            removeBar(grid_colPlaceHolder);
            ele.after(grid_colPlaceHolder);
            addBar(grid_colPlaceHolder);
        }
    }
}*/

function removeBar(col) {
    var prevBar = col.prev();
    if (prevBar.length > 0) {
        prevBar.remove();
    } else {
        col.next().remove();
    }
}

function addBar(col) {
    var editBar = $('<div class="col-edit-bar">' +
        '<div class="col-edit-bar-btn"></div>' +
        '</div>');
    var prev = col.prev();
    if (prev.hasClass('col-edit-cell')) {
        col.before(editBar);
    }
    var next = col.next();
    if (next.hasClass('col-edit-cell')) {
        col.after(editBar);
    }
}

/*function colDrop() {
    var e = window.event || (arguments[0].originalEvent);
    var ele = $(e.target);
    var colPlaceHolder = $('.colPlaceHolder');
    var flag;
    if (!colPlaceHolder.hasClass('transparent') || (colPlaceHolder.hasClass('transparent') && $('.col-edit-cell').length < 1)) {
        flag = true;
    } else {
        var del = confirm('确定删除列以及包含的所有组件吗？');
        if (del) {
            removeBar(colPlaceHolder);
            colPlaceHolder.remove();
            deleteGridCell(grid_dragingColIdx);
            var extra = toInt(grid_dragingCol.html());
            var rest = 100 - extra;
            var cols = $('.col-edit-cell');
            var percent = 100;
            for (var i = 1; i < cols.length; i++) {
                var col = cols.eq(i);
                var w = toInt(col.html());
                w += Math.floor(extra * w / rest);
                col.width(w + '%').html(w + '%');
                percent -= w;
            }
            cols.eq(0).width(percent + '%').html(percent + '%');
            synGridWidth();
        } else {
            flag = true;
        }
    }
    if (flag) {
        colPlaceHolder.after(grid_dragingCol);
        colPlaceHolder.remove();
        moveGridCell(grid_dragingColIdx, $('.col-edit-cell').index(grid_dragingCol));
    }
}*/
var grid_isMouseDown, //鼠标在拖动条上点下的标志
    grid_bar, //当前拖动条
    grid_x, //鼠标在拖动条上点下时的x坐标位置
    grid_colTotalLen, //所有单元格总宽度（像素）
    grid_col1, //当前拖动条前一个单元格
    grid_col2, //当前拖动条后一个单元格
    grid_len1, //当前拖动条前一个单元格的宽度（像素）
    grid_totalPercent; //当前拖动条两侧单元格所占百分比总和
function colbarMousedown() {
    grid_isMouseDown = true;
    grid_colTotalLen = 0;
    $('.col-edit-cell').each(function (i, cell) {
        grid_colTotalLen += $(cell).width();
    });
    grid_col1 = $(this).parent().prev(), grid_col2 = $(this).parent().next();
    grid_len1 = $(grid_col1).width();
    grid_totalPercent = toInt($(grid_col1).html()) + toInt($(grid_col2).html());
    grid_bar = this;
    var e = window.event || (arguments[0].originalEvent);
    grid_x = e.pageX;
}

function colbarMousemove() {
    if (!grid_isMouseDown) {
        return;
    }
    var e = window.event || (arguments[0].originalEvent);
    var x2 = e.pageX;
    var deltaX = x2 - grid_x;
    var currPercentLen1 = toInt($(grid_col1).html()),
        currPercentLen2 = toInt($(grid_col2).html());
    if((deltaX<0 && (currPercentLen1 == 1 || currPercentLen1 == grid_totalPercent)) || (deltaX>0 && currPercentLen2 == 1)){
        return;
    }
    var left = toInt($(grid_bar).css('left'));
    $(grid_bar).css('left', left + deltaX);
    grid_x = x2;
    grid_len1 = grid_len1 + deltaX;
    var percentLen1 = Math.round(grid_len1 / grid_colTotalLen * 100);
    if(deltaX>0){
        percentLen1 = grid_totalPercent - percentLen1<1?grid_totalPercent-1:percentLen1;
    }else if(deltaX<0){
        percentLen1 = percentLen1<1?1:percentLen1;
    }
    if (percentLen1 - currPercentLen1 != 0) {
        var w1 = percentLen1 + '%',
            w2 = (grid_totalPercent - percentLen1) + '%';
        $(grid_col1).width(w1).html(w1);
        $(grid_col2).width(w2).html(w2);
        $(grid_bar).css('left', 6);
        synGridWidth();
    }
}

function colbarMouseup() {
    grid_isMouseDown = false;
}

function addCol() {
    var cols = $('.col-edit-cell');
    var percent = 100;
    for (var i = 0; i < cols.length; i++) {
        var col = cols.eq(i);
        var w = Math.round(toInt(col.html()) * 0.9);
        w = w > 1 ? w : 1;
        col.width(w + '%').html(w + '%');
        percent -= w;
    }
    var str = '<div class="col-edit-bar">' +
        '<div class="col-edit-bar-btn"></div>' +
        '</div>' +
        '<div class="col-edit-cell" style="width:' + percent + '%" draggable="true" >' + percent + '%</div>';
    $('#colEditBox').append(str);
    var dynIdx;
    if(currComp.children('.muix-grid').children('.muix-grid-cell').eq(0).is('[data-dynidx]')){
        dynIdx = ++pWin.dynIdx;
    }
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        var newCol = $('<div class="muix-grid-cell container empty"></div>');
        if(dynIdx){
            newCol.attr('data-dynidx',dynIdx);
        }
        currCompsK.children('.muix-grid').append(newCol);
    }
    
    gridSynData('add');
    
    synGridWidth();
}

function deleteGridCell(idx) {
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        var rows = currCompsK.children('.muix-grid');
        for (var j = 0; j < rows.length; j++) {
            rows.eq(j).children('.muix-grid-cell').eq(idx).remove();
        }
    }
    
    gridSynData('delete',idx);
}

function moveGridCell(idx1, idx2) {
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        var rows = currCompsK.children('.muix-grid');
        for (var j = 0; j < rows.length; j++) {
            var currCompCells = rows.eq(j).children('.muix-grid-cell');
            var cell = currCompCells.eq(idx1).remove();
            currCompCells = rows.eq(j).children('.muix-grid-cell');
            if (idx2 > currCompCells.length - 1) {
                currCompCells.eq(currCompCells.length - 1).after(cell);
            } else {
                currCompCells.eq(idx2).before(cell);
            }
        }
    }
    
    gridSynData('move',idx1, idx2);
}

function synGridWidth() {
    for(var k=0;k<currComps.length;k++){
        var currCompsK = currComps.eq(k);
        var rows = currCompsK.children('.muix-grid');
        var cols = $('.col-edit-cell');
        for (var j = 0; j < rows.length; j++) {
            var cells = rows.eq(j).children('.muix-grid-cell');
            for (var i = 0; i < cells.length; i++) {
                cells[i].style.width = cols[i].style.width;
            }
        }
    }
    
    gridSynData('width');
}
    /*多功能块属性设置*/
var div_obj; //当前组件中实际的块元素
var div_objs; //当前组件中实际的块元素（多个，在数据了表格中的情况）
function initSetting_div() {
    div_obj = currComp.children('.muix-div').eq(0);
    div_objs = currComps.children('.muix-div');
    //背景色
    var bgColorIpt = $('#divBgcolor');
    var bgColor = div_obj[0].style.backgroundColor;
    bgColor = bgColor?bgColor:'#FFFFFF';
    bgColorIpt[0].value = rgb2hex(bgColor);
    //圆角
    var radiusTL = div_obj.css('border-top-left-radius'),
        radiusTR = div_obj.css('border-top-right-radius'),
        radiusBR = div_obj.css('border-bottom-right-radius'),
        radiusBL = div_obj.css('border-bottom-left-radius');
    radiusTL = toInt(radiusTL);
    radiusTR = toInt(radiusTR);
    radiusBR = toInt(radiusBR);
    radiusBL = toInt(radiusBL);
    $('#divCornerTL')[0].value = radiusTL;
    $('#divCornerTR')[0].value = radiusTR;
    $('#divCornerBR')[0].value = radiusBR;
    $('#divCornerBL')[0].value = radiusBL;
    divCornerIptUpdate();
    //上边线
    var borderT = div_obj[0].style.borderTop;
    var borderWidthT = 0,borderStyleT = 'solid',borderColorT = '#DDDDDD';
    if(borderT){
        var a = parseBorder(borderT);
        borderWidthT = a[0];
        borderStyleT = a[1];
        borderColorT = a[2];
    }
    borderWidthT = toInt(borderWidthT);
    borderColorT = rgb2hex(borderColorT);
    $('#divBorderWidthT')[0].value = borderWidthT;
    $('#divBorderStyleT')[0].value = borderStyleT;
    $('#divBorderColorT')[0].value = borderColorT;
    //右边线
    var borderR = div_obj[0].style.borderRight;
    var borderWidthR = 0,borderStyleR = 'solid',borderColorR = '#DDDDDD';
    if(borderR){
        var a = parseBorder(borderR);
        borderWidthR = a[0];
        borderStyleR = a[1];
        borderColorR = a[2];
    }
    borderWidthR = toInt(borderWidthR);
    borderColorR = rgb2hex(borderColorR);
    $('#divBorderWidthR')[0].value = borderWidthR;
    $('#divBorderStyleR')[0].value = borderStyleR;
    $('#divBorderColorR')[0].value = borderColorR;
    //下边线
    var borderB = div_obj[0].style.borderBottom;
    var borderWidthB = 0,borderStyleB = 'solid',borderColorB = '#DDDDDD';
    if(borderB){
        var a = parseBorder(borderB);
        borderWidthB = a[0];
        borderStyleB = a[1];
        borderColorB = a[2];
    }
    borderWidthB = toInt(borderWidthB);
    borderColorB = rgb2hex(borderColorB);
    $('#divBorderWidthB')[0].value = borderWidthB;
    $('#divBorderStyleB')[0].value = borderStyleB;
    $('#divBorderColorB')[0].value = borderColorB;
    //左边线
    var borderL = div_obj[0].style.borderLeft;
    var borderWidthL = 0,borderStyleL = 'solid',borderColorL = '#DDDDDD';
    if(borderL){
        var a = parseBorder(borderL);
        borderWidthL = a[0];
        borderStyleL = a[1];
        borderColorL = a[2];
    }
    borderWidthL = toInt(borderWidthL);
    borderColorL = rgb2hex(borderColorL);
    $('#divBorderWidthL')[0].value = borderWidthL;
    $('#divBorderStyleL')[0].value = borderStyleL;
    $('#divBorderColorL')[0].value = borderColorL;
    
    divBorderWidthIptUpdate();
    divBorderStyleIptUpdate();
    divBorderColorIptUpdate();
    
    
    //宽度
    var wSel = $('#divWidth');
    var wIpt = $('#divWidthCustom');
    var w = div_obj[0].style.width;
    if (w) {
        wSel[0].value = 2;
        wIpt.removeClass('hide');
        wIpt[0].value = toInt(w);
    } else {
        wSel[0].value = 1;
        wIpt.addClass('hide');
    }
    //高度
    var hSel = $('#divHeight');
    var hIpt = $('#divHeightCustom');
    var h = div_obj[0].style.height;
    if (h) {
        hSel[0].value = 2;
        hIpt.removeClass('hide');
        hIpt[0].value = toInt(h);
    } else {
        hSel[0].value = 1;
        hIpt.addClass('hide');
    }
}
function parseBorder(str){
    var a;
    var rgbIdx = str.indexOf('rgb');
    if(rgbIdx<0){
        a = str.split(' ');
    }else{
        var str1 = str.substring(0,rgbIdx-1); 
        var str2 = str.substring(rgbIdx,str.length);
        a = str1.split(' ');
        a.push(str2);
    }
    return a;
}
function zero_fill_hex(num, digits) {
    var s = num.toString(16);
    while (s.length < digits)
        s = "0" + s;
    return s;
}

function rgb2hex(rgb) {
    if (rgb.charAt(0) == '#')
        return rgb;
    var ds = rgb.split(/\D+/);
    var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
    return "#" + zero_fill_hex(decimal, 6);
}

$('#divBgcolor').on('change', divBgcolor);

$('#divCorner').on('change', divCornerAll);
$('#divCornerTL').on('change', divCornerTL);
$('#divCornerTR').on('change', divCornerTR);
$('#divCornerBL').on('change', divCornerBL);
$('#divCornerBR').on('change', divCornerBR);

$('#divBorderWidth').on('change', divBorderWidthAll);
$('#divBorderWidthT').on('change', divBorderWidthT);
$('#divBorderWidthB').on('change', divBorderWidthB);
$('#divBorderWidthL').on('change', divBorderWidthL);
$('#divBorderWidthR').on('change', divBorderWidthR);

$('#divBorderStyle').on('change', divBorderStyleAll);
$('#divBorderStyleT').on('change', divBorderStyleT);
$('#divBorderStyleB').on('change', divBorderStyleB);
$('#divBorderStyleL').on('change', divBorderStyleL);
$('#divBorderStyleR').on('change', divBorderStyleR);

$('#divBorderColor').on('change', divBorderColorAll);
$('#divBorderColorT').on('change', divBorderColorT);
$('#divBorderColorB').on('change', divBorderColorB);
$('#divBorderColorL').on('change', divBorderColorL);
$('#divBorderColorR').on('change', divBorderColorR);

$('#divWidth').on('change', divWidth);
$('#divWidthCustom').on('change', divWidthCustom);
$('#divHeight').on('change', divHeight);
$('#divHeightCustom').on('change', divHeightCustom);

$('.showDetail').click(divShowDetail);

function divShowDetail(){
    divShowDetailAction($(this),$(this).is('.open')?'close':'open');
}

function divShowDetailAction(btn,statu){
    var btnId = btn.attr('id');
    var content;
    if(btnId=='divShowDetail_border'){
        content = $('#divBorderDetail');
    }else if(btnId=='divShowDetail_radius'){
        content = $('#divRadiusDetail');
    }
    if(statu == 'open'){
        btn.addClass('open');
        content.removeClass('none');
    }else if(statu == 'close'){
        btn.removeClass('open');
        content.addClass('none');
    }
}

function divSynData(type){
    switch(type){
        case 'color':{
            currData.bgColor = div_obj.css('background-color');
            break;
        }
        case 'radius':{
            var val = div_obj.css('border-radius');
            if(val){
                currData.radius = val;
            }else{
                delete currData.radius;
            }
            break;
        }
        case 'border-top':{
            currData.borderT = div_obj.css('border-top');
            break;
        }
        case 'border-right':{
            currData.borderR = div_obj.css('border-right');
            break;
        }
        case 'border-bottom':{
            currData.borderB = div_obj.css('border-bottom');
            break;
        }
        case 'border-left':{
            currData.borderL = div_obj.css('border-left');
            break;
        }
        case 'width':{
            var val = div_obj[0].style.width;
            if(val){
                currData.width = val;
            }else{
                delete currData.width;
            }
            break;
        }
        case 'height':{
            var val = div_obj[0].style.height;
            if(val){
                currData.height = val;
            }else{
                delete currData.height;
            }
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}

function divBgcolor() {
    div_objs.css('background-color', this.value);
    
    divSynData('color');
}

function divCornerIptUpdate(){
    var radiusTL = toInt(div_obj.css('border-top-left-radius')),
        radiusTR = toInt(div_obj.css('border-top-right-radius')),
        radiusBR = toInt(div_obj.css('border-bottom-right-radius')),
        radiusBL = toInt(div_obj.css('border-bottom-left-radius'));
    var divCornerIpt = $('#divCorner');
    if(radiusTL==radiusTR  && radiusTR==radiusBR && radiusBR==radiusBL){
        divCornerIpt[0].value = radiusTL;
    }else{
        divCornerIpt[0].value = '';
    }
}
function divCorner(val,n){
    var a = [
        div_obj.css('border-top-left-radius'),
        div_obj.css('border-top-right-radius'),
        div_obj.css('border-bottom-right-radius'),
        div_obj.css('border-bottom-left-radius'),
    ];
    var newRadius = '';
    if(n){
        for(var i=0;i<4;i++){
            if(i+1==n){
                newRadius += val;
            }else{
                newRadius += a[i];
            }
            if(i<3){
                newRadius += ' ';
            }
        }
    }else{
        newRadius = val+' '+val+' '+val+' '+val;
    }
    div_objs.css('border-radius', newRadius);
    
    if(n){
        divCornerIptUpdate();
    }
    divSynData('radius');
}

function divCornerAll(){
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    $('#divCornerTL,#divCornerTR,#divCornerBR,#divCornerBL').val(this.value);
    divCorner(this.value + 'px');
}

function divCornerTL() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divCorner(this.value + 'px',1);
}

function divCornerTR() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divCorner(this.value + 'px',2);
}

function divCornerBR() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divCorner(this.value + 'px',3);
}

function divCornerBL() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
   divCorner(this.value + 'px',4);
}

function divBorderWidthIptUpdate(){
    var borderT = div_obj[0].style.borderTop;
    var borderWidthT = toInt(borderT?parseBorder(borderT)[0]:0);
    
    var borderB = div_obj[0].style.borderBottom;
    var borderWidthB = toInt(borderB?parseBorder(borderB)[0]:0);
    
    var borderL = div_obj[0].style.borderLeft;
    var borderWidthL = toInt(borderL?parseBorder(borderL)[0]:0);
    
    var borderR = div_obj[0].style.borderRight;
    var borderWidthR = toInt(borderR?parseBorder(borderR)[0]:0);
    
    var divBorderWidthIpt = $('#divBorderWidth');
    if(borderWidthT==borderWidthB  && borderWidthB==borderWidthL && borderWidthL==borderWidthR){
        divBorderWidthIpt[0].value = borderWidthT;
    }else{
        divBorderWidthIpt[0].value = '';
    }
}
function divBorderStyleIptUpdate(){
    var borderT = div_obj[0].style.borderTop;
    var borderStyleT = borderT?parseBorder(borderT)[1]:'solid';
    
    var borderB = div_obj[0].style.borderBottom;
    var borderStyleB = borderB?parseBorder(borderB)[1]:'solid';
    
    var borderL = div_obj[0].style.borderLeft;
    var borderStyleL = borderL?parseBorder(borderL)[1]:'solid';
    
    var borderR = div_obj[0].style.borderRight;
    var borderStyleR = borderR?parseBorder(borderR)[1]:'solid';
    
    var divBorderStyleIpt = $('#divBorderStyle');
    if(borderStyleT==borderStyleB  && borderStyleB==borderStyleL && borderStyleL==borderStyleR){
        divBorderStyleIpt[0].value = borderStyleT;
    }else{
        divBorderStyleIpt[0].value = '';
    }
}
function divBorderColorIptUpdate(){
    var borderT = div_obj[0].style.borderTop;
    var borderColorT = rgb2hex(borderT?parseBorder(borderT)[2]:'#DDDDDD');
    
    var borderB = div_obj[0].style.borderBottom;
    var borderColorB = rgb2hex(borderB?parseBorder(borderB)[2]:'#DDDDDD');
    
    var borderL = div_obj[0].style.borderLeft;
    var borderColorL = rgb2hex(borderL?parseBorder(borderL)[2]:'#DDDDDD');
    
    var borderR = div_obj[0].style.borderRight;
    var borderColorR = rgb2hex(borderR?parseBorder(borderR)[2]:'#DDDDDD');
    
    var divBorderColorIpt = $('#divBorderColor');
    if(borderColorT==borderColorB  && borderColorB==borderColorL && borderColorL==borderColorR){
        divBorderColorIpt[0].value = borderColorT;
        divBorderColorIpt.removeClass('noValue');
    }else{
        divBorderColorIpt[0].value = '';
        divBorderColorIpt.addClass('noValue');
    }
}
function divBorder(val,pos,n,fromAll){
    var border = eval('div_obj[0].style.border'+pos);
    var a = ['0','solid','#DDDDDD'];
    if(border){
        a = parseBorder(border);
    }
    var newBorder = '';
    for(var i=0;i<3;i++){
        if(i+1==n){
            newBorder += val;
        }else{
            newBorder += a[i];
        }
        if(i<2){
            newBorder += ' ';
        }
    }
    eval('div_objs.css("border-'+pos.toLowerCase()+'", newBorder)');
    
    if(!fromAll){
        if(n==1){
            divBorderWidthIptUpdate();
        }else if(n==2){
            divBorderStyleIptUpdate();
        }else if(n==3){
            divBorderColorIptUpdate();
        }
    }
    divSynData('border-'+pos.toLowerCase());
}

function divBorderWidthAll(){
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    $('#divBorderWidthT,#divBorderWidthB,#divBorderWidthL,#divBorderWidthR').val(this.value);
    divBorder(this.value + 'px','Top',1,true);
    divBorder(this.value + 'px','Bottom',1,true);
    divBorder(this.value + 'px','Left',1,true);
    divBorder(this.value + 'px','Right',1,true);
}
function divBorderStyleAll(){
    $('#divBorderStyleT,#divBorderStyleB,#divBorderStyleL,#divBorderStyleR').val(this.value);
    divBorder(this.value,'Top',2,true);
    divBorder(this.value,'Bottom',2,true);
    divBorder(this.value,'Left',2,true);
    divBorder(this.value,'Right',2,true);
}
function divBorderColorAll(){
    $(this).removeClass('noValue');
    $('#divBorderColorT,#divBorderColorB,#divBorderColorL,#divBorderColorR').val(this.value);
    divBorder(this.value,'Top',3,true);
    divBorder(this.value,'Bottom',3,true);
    divBorder(this.value,'Left',3,true);
    divBorder(this.value,'Right',3,true);
}

function divBorderWidthT() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divBorder(this.value + 'px','Top',1);
}

function divBorderStyleT() {
    divBorder(this.value,'Top',2);
}

function divBorderColorT() {
    divBorder(this.value,'Top',3);
}

function divBorderWidthB() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divBorder(this.value + 'px','Bottom',1);
}

function divBorderStyleB() {
    divBorder(this.value,'Bottom',2);
}

function divBorderColorB() {
    divBorder(this.value,'Bottom',3);
}

function divBorderWidthL() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divBorder(this.value + 'px','Left',1);
}

function divBorderStyleL() {
    divBorder(this.value,'Left',2);
}

function divBorderColorL() {
    divBorder(this.value,'Left',3);
}

function divBorderWidthR() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    divBorder(this.value + 'px','Right',1);
}

function divBorderStyleR() {
    divBorder(this.value,'Right',2);
}

function divBorderColorR() {
    divBorder(this.value,'Right',3);
}

function divWidth() {
    var val = this.value;
    var ipt = $('#divWidthCustom');
    if (val == '1') {
        ipt.addClass('hide');
        div_objs.css('width', '');
    } else if (val == '2') {
        ipt.removeClass('hide');
        var w = div_obj.css('width');
        div_objs.css('width', w);
        ipt[0].value = toInt(w);
    }
    
    divSynData('width');
}

function divWidthCustom() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    div_objs.css('width', this.value);
    
    divSynData('width');
}

function divHeight() {
    var val = this.value;
    var ipt = $('#divHeightCustom');
    if (val == '1') {
        ipt.addClass('hide');
        div_objs.css({'height': '','min-height': ''});
    } else if (val == '2') {
        ipt.removeClass('hide');
        var h = div_obj.css('height');
        div_objs.css({'height': h,'min-height': h});
        ipt[0].value = toInt(h);
    }
    
    divSynData('height');
}

function divHeightCustom() {
    if(!isNumber(this.value) || this.value<0){
        this.value = 0;
    }
    var h = this.value + 'px';
    div_objs.css({'height': h,'min-height': h});
    
    divSynData('height');
}
    /*文本属性设置*/
var editor;
KindEditor.ready(function(K) {
        editor = K.create('#textEditor',{
				filterMode : false,
                themeType : 'simple',
                resizeType :  1,
                minHeight : 160,
                autoHeightMode : true,
                newlineTag : 'br',
                fontSizeTable : ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px'],
                colorTable : [
['#FFFFFF', '#000000', '#EEECE0', '#1F487C', '#5182BD', '#BE4E4A', '#9BBB58', '#8164A4', '#4AACC5', '#F79647'],
['#F2F2F2', '#7F7F7F', '#DED9C3', '#C7D9F1', '#DBE5F1', '#F1DCDB', '#ECF1DD', '#E3E0E9', '#DBEEF4', '#FDEADB'],
['#D8D8D8', '#595959', '#C5BD98', '#8DB3E2', '#B8CCE4', '#E3BAB8', '#D5E4BB', '#CDC1D9', '#B6DCE7', '#FCD5B6'],
['#BFBFBF', '#3F3F3F', '#938A53', '#558ED5', '#95B3D7', '#DA9695', '#C3D69E', '#B2A2C7', '#8FCDDA', '#FAC293'],
['#A5A5A5', '#262626', '#494329', '#16365D', '#376193', '#953735', '#76923D', '#604A7B', '#30859A', '#E36C08'],
['#7F7F7F', '#0C0C0C', '#1C1A0E', '#102540', '#21405F', '#602322', '#51622B', '#3E3053', '#205867', '#964705'],
['#BF0101', '#FD0000', '#FFC000', '#FFFF00', '#91D04E', '#00AF50', '#01B0F3', '#0272BE', '#022161', '#7131A1']
                         ],
                /*items : [
                    'fontname', 'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'lineheight',
                    'justifyleft', 'justifycenter', 'justifyright', 'removeformat', '|', 'link', 'unlink'],*/
            items : [
                    'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', '|' ,'lineheight',
                    'justifyleft', 'justifycenter', 'justifyright', '|','removeformat', '|','nightmode'],
            htmlTags : {
                span : [
                    '.color', '.background-color', '.font-size', '.font-family','.font-weight', '.font-style', '.text-decoration', '.line-height'
                ],
                'br' : [],
            },
            afterChange:textChange
        });
});
var text_obj; //当前组件中实际的文本元素
var text_objs; //当前组件中实际的文本元素(多个，在数据表格中的情况)
var text_datasrc;  //所属数据表格的数据源
var editorDoc;  //编辑器的document
function initSetting_text() {
    editorDoc = $('iframe.ke-edit-iframe').contents();
    text_obj = currComp.children('.muix-text').eq(0);
    text_objs = currComps.children('.muix-text');
    //var inHeader = $('#phonecontent').contents().find('#root_1').find(currComp).length>0;
    var dynidx = currComp.attr('data-dynidx');
    var activeVal = 'hand';
    //if(inHeader || dynidx){
	if(dynidx){
        $('#textContentType').removeClass('none');
        $('.textCT[data-value!="hand"]').addClass('none');
        $('[id^=textDatasrcType_]').addClass('none');
        /*if(inHeader){
            $('.textCT[data-value="pagename"]').removeClass('none');
            activeVal = currComp.attr('data-ispagename') ? 'pagename' : 'hand';
        }else{*/
            var listComp = $('#phonecontent').contents().find('#'+currComp.attr('data-listid'));
            var listSrctype = listComp.attr('data-srctype');
            text_datasrc = pWin.dataSrcs[listSrctype][listComp.attr('data-srcsubtype')];
            $('.textCT[data-value="'+listSrctype+'"]').removeClass('none');
            $('#textDatasrcType_'+listSrctype).removeClass('none');
            var srcfield = currComp.attr('data-srcfield');
            activeVal = srcfield ? listSrctype : 'hand';
            if(srcfield){
                var selEle = $('[id^=textDatasrcType_]').not('.none').find('select');
                if(srcfield==0){
                    srcfield = selEle.find('option').eq(0).attr('value');
                }
                selEle.val(srcfield);
            }
        //}
    }else{
        $('#textContentType').addClass('none');
    }
    var html = text_obj.html();
    editor.html(html);
    if(NV.name != 'firefox'){
    	editor.exec('selectall');
    }
    if(activeVal){
        $('input[name=textCtIpt][value="' + activeVal + '"]').click();
    }
    var kdDoc = $('iframe.ke-edit-iframe').contents();
    kdDoc.find('body').css('line-height',text_obj[0].style.lineHeight);
    
    var alignVal = currData.align;
    kdDoc.find('body').css('text-align',alignVal);
    $('.ke-outline[data-name^=justify]').removeClass('ke-on ke-selected');
    $('.ke-outline[data-name=justify'+alignVal+']').addClass('ke-on ke-selected');
}
$('input[name=textCtIpt]').on('change', textCtIpt);
$('[id^=textDatasrcType_] select').on('change', textDatasrcType);

function textSynData(type){
    switch(type){
        case 'html':{
            currData.html = text_obj.html();
            break;
        }
        case 'srcField':{
            var val = currComp.attr('data-srcfield');
            if(val){
                currData.srcField = val;
            }else{
                delete currData.srcField;
            }
            break;
        }
        case 'ispagename':{
            var val = currComp.attr('data-ispagename');
            if(val){
                currData.ispagename = 1;
            }else{
                delete currData.ispagename;
            }
            break;
        }  
        case 'lineHeight':{
            currData.lineHeight = text_obj[0].style.lineHeight;
            break;
        }
        default:{
            break;
        }
    }
    ////console.log(JSON.stringify(pWin.pageData));
}

function textLineheight(val){
    text_objs.css('line-height',val);
    
    textSynData('lineHeight');
}

function textDatasrcType() {
    var val = this.value;
    currComp.attr('data-srcfield', val);
    editor.html(textGetHtml(text_datasrc[0][val]));
    editor.exec('selectall');
    
    textSynData('srcField');
}

function textToggleEditor(editable){
    if(editable){
        $('#textDatasrcTypeWrapper').addClass('none');
        $('.ke-edit').removeClass('noEdit');
    }else{
        $('#textDatasrcTypeWrapper').removeClass('none');
        $('.ke-edit').addClass('noEdit');
    }
}

function textCtIpt() {
    try{
        var sel = this.value;
        if (sel == 'hand') {
            textToggleEditor(true);
            currComp.removeAttr('data-srcfield').removeAttr('data-ispagename');
        }else{
            var newText;
            textToggleEditor(false);
            if(sel=='pagename'){
                newText = pWin.pageData.name;
                currComp.attr('data-ispagename','true');
            }else{
                var field = $('[id^=textDatasrcType_]').not('.none').find('select')[0].value;
                newText = text_datasrc[0][field];
                currComp.attr('data-srcfield', field);
            }
            editor.html(textGetHtml(newText));
        }
        editor.exec('selectall');

        textSynData('srcField');
        textSynData('ispagename');
    }catch(e){
        
    }
}

function textChange() {
    if (!editor) {
        return;
    }
    var html = editor.html();
    //console.log($('iframe.ke-edit-iframe').contents().find('body').html());
    text_objs.html(html);
    var field = currComp.attr('data-srcfield');
    if(field){
        try{
            textReplaceDynField(currComps,text_datasrc,field);
        }catch(e){
            
        }
    }
    
    textSynData('html');
}

function textReplaceDynField(comps,src,field){
    for(var i=0;i<comps.length;i++){
        comps.eq(i).find('.muix-text').html(textGetHtml(src[i][field]));
    }
    
    textSynData('html');
}

function textGetHtml(text,par){
    var root;
    if(par){
        root = par;
    }else{
        root = editorDoc.find('body')[0];
    }
    var tNode = textGetTextNode(root);
    var newRoot = $('<div></div>');
    if(tNode && tNode!=root){
        var alignWrap,styleWrap;
        var obj = $(tNode);
        var styles = {};
        while(!(obj.is('body') || !obj || !obj[0])){
            if(obj.is('div,p')){
                var textAlign = obj.css('text-align');
                if(textAlign){
                    if(!alignWrap){
                        alignWrap = $('<div style="text-align:'+textAlign+'"></div>');
                    }
                }
            }else if(obj.is('span')){
                var style = obj.attr('style');
                if(style){
                    var arry = style.split(';');
                    for(var i=0;i<arry.length;i++){
                        var aI = arry[i];
                        if(aI.indexOf(':')>0){
                            var a = aI.split(':'),
                                key = trim(a[0]),
                                val = trim(a[1]);
                            if(!styles[key]){
                                styles[key] = val;
                            }
                        }
                    }
                }
            }else if(obj.is('b')){
                styles['font-weight'] = 'bold';
            }else if(obj.is('u')){
                styles['text-decoration'] = 'underline';
            }else if(obj.is('i')){
                styles['font-style'] = 'italic';
            }else if(obj.is('font')){
            	var co = obj.attr('color');
            	if(co){
                	styles['color'] = co;
            	}
            }
            obj = obj.parent();
        }
        if(styles.length!={}){
            styleWrap = $('<span></span>');
            for(key in styles){
                styleWrap.css(key,styles[key]);
            }
        }
    }
    var wrap = newRoot;
    if(alignWrap){
        wrap.append(alignWrap);
        wrap = alignWrap;
    }
    if(styleWrap){
        wrap.append(styleWrap);
        wrap = styleWrap;
    }
    wrap.html(text);
    return newRoot.html();
}

function textCheckNull(str){
    return /^[\s|\u200b]*$/.test(str);
}

function textGetTextNode(par){
    var nodes = par.childNodes;
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        if(node.nodeType==3){
            var val = node.nodeValue;
            if(!textCheckNull(val)){
                return par;
            }
        }else if(node.nodeType==1){
            var sub = textGetTextNode(node);
            if(sub){
                return sub;
            }
        }
    }
    return null;
}
    /*图片属性设置*/
var image_obj; //当前组件中实际的图片元素
var image_objs; //当前组件中实际的图片元素(多个，在数据表格中的情况)
var image_desc; //当前组件中图片文字描述(多个，在数据表格中的情况)
var image_srcList;
var image_datasrc;
function initSetting_image() {
    image_obj = currComp.children('img').eq(0);
    image_objs = currComps.children('img');
    image_desc = currComp.children('.imageDesc').eq(0);
    image_descs = currComps.children('.imageDesc');
    if (currComp.attr('data-dynidx')) {
        var listComp = currComp;
        while(listComp && listComp[0] && !listComp.hasClass('root-container')){
            if(listComp.hasClass('comp_list')){
                image_srcList = listComp;
                var listSrctype = listComp.attr('data-srctype');
                image_datasrc = pWin.dataSrcs[listSrctype][listComp.attr('data-srcsubtype')];
                break;
            }
            listComp = listComp.parent();
        } 
        $('#imageDynData').removeClass('none');
        var srcfield = currComp.attr('data-srcfield');
        if(srcfield){
            $('#imageDynData input').prop('checked',true);
            $('#imageSrc').attr('disabled','');
        }else{
            $('#imageDynData input').prop('checked',false);
            $('#imageSrc').removeAttr('disabled');
        }
    } else {
        $('#imageDynData').addClass('none');
        $('#imageSrc').removeAttr('disabled');
    }
    var desc = '';
    if (!image_desc.hasClass('none')) {
        desc = image_desc.html();
    }
    $('#imageDesc')[0].value = desc;
    
    //宽度
    var wSel = $('#imageWidth');
    var wIpt = $('#imageWidthCustom');
    var w = image_obj[0].style.width;
    if(w){
        if (w == '100%') {
            wSel[0].value = 3;
            wIpt.addClass('hide');
        } else {
            wSel[0].value = 2;
            wIpt.removeClass('hide');
            wIpt[0].value = toInt(w);
        }
    }else{
        wSel[0].value = 1;
        wIpt.addClass('hide');
    }
    //高度
    var hSel = $('#imageHeight');
    var hIpt = $('#imageHeightCustom');
    var h = image_obj[0].style.height;
    if (h) {
        hSel[0].value = 2;
        hIpt.removeClass('hide');
        hIpt[0].value = toInt(h);
    } else {
        hSel[0].value = 1;
        hIpt.addClass('hide');
    }
}

var image_Wrap = $('#imageWrap'), image_loading = $('#imageWinLoading');
var image_NailH = 140;
var image_idx = 0, image_reqing = false, image_reqCnt = 35, image_allLoaded = false;

$('#imageSrc').on('click',imageSrcOpen);
$('#imageDynData input').on('change', imageDynData);
$('#imageDesc').on('change', imageDesc);
$('#imageWidth').on('change', imageWidth);
$('#imageWidthCustom').on('change', imageWidthCustom);
$('#imageHeight').on('change', imageHeight);
$('#imageHeightCustom').on('change', imageHeightCustom);
$('#imageWin .bgMask').on('click',imageSrcClose);
$('#imageWinBody').on('scroll',imageWinBodyScroll);
image_Wrap.on('click','.imageNail',imageNailClick)
            .on('dblclick','.imageNail',imageNailDblClick);
$('#imageConfirm').on('click',imageConfirm);
$('#imageCanel').on('click',imageCanel);
$('#imageWin').on('click',imageWinClick);

function imageWinClick(){
    window.event.stopPropagation();
    $('.imageNail.active').removeClass('active');
    $('.imageCateDelBtn').remove();
    $('.imageCate.delete').removeClass('delete');
    $('#imageDelete, #imageCopyto, #imageMoveto').attr('disabled','');
}
function imageCanel(){
    imageSrcClose();
}
function imageConfirm(){
    var src = $('.imageNail.active img').attr('src');
    image_objs.attr('src',src);
    imageSrcClose();
    
    imageSynData('src',src);
}
function imageNailDblClick(e){
	e.stopPropagation();
    $('.imageNail.active').removeClass('active');
    $(this).addClass('active');
    imageConfirm();
}
function imageNailClick(){
    var e = window.event || (arguments[0].originalEvent);
    e.stopPropagation();
    var self = $(this), currSels = $('.imageNail.active');
    var ctrlMode = false, shiftMode = false;
    if($('#imageWin').is('.manage')){
        if(e.ctrlKey==1){
            ctrlMode = true;
        }else if(e.shiftKey==1){
            shiftMode = true;
        }
    }
    if(ctrlMode){
        if(self.is('.active')){
            self.removeClass('active');
        }else{
            self.addClass('active');
        }
    }else if(shiftMode){
        var all = $('.imageNail');
        var startIdx = all.index(currSels.eq(0)), endIdx = all.index(currSels.eq(currSels.length-1));
        var selIdx = all.index(self);
        var sIdx = startIdx, eIdx = endIdx;
        if(selIdx<startIdx){
            sIdx = selIdx;
        }else if(selIdx>endIdx){
            eIdx = selIdx;
        }
        for(var i=sIdx;i<=eIdx;i++){
            all.eq(i).addClass('active');
        }
    }else{
        currSels.removeClass('active');
        self.addClass('active');
    }
    if($('.imageNail.active').length>0){
        $('#imageDelete, #imageCopyto').removeAttr('disabled');
        if(!$('#imageCate_1').is('.active')){
            $('#imageMoveto').removeAttr('disabled');
        }
    }else{
        $('#imageDelete, #imageCopyto, #imageMoveto').attr('disabled','');
    }
}
function imageSrcClose(){
    image_idx = 0, image_reqing = false, image_allLoaded = false;
    $('#imageWin').addClass('none');
}
function imageWinBodyScroll(){
    var wrap = $(this),
        t = wrap.scrollTop(),
        h = wrap.height(),
        sh = this.scrollHeight;
    if(sh-t-h<image_NailH){
        imageAJAXRequestImage();
    }
}
function imageSrcOpen(){
    /*var popWinH = $('#imageWin').height(),
        visiH = $(window).height();
    $('#imageWin').removeClass('none').css('top',visiH>popWinH?30:0);*/
    $('#imageWin').removeClass('none');
    image_Wrap.empty();
    imageAJAXRequestImage();
}
function imageAJAXRequestImage(){
    if(image_reqing || image_allLoaded){
        return;
    }
    image_loading.removeClass('none');
    hideTips('imageWinBody');
    image_reqing = true;
    AJAXRequestImage('requestImageCb',image_idx,image_reqCnt);
}
function requestImageCb(d){
    image_loading.addClass('none');
    image_reqing = false;
    var data = JSON.parse(d);
    if(data.statu){
	    var imgs = data.imgs;
	    var len = imgs.length;
	    if(len==0){
	        image_allLoaded = true;
	        if(image_idx==0){
	        	showTips('imageWinBody','还没有上传图片，<a href="javascript:;">去上传</a>');
	        }
	        return;
	    }
	    if(len<image_reqCnt){
	        image_allLoaded = true;
	    }
	    for(var i=0;i<len;i++){
	        image_idx++;
	        var img = imgs[i];
	        image_Wrap.append('<div class="imageNail">'+
	                                '<img src="'+img.url+'" alt="">'+
	                                '<div class="imageNailName">'+img.title+'</div>'+
	                            '</div>');
	    }
    }else{
    	if(image_idx==0){
    		showTips('imageWinBody','获取失败，请检查网络后<a href="javascript:;">重试</a>');
    	}
    }
}
function imageSynData(type,value){
    switch(type){
        case 'srcField':{
            var val = currComp.attr('data-srcfield');
            if(val){
                currData.srcField = val;
            }else{
                delete currData.srcField;
            }
            break;
        }
        case 'desc':{
            if(image_desc.hasClass('none')){
                delete currData.desc;
            }else{
                currData.desc = image_desc.html();
            }
            break;
        }
        case 'width':{
            var val = image_obj[0].style.width;
            if(val){
                currData.width = val;
            }else{
                delete currData.width;
            }
            break;
        }
        case 'height':{
            var val = image_obj[0].style.height;
            if(val){
                currData.height = val;
            }else{
                delete currData.height;
            }
            break;
        }
        case 'src':{
            var val;
            if(value){
                val = value;
            }else{
                val = image_obj[0].src;
            }
            currData.src = val;
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
function imageDynData(){
    var checked  = $(this).is(':checked');
    if(checked){
        $('#imageSrc').attr('disabled','');
        currComp.attr('data-srcfield','img');
        pWin.updateSrcfield(currComp,image_datasrc,image_srcList);
    }else{
        $('#imageSrc').removeAttr('disabled');
        currComp.removeAttr('data-srcfield');
        image_objs.attr('src','images/image.jpg');
    }
    initSetting_common_link();
    
    imageSynData('srcField');
}
function imageDesc() {
    var desc = this.value;
    desc = desc.replace(/\s+/g, '');
    if (desc == '') {
        image_descs.addClass('none');
    } else {
        image_descs.html(desc).removeClass('none');
    }
    
    imageSynData('desc');
}

function imageWidth() {
    var val = this.value;
    var wIpt = $('#imageWidthCustom');
    if (val == '1') {
        wIpt.addClass('hide');
        image_objs.css('width', '');
    } else if (val == '2') {
        wIpt.removeClass('hide');
        var w = image_obj[0].width;
        wIpt[0].value = w;
        image_objs.css('width', w);
    } else  if (val == '3'){
        wIpt.addClass('hide');
        image_objs.css('width', '100%');
        wIpt[0].value = toInt(image_obj.css('width'));
    }
    
    imageSynData('width');
}
function imageWidthCustom() {
    if(!isNumber(this.value) || this.value<1){
        this.value = 1;
    }
    image_objs.css('width', this.value);
    
    imageSynData('width');
}

function imageHeight() {
    var val = this.value;
    var hIpt = $('#imageHeightCustom');
    if (val == '1') {
        hIpt.addClass('hide');
        image_objs.css('height', '');
    } else if (val == '2'){
        hIpt.removeClass('hide');
        var h = image_obj[0].height;
        hIpt[0].value = h;
        image_objs.css('height', h);
    }
    
    imageSynData('height');
}

function imageHeightCustom() {
    if(!isNumber(this.value) || this.value<1){
        this.value = 1;
    }
    image_objs.css('height', this.value);
    
    imageSynData('height');
}
    /*图标属性设置*/
var icon_obj; //当前组件中实际的图标元素
var icon_objs; //当前组件中实际的图标元素(多个，数据表格中的情况)
function initSetting_icon() {
    icon_obj = currComp.children('.mui-icon').eq(0);
    icon_objs = currComps.children('.mui-icon');
    $('#iconColor')[0].value = rgb2hex(icon_obj.css('color'));
    $('#iconSize')[0].value = toInt(icon_obj.css('font-size'));
}
$('#iconShape').on('click', iconShape);
$('#iconSetting').on('click', closeIconPopup);
$('#iconColor').on('change', iconColor);
$('#iconPopup').on('click', '.wrapper', selIcon);
$('#iconSize').on('change', iconSize);

function iconSynData(type){
    switch(type){
        case 'shape':{
            currData.shape = icon_obj.attr('class').replace('mui-icon mui-icon-','');
            break;
        }
        case 'color':{
            currData.color = icon_obj.css('color');
            break;
        }
        case 'size':{
            currData.size = icon_obj.css('font-size');
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}

function iconSize(){
    if(!isNumber(this.value) || this.value<12){
        this.value = 12;
    }
    var size = this.value +'px';
    icon_objs.css({'font-size':size,'width':size,'height':size});
    
    iconSynData('size');
}

function iconShape() {
    openIconPopup();
}

function openIconPopup() {
    $('#iconPopup').removeClass('none');
}

function closeIconPopup() {
    var e = window.event || (arguments[0].originalEvent);
    var ele = e.target;
    if (ele.id == 'iconShape') {
        return;
    }
    $('#iconPopup').addClass('none');
}

function selIcon() {
    var iconClass = $(this).find('.mui-icon').attr('class').split(' ')[1];
    icon_objs.removeClass().addClass('mui-icon ' + iconClass);
    
    iconSynData('shape');
}

function iconColor() {
    icon_objs.css('color', $('#iconColor')[0].value);

    iconSynData('color');
}
    /*轮播页属性设置*/
var slider_obj; //当前组件中实际的轮播页元素
var slider_pageSize; //页数
var slider_dotObj; //页码元素
function initSetting_slider() {
    slider_obj = currComp.children('.mui-slider').eq(0);
    slider_pageSize = slider_obj.find('.mui-slider-item').length;
    slider_dotObj = slider_obj.children('.mui-slider-indicator').eq(0);
    var val = '0';
    if (slider_dotObj.hasClass('none')) {
        val = '2';
    } else {
        if (slider_dotObj.hasClass('right')) {
            val = '1';
        }
    }
    $('input[name=sliderDot][value=' + val + ']')[0].checked = true;
    var autoplay = slider_obj.attr('data-autoplay');
    var autoplayVal = autoplay ? '1' : '0';
    $('#sliderPlaytime input')[0].value = autoplay ? parseFloat(autoplay) : 3;
    $('input[name=sliderAutoplay][value=' + autoplayVal + ']')[0].click();
}
$('#sliderAdd').on('click', sliderAdd);
$('#sliderDel').on('click', sliderDel);
$('input[name=sliderDot]').on('change', sliderDot);
$('input[name=sliderAutoplay]').on('change', sliderAutoplay)
    .on('click',function(e){
        e.stopPropagation();
    });
$('#sliderPlaytimeIpt').on('change', sliderPlaytime);

function sliderSynData(type,deleteIdx){ //deleteIdx：删除页时，删除页的序号
    switch(type){
        case 'add':{
            currData.containers.push({});
            break;
        }
        case 'delete':{
            currData.containers.splice(deleteIdx,1);
            break;
        }
        case 'indicator':{
            var none = slider_dotObj.hasClass('none'),
                right = slider_dotObj.hasClass('right');
            if(none){
                currData.indicator = 'none';
            }else if(right){
                currData.indicator = 'right';
            }else{
                delete currData.indicator;   
            }
            break;
        }
        case 'autoplay':{
            var autoplay = slider_obj.attr('data-autoplay');
            if(autoplay==undefined){
                delete currData.autoplay;
            }else{
                currData.autoplay = autoplay;
            }
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}

function sliderAutoplay() {
    var val = this.value;
    if (val == '1') {
        $('#sliderPlaytime').removeClass('none');
        slider_obj.attr('data-autoplay', $('#sliderPlaytime input')[0].value);
    } else {
        $('#sliderPlaytime').addClass('none');
        slider_obj.removeAttr('data-autoplay');
    }
    
    sliderSynData('autoplay');
}

function sliderPlaytime() {
    slider_obj.attr('data-autoplay', this.value);
    
    sliderSynData('autoplay');
}

function sliderDot() {
    var val = this.value;
    if (val == '2') {
        slider_dotObj.addClass('none');
    } else {
        slider_dotObj.removeClass('none');
        if (val == '1') {
            slider_dotObj.addClass('right');
        } else {
            slider_dotObj.removeClass('right');
        }
    }
    
    sliderSynData('indicator');
}

function sliderAdd() {
    slider_pageSize++;
    var tool = $('<div class="comp_tool">第' + slider_pageSize + '页</div>');
    currComp.children('.comp_toolbar').append(tool);
    slider_obj.children('.mui-slider-group').append('<div class="mui-slider-item container empty"></div>');
    slider_obj.children('.mui-slider-indicator').append('<div class="mui-indicator"></div>');
    pWin.sliderSelectPage(tool);
    
    if(slider_pageSize==3){
        $('#sliderDel').removeAttr('disabled');
    }  
    if(slider_pageSize==7){
        $(this).attr('disabled','');
    } 
    
    sliderSynData('add');
}

function sliderDel() {
        var del = confirm('确定删除页以及包含的所有组件吗？');
        if (del) {
            slider_pageSize--;
            var toolbar = currComp.children('.comp_toolbar');
            var delTool = toolbar.find('.comp_tool.active');
            var activeItem = slider_obj.children('.mui-slider-group').find('.mui-slider-item:not(.none)'),
                deleteIdx = slider_obj.children('.mui-slider-group').find('.mui-slider-item').index(activeItem);
            slider_obj.children('.mui-slider-group').find('.mui-slider-item:not(.none)').remove();
            slider_obj.children('.mui-slider-indicator').find('.mui-indicator.mui-active').remove();

            var prev = delTool.prev();
            var selTool;
            if (prev.length > 0) {
                selTool = prev;
            } else {
                selTool = delTool.next();
            }
            delTool.remove();
            pWin.sliderSelectPage(selTool);
            for (var i = 0; i < slider_pageSize; i++) {
                toolbar.find('.comp_tool').eq(i).html('第' + (i + 1) + '页');
            }
            
            if(slider_pageSize==2){
                $(this).attr('disabled','');
            }
            if(slider_pageSize==6){
                $('#sliderAdd').removeAttr('disabled');
            }
            
            sliderSynData('delete',deleteIdx);
        }
    }
/*数据表格属性设置*/
function initSetting_list() {
    var firstCol = currComp.children('.mui-row').eq(0).children('.muix-col').eq(0);
    $('#listRowCnt').val(currComp.children('.mui-row').length);
    for(key in listColClassName){
        if(firstCol.hasClass(listColClassName[key])){
            $('#listColCnt').val(key);
            break;
        }
    }
    
    var srcType = currComp.attr('data-srctype');
    $('[id^=listSrcType_]').addClass('none');
    $('#listSrcType_'+srcType).removeClass('none');
    initSrcSubtypeSel(srcType);
    
    var infinite = currComp.attr('data-infinite');
    if(infinite){
        $('#listInfinite')[0].checked = true;
    }else{
        $('#listInfinite')[0].checked = false;
    }
}
function listSynData(type){ 
    switch(type){
        case 'rowCnt':{
            currData.rowCnt = currComp.children('.mui-row').length;
            break;
        }
        case 'colCnt':{
            currData.colCnt = currComp.children('.mui-row').eq(0).children('.muix-col').length;
            break;
        }
        case 'srcType':{
            currData.srcType = currComp.attr('data-srctype');
            break;
        }
        case 'srcSubtype':{
            currData.srcSubtype = currComp.attr('data-srcsubtype');
            break;
        }
        case 'infinite':{
            var infinite =  currComp.attr('data-infinite');
            if(infinite==undefined){
                delete currData.infinite;
            }else{
                currData.infinite = 1;
            }
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}

$('#listRowCnt').on('change',listRowCnt);
$('#listColCnt').on('change',listColCnt);
$('#listSrcType').on('change',listSrcType);
$('[id^=listSrcType_] select').on('change',listSrcSubtype);
$('#listInfinite').on('change',listInfinite);

function listInfinite(){
    if(this.checked){
        currComp.attr('data-infinite','1');
    }else{
        currComp.removeAttr('data-infinite');
    }
    
    listSynData('infinite');
}
function listRowCnt(){
    if(!isNumber(this.value) || this.value<1){
        this.value = 1;
    }
    var cnt = this.value;
    currComp.attr('data-rowcnt',cnt);
    var rows = currComp.children('.mui-row');
    var n = rows.length;
    if(cnt>n){
        for(var i=n;i<cnt;i++){
            currComp.append(rows.eq(0).clone());
        }
    }else if(cnt<n){
        for(var i=n;i>=cnt;i--){
            rows.eq(i).remove();
        }
    }
    pWin.updateSrcfield(currComp,pWin.dataSrcs[currComp.attr('data-srctype')][currComp.attr('data-srcsubtype')],currComp);
    
    listSynData('rowCnt');
}
function listColCnt(){
    if(!isNumber(this.value) || this.value<1){
        this.value = 1;
    }
    var cnt = this.value;
    var rows = currComp.children('.mui-row'),
        rowCnt = rows.length,
        row = rows.eq(0),
        cols = row.children('.muix-col'),
        colCnt = cols.length,
        col = cols.eq(0),
        newCol = col.clone().removeClass(listColClassName[colCnt]).addClass(listColClassName[cnt]),
        newRow = $('<div class="mui-row"></div>');
    for(var i=0;i<cnt;i++){
        newRow.append(newCol.clone());
    }
    currComp.empty();
    for(var i=0;i<rowCnt;i++){
        currComp.append(newRow.clone());
    }
    pWin.updateSrcfield(currComp,pWin.dataSrcs[currComp.attr('data-srctype')][currComp.attr('data-srcsubtype')],currComp);
    
    listSynData('colCnt');
}
function listSrcType(){
    var srcType = this.value;
    currComp.attr('data-srctype',srcType);
    $('[id^=listSrcType_]').addClass('none');
    $('#listSrcType_'+srcType).removeClass('none');
    
    initSrcSubtypeSel(srcType);
    
    currComp.attr('data-srcsubtype','0');
    $('#listSrcType_'+srcType+' select').val('0');
    
    currComp.find('[data-srcfield]').removeAttr('data-srcfield');
    
    listSynData('srcType');
}
function initSrcSubtypeSel(srcType){
    typeReqing = srcType;
    $('#listSrcType').val(typeReqing);
    AJAXRequestType(requestTypeSuc,requestTypeFail,typeReqing);
}
var typeReqing;
function requestTypeSuc(d){
    var data = d.data;
    pWin.dataSrcsType[typeReqing] = data;
    var sel = $('#listSrcType_'+typeReqing+' select');
    sel.html('<option value="0">全部</option>');
    for(var j=0;j<data.length;j++){
        var a = data[j];
        sel.append('<option value="'+a.id+'">'+a.name+'</option>');
    }
    var subType = currComp.attr('data-srcsubtype');
    sel.val(sel.find('option[value='+subType+']').length==0?0:subType);
    listInitDatasrc(typeReqing,subType);
}
function requestTypeFail(){
    $('#listSrcType_'+typeReqing+' select').html('<option value="0">全部</option>').val(0);
    listShowFailTips();
}
var subtypeReqing;
function requestDataSuc(d){
    $('.listTips').addClass('none');
    var data = d.data;
    pWin.dataSrcs[typeReqing][subtypeReqing] = data;
    if(data.length>0){
        pWin.updateSrcfield(currComp.children('.mui-row').eq(0),data,currComp);
    }else{
        listShowNoadataTips();
    }
}
function requestDataFail(){
    listShowFailTips();
}
function listShowNoadataTips(){
    $('.listTips').addClass('none');
    var tips = $('#listNodataTips_'+typeReqing),
        pre = tips.find('.listTipsPre');
    tips.removeClass('none');
    if(subtypeReqing==0){
        pre.addClass('none');
    }else{
        pre.removeClass('none');
    }
}
function listShowFailTips(){
    $('.listTips').addClass('none');
    $('#listFailTips').removeClass('none');
}
function listInitDatasrc(type,subType){
    typeReqing = type;
    subtypeReqing = subType;
    AJAXRequestData(requestDataSuc,requestDataFail,typeReqing,subtypeReqing,0,20,false);
}
function listSrcSubtype(){
    var val = this.value;
    listInitDatasrc(currComp.attr('data-srctype'),val);
    currComp.attr('data-srcsubtype',val);
    
    listSynData('srcSubtype');
}
 /*表单属性设置*/
$('#formName').on('change',formName);
$('#formShowName').on('change',formShowName);
$('#formShowBtn').on('change',formShowBtn);
$('#formAddBtns button').on('click',formAddItem);
var form_obj;//当前组件中实际的表单元素
var form_body;//当前组件中实际的表单元素
function initSetting_form() {
    form_obj = currComp.children('form').eq(0);
    form_body = form_obj.children('.form_body');
    var name = form_obj.children('.form_name').text(),
        showName = !form_obj.children('.form_name').hasClass('none'),
        showBtn = !form_obj.children('.form_btn').hasClass('none');
    $('#formName').val(name);
    $('#formShowName').prop('checked',showName);
    $('#formShowBtn').prop('checked',showBtn);
}
function formSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = form_obj.children('.form_name').text();
            break;
        }
        case 'showName':{
            currData.showName = !form_obj.children('.form_name').hasClass('none');
            break;
        }
        case 'showBtn':{
            currData.showBtn = !form_obj.children('.form_btn').hasClass('none');
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
function formGenFieldName(){
/*    var fields = form_body.children('.comp');
    var idx = 1;
    var newName;
    var name,flag;
    while(!newName){
        name = '表单项'+(idx++);
        flag = true;
        for(var i=0;i<fields.length;i++){
            if(fields.eq(i).children('.formeleNameWrapper').find('.formeleName').text()==name){
                flag = false;
                break;
            }
        }
        if(flag){
            newName = name;
        }
    }
    return newName;*/
    return '表单项';
}
function formAddItem(){
    var type = this.id.split('_')[1],
    data = cloneJSON(compData[type]);
    data['name'] = formGenFieldName();
    var comp = pWin.buildComp(data);
    comp.attr('data-formid',currComp.attr('id'));
    form_body.append(comp);
    pWin.removeEmpty(form_body);
    
    var parDataId = currComp.attr('id').split('_')[1];
    var container = comp.parent();
    var containerIdx = pWin.getContainerIdx(currComp,container);
    var insertIdx = container.children('.comp').index(comp);
    pWin.insertCompData(data,insertIdx,parDataId,containerIdx);
    
    pWin.selectComp(comp);
}
function formName(){
    form_obj.children('.form_name').text(this.value);
    
    formSynData('name');
}
function formShowName(){
    var obj = form_obj.children('.form_name');
    if(this.checked){
        obj.removeClass('none');
    }else{
        obj.addClass('none');
    }
    
    formSynData('showName');
}
function formShowBtn(){
    var obj = form_obj.children('.form_btn');
    if(this.checked){
        obj.removeClass('none');
    }else{
        obj.addClass('none');
    }
    
    formSynData('showBtn');
}
 /*输入框属性设置*/
var input_obj; //当前组件中实际的输入框元素
var input_wrapper_obj; //名称外层元素，包含了名称和星号元素
var input_name_obj; //名称元素
var input_required_obj; //星号元素
function initSetting_input() {
    input_obj = currComp.children('input').eq(0);
    input_wrapper_obj = currComp.children('.formeleNameWrapper').eq(0);
    input_name_obj = input_wrapper_obj.find('.formeleName');
    input_required_obj = input_wrapper_obj.find('.formeleRequired');
    var name = input_name_obj.text(),
        showName = !input_wrapper_obj.hasClass('none'),
        required = !input_required_obj.hasClass('none'),
        placeHolder = input_obj.attr('placeHolder');
    placeHolder = placeHolder?placeHolder:'';
    $('#inputName').val(name);
    $('#inputShowName').prop('checked',showName);
    $('#inputPlaceholder').val(placeHolder);
    $('#inputRequired').prop('checked',required);
}
function inputSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = input_name_obj.text();
            break;
        }
        case 'showName':{
            currData.showName = !input_wrapper_obj.hasClass('none');
            break;
        }
        case 'required':{
            currData.required = !input_required_obj.hasClass('none');
            break;
        }
        case 'placeHolder':{
            var val = input_obj.attr('placeHolder');
            if(val==''){
                delete currData.placeHolder;
            }else{
                currData.placeHolder = val;
            }
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#inputName').on('change',inputName);
$('#inputShowName').on('change',inputShowName);
$('#inputPlaceholder').on('change',inputPlaceholder);
$('#inputRequired').on('change',inputRequired);
function inputName(){
    input_name_obj.text(this.value);
    
    inputSynData('name');
}
function inputShowName(){
    if(this.checked){
        input_wrapper_obj.removeClass('none');
    }else{
        input_wrapper_obj.addClass('none');
    }
    
    inputSynData('showName');
}
function inputPlaceholder(){
    var val = this.value;
    val = val.replace(/\s+/g, '');
    if (val == '') {
        input_obj.removeAttr('placeHolder');
    } else {
        input_obj.attr('placeHolder',val);
    }
    
    inputSynData('placeHolder');
}
function inputRequired(){
    if(this.checked){
        input_required_obj.removeClass('none');
    }else{
        input_required_obj.addClass('none');
    }
    
    inputSynData('required');
}
 /*多行输入框属性设置*/
var textarea_obj; //当前组件中实际的多行输入框元素
var textarea_wrapper_obj; //名称外层元素，包含了名称和星号元素
var textarea_name_obj; //名称元素
var textarea_required_obj; //星号元素
function initSetting_textarea() {
    textarea_obj = currComp.children('textarea').eq(0);
    textarea_wrapper_obj = currComp.children('.formeleNameWrapper').eq(0);
    textarea_name_obj = textarea_wrapper_obj.find('.formeleName');
    textarea_required_obj = textarea_wrapper_obj.find('.formeleRequired');
    var name = textarea_name_obj.text(),
        showName = !textarea_name_obj.hasClass('none'),
        required = !textarea_required_obj.hasClass('none'),
        placeHolder = textarea_obj.attr('placeHolder'),
        rows = textarea_obj.attr('rows');
    placeHolder = placeHolder?placeHolder:'';
    $('#textareaName').val(name);
    $('#textareaShowName').prop('checked',showName);
    $('#textareaPlaceholder').val(placeHolder);
    $('#textareaRows').val(rows);
    $('#textareaRequired').prop('checked',required);
}

function textareaSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = textarea_name_obj.text();
            break;
        }
        case 'showName':{
            currData.showName = !textarea_wrapper_obj.hasClass('none');
            break;
        }
        case 'required':{
            currData.required = !textarea_required_obj.hasClass('none');
            break;
        }
        case 'placeHolder':{
            var val = textarea_obj.attr('placeHolder');
            if(val==''){
                delete currData.placeHolder;
            }else{
                currData.placeHolder = val;
            }
            break;
        }
        case 'rows':{
            currData.rows = textarea_obj.attr('rows');
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#textareaName').on('change',textareaName);
$('#textareaShowName').on('change',textareaShowName);
$('#textareaPlaceholder').on('change',textareaPlaceholder);
$('#textareaRows').on('change',textareaRows);
$('#textareaRequired').on('change',textareaRequired);
function textareaName(){
    textarea_name_obj.text(this.value);
    
    textareaSynData('name');
}
function textareaShowName(){
    if(this.checked){
        textarea_wrapper_obj.removeClass('none');
    }else{
        textarea_wrapper_obj.addClass('none');
    }
    
    textareaSynData('showName');
}
function textareaPlaceholder(){
    var val = this.value;
    val = val.replace(/\s+/g, '');
    if (val == '') {
        textarea_obj.removeAttr('placeHolder');
    } else {
        textarea_obj.attr('placeHolder',val);
    }
    
    textareaSynData('placeHolder');
}
function textareaRows(){
    if(!isNumber(this.value) || this.value<2){
        this.value = 2;
    }
    textarea_obj.attr('rows',this.value);
    
    textareaSynData('rows');
}
function textareaRequired(){
    if(this.checked){
        textarea_required_obj.removeClass('none');
    }else{
        textarea_required_obj.addClass('none');
    }
    
    textareaSynData('required');
}
/*单选框组属性设置*/
var radioG_obj; //当前组件中实际的单选框组元素
var radioG_wrapper_obj; //名称外层元素，包含了名称和星号元素
var radioG_name_obj; //名称元素
var radioG_required_obj; //星号元素
function initSetting_radioG() {
    radioG_obj = currComp;
    radioG_wrapper_obj = currComp.children('.formeleNameWrapper').eq(0);
    radioG_name_obj = radioG_wrapper_obj.find('.formeleName');
    radioG_required_obj = radioG_wrapper_obj.find('.formeleRequired');
    var name = radioG_name_obj.text(),
        showName = !radioG_name_obj.hasClass('none'),
        required = !radioG_required_obj.hasClass('none');
    $('#radioGName').val(name);
    $('#radioGShowName').prop('checked',showName);
    $('#radioGRequired').prop('checked',required);
}
function radioGSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = radioG_name_obj.text();
            break;
        }
        case 'showName':{
            currData.showName = !radioG_wrapper_obj.hasClass('none');
            break;
        }
        case 'required':{
            currData.required = !radioG_required_obj.hasClass('none');
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#radioGName').on('change',radioGName);
$('#radioGShowName').on('change',radioGShowName);
$('#radioGRequired').on('change',radioGRequired);
$('#radioGAdd').on('click',radioGAdd);
function radioGName(){
    radioG_name_obj.text(this.value);
    
    radioGSynData('name');
}
function radioGShowName(){
    if(this.checked){
        radioG_wrapper_obj.removeClass('none');
    }else{
        radioG_wrapper_obj.addClass('none');
    }
    
    radioGSynData('showName');
}
function radioGRequired(){
    if(this.checked){
        radioG_required_obj.removeClass('none');
    }else{
        radioG_required_obj.addClass('none');
    }
    
    radioGSynData('required');
}
function radioGAdd(){
    var data = cloneJSON(compData['radio']);
    data['name'] = radioGGenRadioName();
    var comp = pWin.buildComp(data);
    comp.attr({'data-formid':currComp.attr('data-formid'),'name':currComp.attr('id').replace('radioG_','radio_')});
    radioG_obj.find('.group_body').append(comp);
    pWin.removeEmpty(radioG_obj);
    
    var parDataId = currComp.attr('id').split('_')[1];
    var container = comp.parent();
    var containerIdx = pWin.getContainerIdx(currComp,container);
    var insertIdx = container.children('.comp').index(comp);
    pWin.insertCompData(data,insertIdx,parDataId,containerIdx);
    
    pWin.selectComp(comp);
}
function radioGGenRadioName(){
    var raidos = radioG_obj.find('.comp_radio');
    var idx = 1;
    var newName;
    var name,flag;
    while(!newName){
        name = '选项'+(idx++);
        flag = true;
        for(var i=0;i<raidos.length;i++){
            if(raidos.eq(i).find('.label').text()==name){
                flag = false;
                break;
            }
        }
        if(flag){
            newName = name;
        }
    }
    return newName;
}
 /*复选框组属性设置*/
var checkboxG_obj; //当前组件中实际的复选框组元素
var checkboxG_wrapper_obj; //名称外层元素，包含了名称和星号元素
var checkboxG_name_obj; //名称元素
var checkboxG_required_obj; //星号元素
function initSetting_checkboxG() {
    checkboxG_obj = currComp;
    checkboxG_wrapper_obj = currComp.children('.formeleNameWrapper').eq(0);
    checkboxG_name_obj = checkboxG_wrapper_obj.find('.formeleName');
    checkboxG_required_obj = checkboxG_wrapper_obj.find('.formeleRequired');
    var name = checkboxG_name_obj.text(),
        showName = !checkboxG_name_obj.hasClass('none'),
        required = !checkboxG_required_obj.hasClass('none');
    $('#checkboxGName').val(name);
    $('#checkboxGShowName').prop('checked',showName);
    $('#checkboxGRequired').prop('checked',required);
}
function checkboxGSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = checkboxG_name_obj.text();
            break;
        }
        case 'showName':{
            currData.showName = !checkboxG_wrapper_obj.hasClass('none');
            break;
        }
        case 'required':{
            currData.required = !checkboxG_required_obj.hasClass('none');
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#checkboxGName').on('change',checkboxGName);
$('#checkboxGShowName').on('change',checkboxGShowName);
$('#checkboxGRequired').on('change',checkboxGRequired);
$('#checkboxGAdd').on('click',checkboxGAdd);
function checkboxGName(){
    checkboxG_name_obj.text(this.value);
    
    checkboxGSynData('name');
}
function checkboxGShowName(){
    if(this.checked){
        checkboxG_wrapper_obj.removeClass('none');
    }else{
        checkboxG_wrapper_obj.addClass('none');
    }
    
    checkboxGSynData('showName');
}
function checkboxGRequired(){
    if(this.checked){
        checkboxG_required_obj.removeClass('none');
    }else{
        checkboxG_required_obj.addClass('none');
    }
    
    checkboxGSynData('required');
}
function checkboxGAdd(){
    var data = cloneJSON(compData['checkbox']);
    data['name'] = checkboxGGenRadioName();
    var comp = pWin.buildComp(data);
    comp.attr({'data-formid':currComp.attr('data-formid')});
    checkboxG_obj.find('.group_body').append(comp);
    pWin.removeEmpty(checkboxG_obj);
    
    var parDataId = currComp.attr('id').split('_')[1];
    var container = comp.parent();
    var containerIdx = pWin.getContainerIdx(currComp,container);
    var insertIdx = container.children('.comp').index(comp);
    pWin.insertCompData(data,insertIdx,parDataId,containerIdx);
    
    pWin.selectComp(comp);
}
function checkboxGGenRadioName(){
    var raidos = checkboxG_obj.find('.comp_checkbox');
    var idx = 1;
    var newName;
    var name,flag;
    while(!newName){
        name = '选项'+(idx++);
        flag = true;
        for(var i=0;i<raidos.length;i++){
            if(raidos.eq(i).find('.label').text()==name){
                flag = false;
                break;
            }
        }
        if(flag){
            newName = name;
        }
    }
    return newName;
}
 /*单选框属性设置*/
var radio_obj; //当前组件中实际的单选框元素
var radio_label; //当前组件中实际的单选框元素
var radio_title; //当前标题
function initSetting_radio() {
    radio_obj = currComp.children('.muix-radio').eq(0);
    radio_label = currComp.children('.label').eq(0);
    radio_title = radio_label.text();
    var showName = !radio_label.hasClass('none'),
        checked = radio_obj.is(':checked');
    $('#radioName').val(radio_title);
    $('#radioShowName').prop('checked',showName);
    $('#radioChecked').prop('checked',checked);
    radioSynData('checked');
}
function radioSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = radio_label.text();
            break;
        }
        case 'showName':{
            currData.showName = !radio_label.hasClass('none');
            break;
        }
        case 'checked':{
            var check = radio_obj.is(':checked');
            if(check){
                var parComp = currComp.parent().parent(),
                    parData = pWin.getCompData(parComp.attr('id').split('_')[1]),
                    radios = parData.children;
                for(var i=0;i<radios.length;i++){
                    radios[i].checked = false;
                }
                currData.checked = true;
            }else{
                currData.checked = false;
            }
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#radioName').on('change',radioName);
$('#radioShowName').on('change',radioShowName);
$('#radioChecked').on('change',radioChecked);
function radioName(){
    var val = this.value;
        val = val.replace(/\s+/g, '');
    if(val==''){
        alert('标题不能为空');
        this.value = radio_title;
        return;
    }
    radio_label.text(val);
    radio_title = val;
    
    radioSynData('name');
}
function radioShowName(){
    if(this.checked){
        radio_label.removeClass('none');
    }else{
        radio_label.addClass('none');
    }
    
    radioSynData('showName');
}
function radioChecked(){
    var val = this.checked;
    radio_obj.prop('checked',val);
    
    radioSynData('checked');
}
 /*复选框属性设置*/
var checkbox_obj; //当前组件中实际的复选框元素
var checkbox_label; //当前组件中实际的单选框元素
var checkbox_title; //当前标题
function initSetting_checkbox() {
    checkbox_obj = currComp.children('.muix-checkbox').eq(0);
    checkbox_label = currComp.children('.label').eq(0);
    checkbox_title = checkbox_label.text();
    var showName = !checkbox_label.hasClass('none'),
        checked = checkbox_obj.is(':checked');
    $('#checkboxName').val(checkbox_title);
    $('#checkboxShowName').prop('checked',showName);
    $('#checkboxChecked').prop('checked',checked);
}
function checkboxSynData(type){ 
    switch(type){
        case 'name':{
            currData.name = checkbox_label.text();
            break;
        }
        case 'showName':{
            currData.showName = !checkbox_label.hasClass('none');
            break;
        }
        case 'checked':{
            var check = checkbox_obj.is(':checked');
            currData.checked = check;
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#checkboxName').on('change',checkboxName);
$('#checkboxShowName').on('change',checkboxShowName);
$('#checkboxChecked').on('change',checkboxChecked);
function checkboxName(){
    var val = this.value;
        val = val.replace(/\s+/g, '');
    if(val==''){
        alert('标题不能为空');
        this.value = checkbox_title;
        return;
    }
    checkbox_label.text(val);
    checkbox_title = val;
    
    checkboxSynData('name');
}
function checkboxShowName(){
    if(this.checked){
        checkbox_label.removeClass('none');
    }else{
        checkbox_label.addClass('none');
    }
    
    checkboxSynData('showName');
}
function checkboxChecked(){
    var val = this.checked;
    checkbox_obj.prop('checked',val);
    
    checkboxSynData('checked');
}
/*选择框属性设置*/
var select_obj; //当前组件中实际的选择框元素
var select_wrapper_obj; //名称外层元素，包含了名称和星号元素
var select_name_obj; //名称元素
var select_required_obj; //星号元素
function initSetting_select() {
    select_obj = currComp.children('.muix-select').eq(0);
    select_wrapper_obj = currComp.children('.formeleNameWrapper').eq(0);
    select_name_obj = select_wrapper_obj.find('.formeleName');
    select_required_obj = select_wrapper_obj.find('.formeleRequired');
    var name = select_name_obj.text(),
        showName = !select_name_obj.hasClass('none'),
        required = !select_required_obj.hasClass('none'),
        opts = currData.options,
        selectedIdx = currData.selectedIdx;
    selectedIdx = selectedIdx?selectedIdx:0;
    $('#selectName').val(name);
    $('#selectShowName').prop('checked',showName);
    $('#selectRequired').prop('checked',required);
    var optList = $('#selectOpt');
    optList.empty();
    for(var i=0;i<opts.length;i++){
        var opt = opts[i];
        var row = $('<div class="selectOptRow clearfix">'+
                      '<div class="form_col">'+
                          '<input type="radio" name="selectOptChecked">'+
                      '</div>'+
                      '<div class="form_col form_col_close">'+
                          '<input type="text" value="'+opts[i].name+'">'+
                      '</div>'+
                      '<button class="form_col btn_mini btn_link">删除</button>'+
                   '</div>');
        optList.append(row);
    }
    optList.find('input[type=radio]')[selectedIdx].checked = true;
}
function selectSynData(type,optIdx,val){ //optIdx：选项索引号（修改的是某个选项的情况）
    switch(type){
        case 'name':{
            currData.name = select_name_obj.text();
            break;
        }
        case 'showName':{
            currData.showName = !select_wrapper_obj.hasClass('none');
            break;
        }
        case 'required':{
            currData.required = !select_required_obj.hasClass('none');
            break;
        }
        case 'optChecked':{
            var radios = $('#selectOpt').find('input[type=radio]');
            var checkedRad = $('#selectOpt input[type=radio]:checked')[0];
            currData.selectedIdx = checkedRad?radios.index(checkedRad):0;
            break;
        }
        case 'optName':{
            currData.options[optIdx].name =  val;
            break;
        }
        case 'optDelete':{
            currData.options.splice(optIdx,1);
            break;
        }
        case 'optAdd':{
            currData.options.push({name:val});
            break;
        }
        default:{
            break;
        }
    }
    //console.log(JSON.stringify(pWin.pageData));
}
$('#selectName').on('change',selectName);
$('#selectShowName').on('change',selectShowName);
$('#selectRequired').on('change',selectRequired);
$('#selectSetting').on('change','.selectOptRow input[type=radio]',selectOptChecked)
                    .on('change','.selectOptRow input[type=text]',selectOptName)
                    .on('click','.selectOptRow button',selectOptDelete);
$('#selectOptAdd').on('click',selectOptAdd);
function selectOptChecked(n){
    var idx;
    if(typeof n == 'number'){
        idx = n;
    }else{
        idx = $('.selectOptRow input[type=radio]').index(this);
    }
    select_obj.html(currData.options[idx].name);
    
    selectSynData('optChecked',idx);
}
function selectOptName(){
    var idx = $('.selectOptRow input[type=text]').index(this);
    if(parseInt(currData.selectedIdx) == idx){
        select_obj.html(this.value);
    }
    
    selectSynData('optName',idx,this.value);
}
function selectOptDelete(){
    var idx = $('.selectOptRow button').index(this);
    var row = $('.selectOptRow').eq(idx).remove();
    
    selectSynData('optDelete',idx);
    
    if(row.find('input[type=radio]').is(':checked')){
        selectOptChecked(0);
    }
}
function selectOptAdd(){
    var newName = selectGenOptName();
    var row = $('<div class="selectOptRow clearfix">'+
                     '<div class="form_col">'+
                          '<input type="radio" name="selectOptChecked">'+
                      '</div>'+
                      '<div class="form_col form_col_close">'+
                          '<input type="text" value="'+newName+'">'+
                      '</div>'+
                      '<button class="form_col btn_mini btn_link">删除</button>'+
                  '</div>');
        $('#selectOpt').append(row);
    
    selectSynData('optAdd',null,newName);
}
function selectGenOptName(){
    var opts = currData.options;
    var idx = 1;
    var newName;
    var name,flag;
    while(!newName){
        name = '选项'+(idx++);
        flag = true;
        for(var i=0;i<opts.length;i++){
            if(opts[i].name==name){
                flag = false;
                break;
            }
        }
        if(flag){
            newName = name;
        }
    }
    return newName;
}
function selectName(){
    select_name_obj.text(this.value);
    
    selectSynData('name');
}
function selectShowName(){
    if(this.checked){
        select_wrapper_obj.removeClass('none');
    }else{
        select_wrapper_obj.addClass('none');
    }
    
    selectSynData('showName');
}
function selectRequired(){
    if(this.checked){
        select_required_obj.removeClass('none');
    }else{
        select_required_obj.addClass('none');
    }
    
    selectSynData('required');
}



