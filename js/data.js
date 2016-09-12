
var host='http://183.62.12.16:5120/portal';//本地用127.0.0.1:8080/portal
function AJAXRequestType(suc,fail,type,customData){
    /*var data = dataSrcsTypeServer[type];
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(suc+'(\''+dataStr+'\')');
    },500);*/
    if(type=='product'){
    	var shopAddress="",sitePath="";
        $.ajax({
            type: 'get',
            url: host+"/shop/restShopAddress.action?t="+new Date().getTime(),
            data: {siteId:siteId},
            dataType: 'json',
            async:false,
            success: function(res){
            	var result=res.result;
            	if(result==1){
            		 shopAddress=res.address;
            		 sitePath=res.sitePath;
            	}
            	
            	
            },
            error: function(res){
            	
            }
        });
        
    
        $.ajax({
            type: 'get',
            url: shopAddress+"/?/getCategory/category/emark="+sitePath,
            data: {customData:JSON.stringify(customData)},
            dataType: 'json',
            success: suc,
            error: fail
        });
    }else if(type=='article'){
        AJAXRequestArticleChannel(function(res){
        	console.log(res);
	        if(res && res.statu && res.channels){
	        	var data = {
	        		data:res.channels
	        	};
	    		suc(data);
			}else{
				fail();
			}
        });
    }else{
        fail();
    }
}
function AJAXRequestData(suc,fail,type,subType,startIdx,cnt,customData,isRest){	
    /*var data = [];
    var dataAll = dataSrcsServer[type][subType];
    if(dataAll){
        for(var i=0;i<cnt;i++){
            var dataI = dataAll[i];
            if(dataI){
                data.push(dataI);
            }else{
                break;
            }
        }
    }
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(suc+'(\''+dataStr+'\')');
    },500);*/
	
	
    
    customData?{}:customData;
    if(type=='product'){
    	
    	var shopAddress="",sitePath="";
        $.ajax({
            type: 'get',
            url: host+"/shop/restShopAddress.action?t="+new Date().getTime(),
            data: {siteId:siteId},
            dataType: 'json',
            async:false,
            success: function(res){
            	var result=res.result;
            	if(result==1){
            		 shopAddress=res.address;
            		 sitePath=res.sitePath;
            	}
            	
            	
            },
            error: function(res){
            	
            }
        });
        
        $.ajax({
            type: 'get',
            url: shopAddress+"/?/getCategory/details/emark="+sitePath,
            data: {type:subType,startIdx:0,count:cnt,customData:JSON.stringify(customData)},
            dataType: 'json',
            success: suc,
            error: fail
        });
    }else if(type=='article'){
    	console.log('栏目id：'+subType);
    	var requestArticleList = isRest?RestRequestArticleList:AJAXRequestArticleList;
        requestArticleList(function(res){
        	console.log(res);
	        if(res && res.statu && res.articles){
	        	var articles = res.articles;
		    	for(var i=0;i<articles.length;i++){
		    		var di = articles[i],
		    			fullTime = di.time,
		    			dateObj = new Date(parseInt(fullTime)),
		    			year = dateObj.getFullYear(),
		    			month = dateObj.getMonth()+1,
		    			day = dateObj.getDate(),
		    			hour = dateObj.getHours(),
		    			minute = dateObj.getMinutes();
		    		delete di.time;
		    		month = month<10?('0'+month):(''+month);
		    		day = day<10?('0'+day):(''+day);
		    		hour = hour<10?('0'+hour):(''+hour);
		    		minute = minute<10?('0'+minute):(''+minute);
		    		di['year'] = ''+year;
		    		di['month'] = month;
		    		di['day'] = day;
		    		di['hour'] = hour;
		    		di['minute'] = minute;
		    		di['date'] = year+'-'+month+'-'+day;
		    		di['time'] = hour+':'+minute;
		    	}
	        	var data = {
	        		data:articles,
	        		customData:res.customData,
	        		type:'article'
	        	};
				suc(data);
			}else{
				fail();
			}
        },subType,startIdx,cnt,customData);
    }else{
        fail();
    }
}


function RestRequestArticleList(callback,channelId,startIdx,cnt,customData){	//请求文章列表
	console.log('RestRequestArticleList..............');
	
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
		url: host+"/article/restfulList.action?t="+new Date().getTime(),
		
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success RestRequestArticleList');
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
						jsonStr.pv = 0;
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
			console.log('error RestRequestArticleList');
			rtn(callback,data);
		}
	});
}



function RestquestFormCommit(callback,commitId,formName,formElements){	//请求文章列表
	console.log('RestquestFormCommit..............');
	
	 var statu = 0;
	    var data = {
	                    statu:statu
	                };
	    
	var params = {
 			'formId':commitId,
 			'formDatas':JSON.stringify(formElements)	
 			
		};
	$.ajax({
		type: "POST",
		url: host+"/form/restfulAddData.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success RestquestFormCommit');
			console.log(res);
			
		var result =res.result;
		  data.statu=result
			
			rtn(callback,data);
		},
		error:function(res){
			console.log('error RestquestFormCommit');
			rtn(callback,data);
		}
	});
}

function AJAXRequestArticle(callback){	//请求文章
	console.log('AJAXRequestArticle..............');
	
	 var statu = 0;
	    var data = {
	                    statu:statu
	                };
	    
	var params = {
 			'articleId':articleId
 			
 			
		};
	$.ajax({
		type: "POST",
		url: host+"/article/restfulGetArticle.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestArticle');
			console.log(res);
			
		var result =res.result;
		if(result==1){
			var article=res.article;
			data.title=article.title;
			data.time=article.createTime;
		    data.pv=article.pv;
		    data.author='';
		    data.content=article.mainBody;
		  
		}
		
		  data.statu=result;
		  
			
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestArticle');
			rtn(callback,data);
		}
	});
}


function AJAXAddArticleReadCount(callback){	//请求文章
	console.log('AJAXRequestArticle..............');
	
	 var statu = 0;
	    var data = {
	                    statu:statu
	                };
	    
	var params = {
 			'articleId':articleId
 			
 			
		};
	$.ajax({
		type: "GET",
		url: host+"/article/restfulAddPv.action?t="+new Date().getTime(),
		data: params,
		dataType:'json',
		success: function(res){
			console.log('success AJAXRequestArticle');
			console.log(res);
			
		var result =res.result;
		
			data.pv=res.pv;

		  data.statu=result;
		  
			
			rtn(callback,data);
		},
		error:function(res){
			console.log('error AJAXRequestArticle');
			rtn(callback,data);
		}
	});
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


