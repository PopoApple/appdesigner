var siteId=$("#siteId",parent.document).val();
var rootPath=$("#rootPath",parent.document).val();
if(siteId==null){
	siteId=$("#siteId",parent.parent.document).val();
		 rootPath=$("#rootPath",parent.parent.document).val();
		
}



function rtn(callback,data){
	if(!data){
		data = {
			statu:0,
			info:'请求失败'
		};
	}
	if(typeof callback === 'function'){
		callback(data);
	}else{
		var dataStr = JSON.stringify(data);
		eval(callback+'(\''+dataStr+'\')');
	}
}


function AJAXRequestPageList(callback){
	
  /** var data = {
        statu:1,
        homePageid:'1',
        homePage:{
                   
                    header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"13","shape":"bars","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":0,"html":"主页","padding":"14px 0px 0px","id":"12"}]},{"width":"15%"}],"id":"11"}]},
                    leftmenu:{id:'2'},
                    rightmenu:{id:'3'},
                    footer:{id:'4',show:0},
                    children:[]
                },
        pageList:[
            {id:'1',name:'页面 1',pUrl:'www.xxx.com'},
            {id:'2',name:'页面 2',pUrl:'www.xxx.com'},
            {id:'3',name:'页面 3',pUrl:'www.xxx.com'}
        ]
    }; **/
	

	var  	rows=[];
	
	 var data = {
      statu:0,
      pageList:rows
    };
    
    var params = {
 			'siteId':siteId
 			
		};
   
	$.ajax({
		type: "GET",
		url: rootPath+"/site/pageList.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestPageList');
			console.log(res);
			
			var  list=res.pageList;
			
			if(list!=''){
				data.statu=1;
				var homepage=res.page;
				data.homePageid=homepage.id;//主页pageid
				data.homePage=JSON.parse(homepage.pageData);//主页pagedata
				
			
				//站点下的所有页面列表
				for(var  i=0;i<list.length;i++){
					var page=list[i];

					var id=page.id;
					var name=page.name;
					var pUrl='';
					rows.push(createJson(id,name,pUrl)); 
					
					
					
				}
			}
			
			
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestPageList');
			rtn(callback,data);
		}
	});

}

 function createJson(id,name,pUrl) 
{
	var jsonStr = {};
	jsonStr.id = id;
	jsonStr.name = name;
	jsonStr.pUrl = pUrl;
	return jsonStr;

}
 /**
  * 请求一个页面
  * @param callback
  * @param pageId
  * @returns
  */
function AJAXRequestPage(callback,pageId){
  
   /** var data = {
                    statu:statu,
                    pageId:pageId,
                    page:{
                       
                        header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"13","shape":"bars","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":0,"html":name,"padding":"14px 0px 0px","id":"12"}]},{"width":"15%"}],"id":"11"}]},
                        leftmenu:{id:'2'},
                        rightmenu:{id:'3'},
                        footer:{id:'4',show:0},
                        children:[]
                    }
                };**/
    
    
    
	
	
	 var data = {
     statu:0
    
   };
   
   var params = {
			
			'pageId':pageId	
			
		};
  
   $.ajax({
		type: "GET",
		url: rootPath+"/site/pageInfo.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestPage');
			console.log(res);
			
			var result=res.result;
			
			if(result!=0){
				var thispage=res.page;
				data.statu=1;
				
				data.pageId=thispage.id;//主页pageid
				data.page=JSON.parse(thispage.pageData);
				
			
			}
			
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestPage');
			rtn(callback,data);
		}
	});
	
  
}
/**
 * 添加页面
 * @param callback
 * @param pData
 * @returns
 */
function AJAXRequestAddPage(callback,pageName,pData){
	 var data ={ statu:0};
	 var params = {
	 			'pageName':pageName,
	 			'pageData':JSON.stringify(pData),
	 			'siteId':siteId
	 			
			};
	   
		$.ajax({
			type: "POST",
			url: rootPath+"/site/addPage.action?t="+new Date().getTime(),
			data: params,
			dataType:'json',
			success: function(res){
				console.log('success AJAXRequestAddPage');
				console.log(res);
				
				var  result=res.result;
				if(result==1){
					var  pageId=res.pageId;
					var  priviewURL=res.priviewURL;
					
					data = {
		                    statu:1,
		                    pageId:pageId,
		                    priviewURL:priviewURL
		                };
			
				}
				
				rtn(callback,data);
			},
			error:function(res){
				console.log('error AJAXRequestAddPage');
				rtn(callback,data);
			}
		});
}
/**
 * 修改页面名称
 * @param callback
 * @param pageId
 * @param newName
 * @returns
 */
function AJAXRequestRenamePage(callback,pageId,newName){
	 var data ={statu:0};
	 var params = {
	 			'pageId':pageId,
	 			'newName':newName
	 			
			};
	 
		$.ajax({
			type: "POST",
			url: rootPath+"/site/modifyPageName.action?t="+new Date().getTime(),
			data: params,
			dataType:'json',
			success: function(res){
				console.log('success AJAXRequestRenamePage');
				console.log(res);
				var  result=res.result;
				
				data = {
	                    statu:result
	                };
				rtn(callback,data);
			},
			error:function(res){
				console.log('error AJAXRequestRenamePage');
				rtn(callback,data);
			}
		});
}
/**
 * 删除页面
 * @param callback
 * @param pageId
 * @returns
 */
