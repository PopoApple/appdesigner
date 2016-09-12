var pageData = {}; 
var pageDataInit;

function openPage(pageId,data){
    if(data){
        pageData = data;
    }else{
        pageData = window.parent.getPageDataById(pageId);
    }
    pageDataInit = cloneJSON(pageData);
    var body = $('#root_0').empty(),
        header = $('#root_1').empty(),
        footer = $('#root_4').empty(),
        lMenu = $('#root_2').empty(),
        rMenu = $('#root_3').empty(),
        headerD = pageData.header,
        footerD = pageData.footer,
        lMenuD = pageData.leftmenu,
        rMenuD = pageData.rightmenu,
        bComps = pageData.children,
        hComps = headerD?headerD.children:undefined,
        fComps = footerD?footerD.children:undefined,
        lComps = lMenuD?lMenuD.children:undefined,
        rComps = rMenuD?rMenuD.children:undefined;
    var initComps = function(container,comps){
        if(!comps){
            return;
        }
        for(var i=0;i<comps.length;i++){
            container.append(buildComp(comps[i]));
        } 
    };
    initComps(body,bComps);
    initComps(header,hComps);
    initComps(footer,fComps);
    initComps(lMenu,lComps);
    initComps(rMenu,rComps);
    
    if(!(headerD && headerD.show == 0)){
        header.removeClass('none');
    }else{
        header.addClass('none');
    }
    if(footerD && footerD.show != 0){
        footer.removeClass('none');
    }else{
        footer.addClass('none');
    }
    //updatePagenameText();
    parent.showSetting();
    
    var lists = $('.comp_list');
    for(var i=0;i<lists.length;i++){
        var list = lists.eq(i);
        var type = list.attr('data-srctype');
        var subtype = list.attr('data-srcsubtype');
        var listId = list.attr('id');
        var customData = {id:listId};
        listDataReqing[listId] = 0;
        AJAXRequestData(requestDataSuc,requestDataFail,type,subtype,0,list.find('.muix-col').length,customData,false);
    }
}
var listDataReqing = {};
function requestDataSuc(d){
    console.log(111,d);
    var customData = d.customData;
    var listId = customData.id;
    listDataReqing[listId] = 1;
    var list = $('#'+listId);
    list.find(' .compDataLoading').addClass('none');
    var data = d.data;
    var len = data.length;
    if(len>0){
        updateSrcfield(list.children('.mui-row').eq(0),data,list);
        var noDataContainers = list.find('.fieldNoData');
        for(var i=0;i<noDataContainers.length;i++){
            noDataContainers.eq(i).parent().remove();
        }
        var rows = list.children('.mui-row');
        for(var i=0;i<rows.length;i++){
            var row = rows.eq(i);
            if(row.find('.muix-col').length<=0){
                row.remove();
            }
        }
    }else{
        //list.find(' .compTipsInfo').removeClass('none');
    }
}
function requestDataFail(d){
    console.log(222,d);
    var customData = d.customData;
    var listId = customData.id;
    listDataReqing[listId] = 1;
    //listShowFailInfo(listId);
}
function closePage(){
    $('.root-container').empty();
    $('header,footer').addClass('none');
    $('.mui-off-canvas-wrap').removeClass('mui-active left-menu right-menu');
    parent.hideSetting();
}

var dataSrcs = {product:{},article:{}};
var dataSrcsType = {product:[],article:[]};
function getCompData(id,root){
    var rootData;
    if(root){
        rootData = root;
    }else{
        if(id=='1' || $('#root_1').find('[id$=_'+id+']').length>0){
            rootData = pageData.header;
        }else if(id=='4' || $('#root_4').find('[id$=_'+id+']').length>0){
            rootData = pageData.footer;
        }else if(id=='2' || $('#root_2').find('[id$=_'+id+']').length>0){
            rootData = pageData.leftmenu;
        }else if(id=='3' || $('#root_3').find('[id$=_'+id+']').length>0){
            rootData = pageData.rightmenu;
        }else{
            rootData = pageData;
        }
    }
    return _getCompData(id,rootData);
}
function _getCompData(id,par){
    if(par.id==id){
        return par;
    }else{
        var children = par.children?par.children:[];
        var containers = par.containers;
        if(containers){
            for(var i=0;i<containers.length;i++){
                var sub = containers[i].children;
                if(sub){
                    children = children.concat(sub);
                }
            }
        }
        var header = par.header;
        if(header){
        	var headerChildren = header.children;
        	if(headerChildren){
        		children = children.concat(headerChildren);
        	}
        }
        var footer = par.footer;
        if(footer){
        	var footerChildren = footer.children;
        	if(footerChildren){
        		children = children.concat(footerChildren);
        	}
        }
        var leftmenu = par.leftmenu;
        if(leftmenu){
        	var leftmenuChildren = leftmenu.children;
        	if(leftmenuChildren){
        		children = children.concat(leftmenuChildren);
        	}
        }
        var rightmenu = par.rightmenu;
        if(rightmenu){
        	var rightmenuChildren = rightmenu.children;
        	if(rightmenuChildren){
        		children = children.concat(rightmenuChildren);
        	}
        }
        var obj;
        for(var i=0;i<children.length;i++){
            obj = _getCompData(id,children[i]);
            if(obj){
                return obj;
            }
        }
        return null;
    }
}
function deleteCompData(id){
    var rootData;
    if($('#root_1').find('[id$=_'+id+']').length>0){
        rootData = pageData.header;
    }else if($('#root_4').find('[id$=_'+id+']').length>0){
        rootData = pageData.footer;
    }else if($('#root_2').find('[id$=_'+id+']').length>0){
        rootData = pageData.leftmenu;
    }else if($('#root_3').find('[id$=_'+id+']').length>0){
        rootData = pageData.rightmenu;
    }else{
        rootData = pageData;
    }
    return _deleteCompData(id,rootData);
}
function _deleteCompData(id,deleteComp,container){
    if(deleteComp.id==id){
        if(container){
            var arry = container.children;
            var idx = arry.indexOf(deleteComp);
            var rtn = arry.splice(idx,1)[0];
            if(arry.length>0){
                container.children = arry;
            }else{
                delete container.children;
            }
            return rtn;
        }else{
            return null;
        }
    }else{
        var children = deleteComp.children;
        if(children){
            var obj;
            for(var i=0;i<children.length;i++){
                obj = _deleteCompData(id,children[i],deleteComp);
                if(obj){
                    return obj;
                }
            }
            return null;
        }else{
            var containers = deleteComp.containers;
            if(containers){
                for(var i=0;i<containers.length;i++){
                    var sub = containers[i].children;
                    if(sub){
                        var obj;
                        for(var j=0;j<sub.length;j++){
                            obj = _deleteCompData(id,sub[j],containers[i]);
                            if(obj){
                                return obj;
                            }
                        }
                    }
                }
                return null;
            }else{
                return null;
            }
        }
    }
}
function insertCompData(data,insertIdx,parId,containerIdx){
	if(data.type=='form'){
		data.commitId = (new Date()).getTime()+'';
	}
    var parData = getCompData(parId);
    var container = parData;
    if(containerIdx>=0){
        container = parData.containers[containerIdx];
    }
    var arry = container.children;
    if(!arry){
        arry = [];
        container.children = arry;
    }
    arry.splice(insertIdx, 0, data);
    
    //console.log(JSON.stringify(pageData.children));
}

$('body').on('click', bodyClick)
        .on('dragover', dragover)
        .on('drop', drop)
        .on('dragstart','.root-container', dragstart)
	    .on('dragleave','.root-container',dragleave)
	    .on('click','.root-container',mouseclick)
	    .on('mouseover','.root-container',mouseover)
	    .on('mouseleave','.root-container',mouseleave)
	    .on('drag','.comp', drag)
	    .on('click','.comp_slider > .comp_toolbar .comp_tool',sliderSelectPage)
	    .on('dblclick','.comp',compDblClick)
	    .on('dblclick','.comp.freeze',goInFreezeComp)
	    .on('dblclick','.mask_body',goOutFreezeComp);   
function compDblClick(e){
	e.stopPropagation();
}
var maskIdx = 4;
var maskTimer;
function goInFreezeComp(e){
	maskIdx++;
	var top = 0;
	var obj = $(this).removeClass('freeze mouseover focus selected').attr('title','');
	while(!obj.is('.root-container')){
		obj.removeClass('selected mouseover focus');
		if(!obj.is('.muix-grid-cell') && !obj.is('.muix-grid')){
			top += obj[0].offsetTop;
		}
		obj = obj.parent();
	}
	var width = this.offsetWidth,
		height = this.offsetHeight,
		left = this.offsetLeft;
	var mirrorComp = $(this).clone(true).addClass('hide');
	mirrorComp.children().addClass('visible');
	getInnerConts(mirrorComp).addClass('margin_fix');
	$('.mask_body.active').removeClass('active');
	var maskContainer = $('<div class="mask_body container active"></div>').attr('id','root_'+maskIdx).css('z-index',maskIdx+1);
	maskContainer.append(mirrorComp.css({'top':top,'left':left,'width':width}));
	obj.prepend(maskContainer);
	selectComp();
	$(this).height(height).attr('data-maskidx',maskIdx).attr('id','');
	var oldComp = $(this);
	setTimeout(function(){
		oldComp.empty();
	},10);
	if(!maskTimer){
		maskTimer = setInterval(function(){
			var masks = $('.mask_body');
			for(var i=0;i<masks.length;i++){
				var mask = masks.eq(i);
				var idx = mask.attr('id').replace('root_','');
				var comp = $('[data-maskidx='+idx+']');
				var mirrorComp = mask.children('.comp');
				comp.height(mirrorComp.height());
				//comp.html(mirrorComp.html());
			}
		},300);
	}
}
function getInnerConts(comp){
	var innerConts;
	if(comp.is('.comp_div')){
		innerConts = comp.children('.muix-div').children('.container');
	}else if(comp.is('.comp_grid')){
		innerConts = comp.children('.muix-grid').children('.container');
	}else if(comp.is('.comp_slider')){
		innerConts = comp.children('.mui-slider').children('.mui-slider-group').children('.container');
	}else if(comp.is('.comp_list')){
		innerConts = comp.children('.mui-row').children('.muix-col').children('.container');
	}else if(comp.is('.comp_form')){
		innerConts = comp.children('form').children('.container');
	}
	return innerConts;
}
function goOutFreezeComp(e){
	if(e){
		e.stopPropagation();
	}
	var mask = $(this);
	var idx = mask.attr('id').replace('root_','');
	var comp = $('[data-maskidx='+idx+']');
	var mirrorComp = mask.children('.comp');
	mirrorComp.removeClass('hide');
	mirrorComp.children().removeClass('visible');
	getInnerConts(mirrorComp).removeClass('margin_fix');
	comp.after(mirrorComp.addClass('freeze').attr('title',FREEZE_COMP_TIPS).css({'top':'auto','left':'auto','width':'auto'}));
	comp.remove();
	selectComp(mirrorComp);
	mask.remove();
	maskIdx--;
	$('#root_'+maskIdx).addClass('active');
	if(maskIdx == 4){
		clearInterval(maskTimer);
		maskTimer = null;
	}
}
function bodyClick() {
    if(parent.editor.menu){
        parent.editor.hideMenu();
    }
    var e = window.event || (arguments[0].originalEvent);
    if (e) {
        var ele = $(e.target);
        var y = e.pageY;
        //if((y<=44 && !ele.is('.compTitleInner,.compTitle,.comp_tool')) || ele.is('.root-container')){
        if(ele.is('.root-container')){
            var par = $(parent);
            selectComp();
        }
    }
}
function sliderSelectPage(obj){
    var tool = $(obj).hasClass('comp_tool')?obj:this;
    var tools = $(tool).parent().children('.comp_tool');
    var slider = $(tool).parent().parent();
    tools.removeClass('active');
    $(tool).addClass('active');
    
    var idx = tools.index(tool);
    var items = slider.find('.mui-slider-item');
    items.addClass('none');
    items.eq(idx).removeClass('none');
    
    var inds = slider.find('.mui-indicator');
    inds.removeClass('mui-active');
    inds.eq(idx).addClass('mui-active');
}
var multiSelectMode = false,    //多选模式
    clipboard,  //剪贴板中的组件（数组）
    clipboardData;  //剪贴板中的组件对应的数据