function AJAXRequestDeletePage(callback,pageId){
	 var data ={statu:0};
	 var params = {
	 			'pageId':pageId
	 			
	 			
			};
	   
	    $.ajax({
			type: "GET",
			url: rootPath+"/site/deletePage.action?t="+new Date().getTime(),
			data: params,
			dataType:'json',
			success: function(res){
				console.log('success AJAXRequestDeletePage');
				console.log(res);
				var  result=res.result;
				data = {
	                    statu:result
	                };
			
				
				rtn(callback,data);
			},
			error:function(res){
				console.log('error AJAXRequestDeletePage');
				rtn(callback,data);
			}
		});
}
/**
 * 设置主页
 * @param callback
 * @param pageId
 * @returns
 */
function AJAXRequestHomePage(callback,pageId){
	var data ={statu:0};
	 var params = {
	 			'pageId':pageId,
	 			'siteId':siteId
	 			
	 			
			};
	  
	    $.ajax({
			type: "GET",
			url: rootPath+"/site/modifyHomepage.action?t="+new Date().getTime(),
			data: params,
			dataType:'json',
			success: function(res){
				console.log('success AJAXRequestHomePage');
				console.log(res);
				var  result=res.result;
				
				data = {
	                   statu:result
	               };
				rtn(callback,data);
			},
			error:function(res){
				console.log('error AJAXRequestHomePage');
				rtn(callback,res);
			}
		});
}
function AJAXRequestSavePage(callback,pageId,pData){

	
	//**从pagedata中解析出表单
	var forms=[],links=[],images=[];
	var pagedata=pData.children;
	
	
	images=JSON.stringify(iterJsonImage(images,pData));
	forms=JSON.stringify(iterJsonForm(forms,pData));
	links=JSON.stringify(iterJsonLink(links,pData));
	
	
    var statu = 0;
    var data = {
                    statu:statu
                };
    
    var params = {
 			'pageId':pageId,
 			'pageData':JSON.stringify(pData),
 			'forms':forms,
 			 'links':links,
 			 'images':images,
 			
 			
 			
		};
   
    
	$.ajax({
		type: "POST",
		url: rootPath+"/site/savePageInfo.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestSavePage');
			console.log(res);
			var  result=res.result;
			if(result==1){
				data.statu=1;
			}
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestSavePage');
			rtn(callback,data);
		}
	});
}

//TODO
function AJAXRequestReleasePage(callback,pageId,pData){

	
	//**从pagedata中解析出表单
	var forms=[],links=[],images=[];
	var pagedata=pData.children;
	
	
	images=JSON.stringify(iterJsonImage(images,pData));
	forms=JSON.stringify(iterJsonForm(forms,pData));
	links=JSON.stringify(iterJsonLink(links,pData));
	
	
    var statu = 0;
    var data = {
                    statu:statu
                };
    
    var params = {
 			'pageId':pageId,
 			'pageData':JSON.stringify(pData),
 			'forms':forms,
 			 'links':links,
 			 'images':images	
 			
		};
   
    
	$.ajax({
		type: "POST",
		url: rootPath+"/site/releasePage.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestReleasePage');
			console.log(res);
			var  result=res.result;
			if(result==1){
				data.statu=1;
				data.isRelease=res.isSiteRelease;//TODO
			}
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestReleasePage');
			rtn(callback,data);
		}
	});
}


function iterJsonLink(links,json){
	
    for(var key in json){
        if(json[key] && typeof json[key] == 'object'){
        	if(key=="children"){
        		 for(var i=0;i<json[key].length;i++){
        		        var  element=json[key][i];
        		        //页面链接
        		        if(element.linkType!=''){
        		        	if(element.linkType=='page'&&element.linkSubtype=='custom'){
        		        		var jsonStr = {};
        		    			jsonStr.linkPageId = element.linkSubtype2;
        		    		
        		    			links.push(jsonStr); 
        		        	}
        		        	
        		        	
        		        }
        		 }
        	}
        	
        	iterJsonLink(links,json[key]);
        }
    }
    return  links;

}

function iterJsonForm(forms,json){
	
    for(var key in json){
        if(json[key] && typeof json[key] == 'object'){
        	if(key=="children"){
        		 for(var i=0;i<json[key].length;i++){
        		        var  element=json[key][i];
        		        if(element.type=='form'){
        		        	var id=element.commitId;
        					var name=element.name;
        				
        					var jsonStr = {};
        					jsonStr.id = id;
        					jsonStr.name = name;
        					
        					forms.push(jsonStr); 
        		        }
        		 }
        	}
        	
        	iterJsonForm(forms,json[key]);
        }
    }
    return  forms;

}