function selectComp(compEle){
    $('.comp').removeClass('selected half-selected');
    if(compEle){
        if(multiSelectMode){    //暂未实现。多选模式下，可同时选中多个组件，属性面板中显示共有设置项
        }else{
            compEle.addClass('selected');
            var par = compEle.parent();
            while(!par.hasClass('root-container')){
                if(par.hasClass('comp_slider') || par.hasClass('comp_list')){
                    par.addClass('half-selected');
                    break;
                }
                par = par.parent();
            }
            /*if(compEle.is('.comp_list')){
                listReqing = compEle;
                typeReqing = listReqing.attr('data-srctype');
                subtypeReqing = listReqing.attr('data-srcsubtype');
                AJAXRequestData('requestDataSuc','requestDataFail',typeReqing,subtypeReqing,0,20);
            }*/
        }
    }
    parent.showSetting();
    compTitleWidth();
    parent.synPhoneTool();
}
function phoneTool_delete(){
    var comp = $('.comp.selected').eq(0);  //暂不考虑多选
    var container = comp.parent();
    deleteCompData(comp.attr('id').split('_')[1]);
    comp.remove();
    if(comp.hasClass('comp_form')){
        deleteFormName(comp);
    }
    if(container.length > 0 && container.children().length == 0){
        addEmpty(container);
    }
    var dynIdx = comp.attr('data-dynidx');
    if(dynIdx){
        delRelevantInlist(dynIdx);
    }
    selectComp();
    parent.synPhoneTool();
    
    //console.log(JSON.stringify(pageData.children));
}
function phoneTool_copy(){
    clipboard = $('.comp.selected').clone(true);  
    clipboardData = cloneJSON(getCompData(clipboard.attr('id').split('_')[1]));//暂时不考虑多选，即剪贴板中只有一个组件
    $(parent.document).find('#phoneTool_paste').removeClass('disable');
}
function phoneTool_paste(){
    var sel = $('.comp.selected');
    var newComp = clipboard.clone(true);     //暂时不考虑多选，即剪贴板中只有一个组件
    var newData = cloneJSON(clipboardData);
    $.merge(newComp.find('.comp'),newComp).each(function(i,ele){
        var a = $(ele).attr('id').split('_'),
            type = a[0],
            id = a[1],
            data = getCompData(id,newData);
        var newId = (++compIdx)+'';
        $(ele).attr('id',type+'_'+newId);
        data.id = newId;
        if($(ele).hasClass('comp_form')){
            var nameObj = $(ele).children('form').children('.form_name');
            var name = nameObj.text();
            var newName = genFormCopyName(name);
            nameObj.text(newName);
            data.name = newName;
        }
    });
    if(sel.length>0){
        sel.before(newComp).removeClass('selected');
        var parComp = getParentComp(newComp);
        var parDataId = parComp.attr('id').split('_')[1];
        var container = newComp.parent();
        var containerIdx = getContainerIdx(parComp,container);
        var insertIdx = container.children('.comp').index(newComp);
        insertCompData(newData,insertIdx,parDataId,containerIdx);
    }else{
        var root,
            menu = $('.mui-off-canvas-wrap');
        if(menu.is('.mui-active.left-menu')){
            root = $('#root_2');
        }else if(menu.is('.mui-active.right-menu')){
            root = $('#root_3');
        }else{
            root = $('#root_0');
        }
        root.prepend(newComp);
        insertCompData(newData,0,root.attr('id').split('_')[1]);
    }
    updateMovedCompInfo(newComp);
    selectComp(newComp);
    console.log(JSON.stringify(pageData.children));
}
function phoneTool_freeze() {
    var comp = $('.comp.selected').eq(0);  //暂不考虑多选
    var compData = getCompData(comp.attr('id').split('_')[1]);
    if(comp.is('.freeze')){
        comp.removeClass('freeze').attr('title','');
        delete compData.freeze;
        parent.activeFreezeBtn(false);
    }else{
        comp.addClass('freeze').attr('title',FREEZE_COMP_TIPS);
        compData['freeze'] = 1;
        parent.activeFreezeBtn(true);
    }
}
function mouseclick(){
    var e = window.event || (arguments[0].originalEvent);
    var ele = $(e.target);
    var compEle = ele;
    while(!compEle.hasClass('root-container')){
        if (compEle.hasClass('comp')) {
            selectComp(compEle);
            break;
        }
        compEle = compEle.parent();
    }
}
function delRelevantInlist(dynidx){
    $('[data-dynidx='+dynidx+']').each(function(i,o){
        var ele = $(o),
            cont = ele.parent();
        ele.remove();
        if(cont.children().length == 0){
            addEmpty(cont);
        }
    });
}
var dragingEle,dragingEleData;
function drag(){
    $('.mouseover').removeClass('mouseover');
    var e = window.event || (arguments[0].originalEvent);
    var $ele = $(e.target);
    var $par = $ele.parent();
    dragingEleType = $ele.attr('data-type');
    dragingEleData = deleteCompData($ele.attr('id').split('_')[1]);
    dragingEle = $ele.remove();
    if(!$par.hasClass('mui-content') && $par.children().length == 0){
        addEmpty($par);
    }
    return false;
}
function addEmpty(container){
    if(container.is('.root-container')){
        return;
    }
    container.addClass('empty');
    if(container.is('.muix-grid-cell')){
        var notEmptySiblings = container.siblings('.muix-grid-cell').not('.empty').length;
    console.log(notEmptySiblings);
        if(!notEmptySiblings){
            container.parent().addClass('empty');
        }
    }
    if(container.parent().hasClass('muix-col')){
        var cols = container.parent().parent().children('.muix-col');
        cols.addClass('empty');
        cols.children('.container').addClass('empty');
    }
}
function removeEmpty(container){
    if(container.is('.root-container')){
        return;
    }
    container.removeClass('empty');
    if(container.is('.muix-grid-cell')){
        container.parent().removeClass('empty');
    }
    if(container.parent().hasClass('muix-col')){
        var cols = container.parent().parent().children('.muix-col');
        cols.removeClass('empty');
        cols.children('.container').removeClass('empty');
    }
}
var newComp = $('<div class="newComp"></div>');
function compTitleWidth(){
    /*var comps = $('.comp.focus,.comp.selected');
    comps.each(function(i,comp){
        var title = $(comp).children('.compTitle'),
            paddingL = toInt($(comp).css('padding-left')),
            paddingR = toInt($(comp).css('padding-right')),
            compW = $(comp).width()+2+paddingL+paddingR,
            innerW = title.find('.compTitleInner').width()+10;
        title.width(compW > innerW?compW:innerW);
    });*/
}
function mouseleave(){
    var e = window.event || (arguments[0].originalEvent),
        ele = $(e.target),
        root = ele,
        x = e.pageX,
        y = e.pageY,
        minX = 0,
        maxX = 300;
    while(!root.is('.root-container')){
        root = root.parent();
    }
    if(root.is('#root_2')){
        maxX = 210;
    }
    if(root.is('#root_3')){
        minX = 90;
    }
    var hasScroll;
    if(root.is('#root_0')){
        var scrollEle = $('#contentWrap')[0];
        hasScroll = !(scrollEle.scrollHeight == scrollEle.clientHeight);
    }else{
        var scrollEle = root[0];
        hasScroll = !(scrollEle.scrollHeight == scrollEle.clientHeight);
    }
    if(hasScroll){
        maxX -= 17;
    }
    if(x<=minX || x>=maxX || y<=0 || y>=530){
        $('.comp.focus').removeClass('focus');
        $('.mouseover').removeClass('mouseover');
        compTitleWidth();
    }
}
function mouseover(){
    var e = window.event || (arguments[0].originalEvent);
    var ele = $(e.target);
    /*if(ele.is('.root-container')){
        $('.mouseover').removeClass('mouseover');
    }else{
        var mouseovers = $('.mouseover'),
            subComps = ele.find('.comp,.muix-grid-cell');
        mouseovers.each(function(i,el){
            if(subComps.index(el)<0){
                $(el).removeClass('mouseover');
            }
        });
    }*/
    //if(ele.is('.root-container')){
        $('.mouseover').removeClass('mouseover');
    //}else{
        /*var rootComp = ele;
        while(!rootComp.parent().is('.root-container')){
            rootComp = rootComp.parent();
        }
        var mouseovers = $('.mouseover'),
            subComps = rootComp.find('.comp,.muix-grid-cell');
        mouseovers.each(function(i,el){
            if(subComps.index(el)<0){
                $(el).removeClass('mouseover');
            }
        });*/
    //}
    $('.comp.focus').removeClass('focus');
    var compFocusCheck = true;
    while(!ele.is('.root-container')){
        if(ele.is('.comp')){
            ele.addClass('mouseover');
        }
        if(compFocusCheck){
            if(ele.is('.comp')){
                ele.addClass('focus');
                compFocusCheck = false;
            }
        }
        ele = ele.parent();
    }
    compTitleWidth();
}
var dragLimit = {
    slider:['slider','list','header','footer'],
    list:['list','form','radioG','checkboxG','header','footer'],
    form:['list','form','radioG','checkboxG','header','footer']
}
function dragstart(){
    var e = window.event || (arguments[0].originalEvent);
    if(NV.name == 'firefox'){
    	e.dataTransfer.setData('t','');
    }
    parent.dragingType = 'component';
}
function dragover() {
    var e = window.event || (arguments[0].originalEvent);
    e.preventDefault();
    if(parent.dragingType != 'component'){
        return;
    }
    var ele = $(e.target);
    var obj = ele;
    var cps=[],conts=[],cont,root;
    while(!obj.is('body')){
        if(obj.is('.root-container')){
            root = obj;
        }
        if(obj.is('.comp') || obj.is('#root_1,#root_2,#root_3,#root_4')){
            cps.push(obj);
        }
        if(!cont && obj.is('.container')){
            cont = obj;
        }
        if(obj.is('.container')){
            conts.push(obj);
        }
        obj = obj.parent();
    }
    var y = e.pageY;
    /*if(!root.is('#root_1')){
        var scrollEle;
        if(root.is('#root_0')){
            scrollEle = $('#contentWrap')[0];
        }else{
            scrollEle = root[0];
        }
        var scrollTop = scrollEle.scrollTop;
        if(scrollTop>0){
            var marginTop = y;
            if(root.is('#root_0') && !$('#root_1').is('.none')){
                marginTop -= 44;
            }
            if(marginTop<0){

            }else if(marginTop < 20){
                scrollEle.scrollTop = scrollTop-80;
            }else if(marginTop<10){
                scrollEle.scrollTop = scrollTop-160;
            }
        }
    } */
    var prevContainer = newComp.parent();
    var pass_dragLimit = true, limitCp;
    if(cps.length>0){
        var limit = dragLimit[dragingEle.attr('data-type')];
        limit = limit?limit:[];
        var subCps = dragingEle.find('.comp');
        subCps.each(function(i,cp){
            var a = dragLimit[$(cp).attr('data-type')];
            if(a){
                for(var i=0;i<a.length;i++){
                    var aI = a[i];
                    if(limit.indexOf(aI)<0){
                        limit.push(aI);
                    }
                }
            }
        });
        if(limit.length>0){
            for(var i=0;i<cps.length;i++){
                var type = cps[i].attr('data-type');
                for(var j=0;j<limit.length;j++){
                    if(limit[j] == type){
                        pass_dragLimit = false;
                        limitCp = cps[i];
                        break;
                    }
                }
                if(!pass_dragLimit){
                    break;
                }
            }
        }
    }
    if(!pass_dragLimit){
    	cont = null;
    	for(var i=0;i<conts.length;i++){
    		if($(limitCp).find(conts[i]).length==0){
    			cont = conts[i];
    			break;
    		}
    	}
    }
    if(!cont){
        return;
    }
    var pass = true;
    var formEle = dragingEle.is('[data-formid]')?dragingEle:dragingEle.find('[data-formid]')[0];
    if(formEle){
        if(cont.is('.root-container')){
            if(!dragingEle.is('.comp_form') && dragingEle.find('.comp_form').length<=0){
                pass = false;
            }
        }
        var formId = $(formEle).attr('data-formid');
        if(dragingEle.attr('id')!=formId && dragingEle.find('#'+formId).length<=0){
            if(cps.length>0){
                var exsit = false;
                var obj = cont;
                while(!obj.is('.root-container')){
                    if(obj.is('.comp') && obj.attr('id') == formId){
                        exsit = true;
                        break;
                    }
                    obj = obj.parent();
                }
                if(!exsit){
                    pass = false;
                }
            }
        }
    }
    if(pass){
        $('.container').removeClass('dragFocus');
        var comps = cont.children('.comp');
        if(cont.is('.mask_body')){
        	var comp = comps.eq(0);
        	var t = comp.offset().top;
	        var h = comp[0].offsetHeight;
	        var innerCont = getInnerConts(comp).eq(0);
        	innerCont.addClass('dragFocus');
        	if(y<=t){
        		innerCont.prepend(newComp);
        	}else if(y>=t+h){
        		innerCont.append(newComp);
        	}
        }else{
        	cont.addClass('dragFocus');
        	var newCompMoved = false;
	        if(comps.length > 0){
	            var comp,t,h,triggerH,compY;
	            for(var i=0;i<comps.length;i++){
	                comp = comps[i];
	                t = $(comp).offset().top;
	                h = comp.offsetHeight;
	                triggerH = h>20?10:h/2;
	                compY = t + triggerH;
	                if(y < compY){
	                    $(comp).before(newComp);
	                    newCompMoved = true;
	                    break;
	                }
	            }
	            if(!newCompMoved){
	                compY = t + h - triggerH;
	                if(y > compY){
	                    $(comp).after(newComp);
	                    newCompMoved = true;
	                }
	            }
	        }else{
	            cont.append(newComp);
	        }
        }
        if(prevContainer.length > 0 && prevContainer.children().length == 0){
            addEmpty(prevContainer);
        }
    }
    
    if(ele.is('.root-container')){
        //$('.dragover').removeClass('dragover');
    }else{
        /*var dragovers = $('.dragover'),
            subComps = cont.find('.comp,.muix-grid-cell,.muix-div,.form_body,.group_body');
        dragovers.each(function(i,el){
            if(subComps.index(el)<0){
                $(el).removeClass('dragover');
            }
        });*/
    }
    while(!ele.is('.root-container')){
        if(ele.is('.comp')){
            ele.addClass('dragover');
        }
        ele = ele.parent();
    }
    compTitleWidth();
}
function dragleave(){
    var e = window.event || (arguments[0].originalEvent),
        ele = $(e.target),
        root = ele,
        x = e.pageX,
        y = e.pageY,
        minX = 0,
        maxX = 300;
    while(!root.is('.root-container')){
        root = root.parent();
    }
    if(root.is('#root_2')){
        maxX = 210;
    }
    if(root.is('#root_3')){
        minX = 90;
    }
    var hasScroll;
    if(root.is('#root_0')){
        var scrollEle = $('#contentWrap')[0];
        hasScroll = !(scrollEle.scrollHeight == scrollEle.clientHeight);
    }else{
        var scrollEle = root[0];
        hasScroll = !(scrollEle.scrollHeight == scrollEle.clientHeight);
    }
    if(hasScroll){
        maxX -= 17;
    }
    if(x<=minX || x>=maxX || y<=0 || y>=530){
        /*var parContainer = newComp.parent();
        newComp.remove();
        if(parContainer && parContainer.length > 0 && parContainer.children().length == 0){
            addEmpty(parContainer);
        }*/
        $('.dragover').removeClass('dragover');
        compTitleWidth();
        $('.dragFocus').removeClass('dragFocus');
    }
}
var actCont;
var compIdx = 10;
var dynIdx = 0;
function getParentComp(ele){
     var par = ele.parent();
     while(par && par[0] && !par.hasClass('root-container')){
        if(par.hasClass('comp')){
            break;
        }
        par = par.parent();
     }
    return par;
}
function getContainerIdx(comp,container){
    var idx = -1;
    var type = comp.attr('id').split('_')[0];
    if(type=='grid'){
        idx = comp.children('.muix-grid').children('.muix-grid-cell').index(container); 
    }else if(type=='slider'){
        idx = comp.children('.mui-slider').children('.mui-slider-group').children('.mui-slider-item').index(container); 
    }
    return idx;
}

function updateListInfo(movedComp){    
    var oldListId,newListId;
    var dynIdx = movedComp.attr('data-dynidx');
    if(dynIdx){
        oldListId = movedComp.attr('data-listid');
    }
    var obj = movedComp.parent();
    while(!obj.is('.root-container')){
        if(obj.is('.comp_list')){
            newListId = obj.attr('id');
            break;
        }
        obj = obj.parent();
    }
    var fromSameList = false;
    if(newListId){
        if(oldListId && oldListId==newListId){
            fromSameList = true;
        }
    }
    if(oldListId && (!newListId || (newListId && !fromSameList))){
        removeListInfo(movedComp);
        delRelevantInlist(dynIdx);
    }
    if(newListId){
        if(!fromSameList){
            addListInfo(movedComp,newListId);
        }
        var idx = movedComp.attr('data-dynidx'),
            parIdx = movedComp.parent().attr('data-dynidx'),
            prevIdx = movedComp.prev().attr('data-dynidx'),
            nextIdx = movedComp.next().attr('data-dynidx');
        obj.find('.muix-col').each(function(i,o){
            if(i!=0){
                var col= $(o);
                var newEle; 
                if(fromSameList){
                    newEle = col.find('[data-dynidx='+idx+']');
                }else{ 
                    newEle = movedComp.clone(); 
                }
                if(prevIdx){
                    col.find('[data-dynidx='+prevIdx+']').after(newEle);
                }else if(nextIdx){
                    col.find('[data-dynidx='+nextIdx+']').before(newEle);
                }else{
                    var par;
                    if(parIdx){
                        par = col.find('[data-dynidx='+parIdx+']');
                    }else{
                        par = col.children('.container');
                    }
                    par.append(newEle);
                    removeEmpty(par);
                }
            }
        });
    }
}