function iterJsonImage(images,json){
	
    for(var key in json){
        if(json[key] && typeof json[key] == 'object'){
        	if(key=="children"){
        		 for(var i=0;i<json[key].length;i++){
        		        var  element=json[key][i];
        		        if(element.type=='image'){
        		        	var filename=element.src;
        		        	var jsonStr = {};
        					jsonStr.filename = filename;
        		        	images.push(jsonStr);
        		        }
        		 }
        	}
        	
        	iterJsonImage(images,json[key]);
        }
    }
    return  images;

}



function AJAXRequestImage(callback,startIdx,cnt){	//请求图片资源
	
	console.log('AJAXRequestImage..............');
	
	
    var statu = 0;
    var data = {
                    statu:statu
                };
    var images=[];
    
	var params = {
 			'siteId':siteId,
 			'startIdx':startIdx,	//起始序号
 			'cnt':cnt				//请求数目
		};
	$.ajax({
		type: "GET",
		url: rootPath+"/site/image.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestImage');
			console.log(res);
			
			var  imageList=res.imageList;
			if(imageList!=''&&imageList.length>0){
				data.statu=1;
				for(var i=0;i<imageList.length;i++){
			        var  element=imageList[i];
			        
			       
			        	var id=element.id;
						var title=element.name;
						var url=element.savefileName;
					
						var jsonStr = {};
						jsonStr.id = id;
						jsonStr.title = title;
						jsonStr.url = "images/"+url;//根路径是在site/Edit下
						
						images.push(jsonStr); 
						
			        	
			        }
				data.imgs=images;
			}
		        
			
			/* 返回格式
			 {
        		statu:1,
		        imgs:[
		        	{id:'1',title:'图片1',url:'http://www.xx.com/yy/1.png'},
    				{id:'2',title:'图片2',url:'http://www.xx.com/yy/2.png'}
		        ]
		    }
			 */
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestImage');
			rtn(callback,data);
		}
	});
}
function AJAXRequestArticleChannel(callback){	//请求文章频道列表
	console.log('AJAXRequestArticleChannel..............');
	
	 var statu = 0;
	    var data = {
	                    statu:statu
	                };
	    var columns=[];
	    
	    
	    
	var params = {
 			'siteId':siteId			
		};
	$.ajax({
		type: "GET",
		url: rootPath+"/article/getAllColumns.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestArticleChannel');
			console.log(res);
			
			var  columnList=res.columns;
			if(columnList!=''&&columnList.length>0){
				data.statu=1;
				for(var i=0;i<columnList.length;i++){
			        var  element=columnList[i];
			        
			       
			        	var id=element.articleColumnId;
						var title=element.title;
						
					
						var jsonStr = {};
						jsonStr.id = id;
						jsonStr.name = title;
						columns.push(jsonStr); 
						
			        	
			        }
				data.channels=columns;
			}
			
			/* 返回格式
			 {
		        statu:1,
		        channels:[
		        	{id:'1',name:'新闻'},
		        	{id:'2',name:'娱乐'}
		        ]
		     }
			 */
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestArticleChannel');
			rtn(callback,data);
		}
	});
}
function AJAXRequestArticleList(callback,channelId,startIdx,cnt,customData){	//请求文章列表
	console.log('AJAXRequestArticleList..............');
	
	 var statu = 0;
	    var data = {
	                    statu:statu
	                };
	    var articles=[];
	var params = {
 			'siteId':siteId,
 			'channelId':channelId,	//频道id
 			'startIdx':startIdx,	//起始序号
 			'cnt':cnt				//请求数目
		};
	$.ajax({
		type: "GET",
		url: rootPath+"/article/list.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestArticleList');
			console.log(res);
			
			var  articleList=res.articleList;
			if(articleList!=''&&articleList.length>0){
				data.statu=1;
				for(var i=0;i<articleList.length;i++){
			        var  element=articleList[i];
			       
			        var id=element.articleId;
					var title=element.title;
					var summary=element.summary;
					var img=element.coverPicture;
					var time=element.createTime+"000";
					var articleFileName="a"+id+".html";
					
				
					var jsonStr = {};
					jsonStr.id = id;
					jsonStr.title = title;
					jsonStr.summary = summary;
					jsonStr.time = time;
					jsonStr.pv = 10;
					jsonStr.img = img;
					jsonStr.url=articleFileName;
					articles.push(jsonStr); 
						
			        	
			        }
				data.articles=articles;
			}
			
			data.customData=customData;
			/* 返回格式
			 {
        		statu:1,
		        articles:[
		        	{id:'1',title: '文章1',summary: '摘要摘要摘要摘要摘要摘要1',time: '1477983120000',pv:'11',img:'http://www.xx.com/yy/1_1.jpg'},
              		{id:'2',title: '文章2',summary: '摘要摘要摘要摘要摘要摘要2',time: '1477096380000',pv:'22',img:'http://www.xx.com/yy/1_2.jpg'}
		        ]
		    }
			 */
			
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestArticleList');
			rtn(callback,data);
		}
	});
}