function updateTextInfo(movedComp){
    if(movedComp.is('.comp_text')){
        var ispagename = movedComp.attr('data-ispagename');
        if(ispagename){
            if($('#root_1').find(movedComp).length<=0){
                movedComp.removeAttr('data-ispagename');
            }
        }
    }
}

/*
    当组件拖拽或黏贴到新位置时，某些组件有特殊的信息需要处理
    1、文本组件：如果绑定了页面名称，但新位置不在顶部栏，则要去掉
    2、列表中的组件：包括移动之前或之后在列表中的情况，对于列表标识信息，序列组件等的处理
*/
function updateMovedCompInfo(movedComp){
    updateTextInfo(movedComp);
    updateListInfo(movedComp);
}

function drop() {
    if(parent.dragingType == 'component'){
        if(newComp.parent().length>0){
	        newComp.after(dragingEle);
	        newComp.remove();
	        removeEmpty(dragingEle.parent());
	
	        var parComp = getParentComp(dragingEle);
	        var parDataId = parComp.attr('id').split('_')[1];
	        var container = dragingEle.parent();
	        var containerIdx = getContainerIdx(parComp,container);
	        var insertIdx = container.children('.comp').index(dragingEle);
	        insertCompData(dragingEleData,insertIdx,parDataId,containerIdx);
	        
	        updateMovedCompInfo(dragingEle);
	        
	        selectComp(dragingEle);
        }

        $('.dragover').removeClass('dragover');
        compTitleWidth();
        $('.dragFocus').removeClass('dragFocus');
        
    }else if(parent.dragingType == 'gridColSetting'){
        parent.bodyDrop();
    }
    //console.log(JSON.stringify(pageData));
}

function updateSrcfield(comp,dataSrc,list){
    if(!dataSrc){
        return;
    }
    var comps = comp.find('[data-srcfield]');
    if(comp.is('[data-srcfield]')){
        comps = $.merge(comps,comp);
    }
    if(comps.length==0){
        return;
    }
    comps.each(function(i,cp){
        var obj = $(cp),
            fieldName = obj.attr('data-srcfield'),
            idx = obj.attr('data-dynidx'),
            arry = list.find('[data-dynidx="'+idx+'"]');
            arry.each(function(j,ele){
                var onePiece = dataSrc[j];
                var colContent = list.find('.muix-col').eq(j).children('.container');
                if(onePiece){
                    colContent.removeClass('fieldNoData');
                    var content = onePiece[fieldName];
                    if(obj.is('.comp_text')){
                        var wrap = $(ele).find('.muix-text');
                        wrap.html(window.parent.textGetHtml(content,wrap[0]));
                    }else if(obj.is('.comp_image')){
                        $(ele).find('img')[0].src = content;
                    }
                }else{
                    colContent.addClass('fieldNoData');
                }
            });
    });
}
function addListInfo(comp,id){
    $.merge(comp.find('.comp,.container'),comp).each(function(i,cp){
        $(cp).attr({'data-dynidx':++dynIdx,'data-listid':id});
    });
    return comp;
}
function removeListInfo(comp){
    $.merge(comp.find('.comp'),comp).each(function(i,o){
        var cp = $(o);
        cp.removeAttr('data-dynidx').removeAttr('data-listid');
        if(cp.is('[data-srcfield]')){
            cp.removeAttr('data-srcfield');
            if(cp.is('.comp_text')){
                //cp.find('.muix-text').html('默认文字');
            }else if(cp.is('.comp_image')){
                cp.find('img').attr('src','images/image.jpg');
            }
        }
    });
    return comp;
}
/*var listReqing,typeReqing,subtypeReqing;
function requestDataSuc(dataStr){
    var data;
    if(dataStr){
        data = JSON.parse(dataStr);
    }else{
        return;
    }
    dataSrcs[typeReqing][subtypeReqing] = data;
    if(data.length>0){
        updateSrcfield(listReqing.children('.mui-row').eq(0),data,listReqing);
    }else{
        alert('暂无内容1');
    }
}*/
/*function updatePagenameText(){
    $('.comp_text[data-ispagename]').each(function(i,ele){
        var wrap = $(ele).find('.muix-text');
        var html = window.parent.textGetHtml(pageData.name,wrap[0]);
        wrap.html(html);
        getCompData($(ele).attr('id').split('_')[1]).html = html;
    }); 
}*/
function buildComp(data){
    var type = data.type;
    ++compIdx;
    data.id = compIdx+'';
    var compId = type+'_'+compIdx;
    var comp = $('<div></div>').attr({'draggable':true,'data-type':type,'class':'comp comp_'+type,'id':compId});
    var freeze = data.freeze;
    if(freeze){
    	comp.addClass('freeze').attr('title',FREEZE_COMP_TIPS);
    }else{
    	comp.attr('title','');
    }
    var padding = data.padding,
        width = data.width,
        height = data.height;
    if(padding){
        comp.css('padding',padding);
    }
    if(type=="div"||type=="image"||type=="icon"||type=="text"){
        var linkType = data.linkType;
        if(linkType && linkType!='none'){
            comp.attr('data-linktype',linkType);
            var linkSubtype = data.linkSubtype;
            if(linkSubtype){
                comp.attr('data-linksubtype',linkSubtype);
            }
            var linkSubtype2 = data.linkSubtype2;
            if(linkSubtype2){
                comp.attr('data-linksubtype2',linkSubtype2);
            }
            var link = data.link;
            if(link){
                comp.attr('data-link',link);
            }
        }
    }
    if(type=="text"||type=="div"||type=="image"||type=="icon"||type=="radio"||type=="checkbox"){
        var align = data.align;
        align = align?align:'center';
        comp.addClass('align-'+align);
    }
    
    if(type=="input"||type=="textarea"||type=="radioG"||type=="checkboxG"||type=="select"){
       var name = data.name,
           showName = data.showName,
           required = data.required;
           showName = (showName!=undefined)?showName:true;
           required = (required!=undefined)?required:false;
            comp.append('<div class="formeleNameWrapper'+(showName?'':' none')+'"><span class="formeleName">'+name+'</span><span class="formeleRequired'+(required?'':' none')+'">*</span></div>');
    }
    if(type=="input"||type=="textarea"||type=="radio"||type=="checkbox"||type=="select"){
        comp.addClass('formeleMask');
    }
    switch (type) {
    case 'grid':
        {
            var inner = $('<div class="muix-grid"></div>');
            var colsD = data.containers;
            var allEmpty = true;
            for (var i = 0; i < colsD.length; i++) {
                var colD = colsD[i];
                var col = $('<div class="muix-grid-cell container" style="width:' + colD.width + '"></div>');
                var subCompsD = colD.children;
                if(subCompsD){
                    allEmpty = false;
                    for (var j = 0; j < subCompsD.length; j++) {
                        col.append(buildComp(subCompsD[j]));
                    }
                }else{
                    col.addClass('empty');
                }
                inner.append(col);
            }
            if(allEmpty){
                inner.addClass('empty');
            }
            comp.append(inner);
            break;
        }
    case 'image':
        {
            var srcField = data.srcField;
            if(srcField){
                comp.attr({'data-srcfield':srcField});
            }
            var inner_img = $('<img src="' + data.src + '" draggable="false">');
            if(width){
                inner_img.css('width',width);
            }
            if(height){
                inner_img.css('height',height);
            }
            comp.append(inner_img);
            var inner_desc = $('<div class="imageDesc mui-ellipsis"></div>');
            var desc = data.desc;
            if (desc) {
                inner_desc.html(desc);
            }else{
                inner_desc.addClass('none');
            }
            comp.append(inner_desc);
            break;
        }
    case 'text':
        {
            var inner = $('<div class="muix-text"></div>');
            inner.html(data.html);
            var isPagename = data.ispagename;
            if(isPagename){
                comp.attr({'data-ispagename':'true'});
            }
            var srcField = data.srcField;
            if(srcField){
                comp.attr({'data-srcfield':srcField});
            }
            var lineHeight = data.lineHeight;
            lineHeight = lineHeight==undefined?'1':lineHeight;
            inner.css('line-height',lineHeight);
            comp.append(inner);
            break;
        }
    case 'icon':
        {
            var inner = $('<div class="mui-icon"></div>');
            var shape = data.shape;
            var size = data.size;
            var color = data.color;
            
            shape = shape?shape:'star';
            size = size?size:'24px';
            color = color?color:'#333';
            
            inner.addClass('mui-icon-'+shape);
            inner.css({'font-size':size,'width':size,'height':size,'color':color});
            
            comp.append(inner);
            break;
        }
    case 'div':
        {
            var inner = $('<div class="muix-div"></div>');
            var content = $('<div class="div_content container"></div>');
            inner.append(content);
            if(width){
                inner.css('width',width);
            }
            if(height){
                inner.css({'height':height});
                content.css({'min-height':height});
            }
            var borderT = data.borderT,
                borderR = data.borderR,
                borderB = data.borderB,
                borderL = data.borderL,
                radius = data.radius,
                bgColor = data.bgColor;
            if(borderT){
                inner.css('border-top',borderT);
            }
            if(borderR){
                inner.css('border-right',borderR);
            }
            if(borderB){
                inner.css('border-bottom',borderB);
            }
            if(borderL){
                inner.css('border-left',borderL);
            }
            if(radius){
                inner.css('border-radius',radius);
                content.css('border-radius',radius);
            }
            if(bgColor){
                inner.css('background-color',bgColor);
            }
            var children = data.children;
            if(children){
                for(var i=0;i<children.length;i++){
                    content.append(buildComp(children[i]));
                }
            }else{
                content.addClass('empty');
            }
            comp.append(inner);
            break;
        }
    case 'slider':
        {
            var indicator = data.indicator;
            var activePage = data.activePage;
            var containers = data.containers;
            
            indicator = indicator?indicator:'center';
            activePage = activePage?activePage:0;
            var len = containers.length;
            activePage = activePage>len?(len-1):activePage;
            
            var inner_bar = $('<div class="comp_toolbar"></div>');
            var inner_main = $('<div class="mui-slider"></div>');
            var inner_group = $('<div class="mui-slider-group"></div>');
            var inner_indicator = $('<div class="mui-slider-indicator"></div>');
            if(indicator=='none'){
                inner_indicator.addClass('none');
            }else if(indicator=='right'){
                inner_indicator.addClass('right');
            }
            var autoplay = data.autoplay;
            if(autoplay){
                inner_main.attr('data-autoplay',autoplay);
            }
            
            for(var i=0;i<len;i++){
                var btn = $('<div class="comp_tool">第'+(i+1)+'页</div>');
                var item = $('<div class="mui-slider-item container none"></div>');
                var indicatorObj = $('<div class="mui-indicator"></div>');
                var children = containers[i].children;
                if(children){
                    for(var j=0;j<children.length;j++){
                        item.append(buildComp(children[j]));
                    }
                }else{
                    item.addClass('empty');
                }
                if(i==activePage){
                    btn.addClass('active');
                    item.removeClass('none');
                    indicatorObj.addClass('mui-active');
                }
                inner_bar.append(btn);
                inner_group.append(item);
                inner_indicator.append(indicatorObj);
            }
            
            inner_main.append(inner_group);
            if(inner_indicator){
                inner_main.append(inner_indicator);
            }
            comp.append(inner_bar).append(inner_main);
            break;
        }
    case 'list':
        {
            var rowCnt = data.rowCnt;
            var colCnt = data.colCnt;
            var srcType = data.srcType;
            var srcSubtype = data.srcSubtype;
            srcType = srcType?srcType:'product';
            srcSubtype = srcSubtype?srcSubtype:'0';
            comp.attr('data-rowcnt',rowCnt = rowCnt?rowCnt:3);
            comp.attr('data-colcnt',colCnt = colCnt?colCnt:1);
            comp.attr('data-srctype',srcType);
            comp.attr('data-srcsubtype',srcSubtype);
            
            var col = $('<div class="muix-col"></div>').addClass(listColClassName[colCnt]);
            var container = $('<div class="container"></div>');
            var children = data.children;
            if(children){
                for(var i=0;i<children.length;i++){
                    container.append(addListInfo(buildComp(children[i]),compId));
                }
            }else{
                col.addClass('empty');
                container.addClass('empty');
            }
            col.append(container);
            var row = $('<div class="mui-row"></div>');
            for(var i=0;i<colCnt;i++){
                row.append(col.clone());
            }
            for(var i=0;i<rowCnt;i++){
                comp.append(row.clone());
            }
            //comp.append('<div class="compTipsMask"><div class="compTipsInfo">暂无数据</div><div class="compTipsLink"><a>去添加商品&gt;&gt;</a></div></div>');
            /*listReqing = comp;
            typeReqing = listReqing.attr('data-srctype');
            subtypeReqing = listReqing.attr('data-srcsubtype');
            AJAXRequestData('requestDataSuc','requestDataFail',typeReqing,subtypeReqing,0,20);*/
            break;
        }
    case 'form':
        {
            var inner = $('<form></form>');
            var children = data.children,
                showName = data.showName,
                showBtn = data.showBtn,
                name = data.name;
            showName = (showName!=undefined)?showName:true;
            showBtn = (showBtn!=undefined)?showBtn:true;
            if(name==undefined){
                name = genFormName();
                data.name = name;
            }
            var nameEle = $('<div class="form_name">'+name+'</div>');
            if(!showName){
                nameEle.addClass('none');
            }
            inner.append(nameEle);
            var body = $('<div class="form_body container"></div>');
            if(children){
                for(var j=0;j<children.length;j++){
                    var child = buildComp(children[j]);
                        child.attr('data-formid',compId);
                    body.append(child);
                }
            }else{
                body.addClass('empty');
            }
            inner.append(body);
            var btn = $('<div class="form_btn"><button type="button">提 交</button></div>');
            if(!showBtn){
                btn.addClass('none');
            }
            inner.append(btn);
            comp.append(inner);
            break;
        }
    case 'input':
        {
            var placeHolder = data.placeHolder;
            comp.append('<input type="text" '+(placeHolder?'placeholder="'+placeHolder+'"':'')+' />');
            break;
        }
    case 'textarea':
        {
            var placeHolder = data.placeHolder,
                rows = data.rows;
            comp.append('<textarea id="textarea" rows="'+(rows?rows:'5')+'" '+(placeHolder?'placeholder="'+placeHolder+'"':'')+'></textarea>');
            break;
        }
    case 'radioG':
        {
            var inner = $('<div class="group_body container"></div>');
            var children = data.children;
            for(var j=0;j<children.length;j++){
                var child = buildComp(children[j]);
                    child.attr('data-formid',compId);
                inner.append(child);
            }
            comp.append(inner);
            comp.find('input[type=radio]').attr('name',comp.attr('id').replace('radioG_','radio_'));
            break;
        }
    case 'checkboxG':
        {
            var inner = $('<div class="group_body container"></div>');
            var children = data.children;;
            for(var j=0;j<children.length;j++){
                var child = buildComp(children[j]);
                    child.attr('data-formid',compId);
                inner.append(child);
            }
            comp.append(inner);
            break;
        }
    case 'radio':
        {
            var checked = data.checked,
                name = data.name,
                showName = data.showName;
            showName = (showName!=undefined)?showName:true;
            comp.append('<input class="muix-radio" type="radio"'+(checked?' checked':'')+' />')
                .append('<span class="label'+(showName?'':' none')+'">'+name+'</span>');
            break;
        }
    case 'checkbox':
        {
            var checked = data.checked,
                name = data.name,
                showName = data.showName;
            showName = (showName!=undefined)?showName:true;
            comp.append('<input class="muix-checkbox" type="checkbox"'+(checked?' checked':'')+' />')
                .append('<span class="label'+(showName?'':' none')+'">'+name+'</span>');
            break;
        }
    case 'select':
        {
            var options = data.options,
                selectedIdx = data.selectedIdx;
            selectedIdx = selectedIdx?selectedIdx:0;
            var selectId = 'select_'+data.id;
            var select = $('<div id="'+selectId+'" class="muix-select mui-ellipsis">'+options[selectedIdx].name+'</div>');
            comp.append(select);
            break;
        }
    }
    comp.append('<div class="compTitle"><div class="compTitleInner">'+compNames[type]+'</div></div>');
    return comp;
}
var exisitFormNames = [];
function deleteFormName(comp){
    var name = comp.children('form').children('.form_name').text();
    for(var i=0;i<exisitFormNames.length;i++){
        if(exisitFormNames[i]==name){
            exisitFormNames.splice(i,1);
            break;
        }
    }
}
function genFormName(){
    /*var idx = 1;
    var newName;
    var name,flag;
    while(!newName){
        name = '表单'+(idx++);
        flag = true;
        for(var i=0;i<exisitFormNames.length;i++){
            if(exisitFormNames[i]==name){
                flag = false;
                break;
            }
        }
        if(flag){
            newName = name;
            exisitFormNames.push(newName);
        }
    }
    return newName;*/
    return '表单标题';
}
function genFormCopyName(oldName){
    /*var newName;
    var name = oldName,flag;
    while(!newName){
        flag = true;
        for(var i=0;i<exisitFormNames.length;i++){
            if(exisitFormNames[i]==name){
                flag = false;
                break;
            }
        }
        if(flag){
            newName = name;
            exisitFormNames.push(newName);
        }
        name += ' 复制';
    }
    return newName;*/
    return '表单';
}
















