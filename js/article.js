AJAXRequestArticle(requestArticleSuc);

setTimeout(function(){
	AJAXAddArticleReadCount(requestArticleReadSuc);
},500);

function requestArticleSuc(data){
	var statu = data.statu;
    if(statu){
    	var title =  data.title;
    	var time =  data.time;
    	var author =  data.author;
    	var pv =  data.pv;
    	var content = updateImgSrc(data.content);
    	$('.article_title').html(title);
    	$('.article_time').html(formatDate(time));
    	$('.article_author').html('阅读量：'+pv);
    	$('.article_content').html(content);
    }
}

function requestArticleReadSuc(data){
	
	var statu = data.statu;
    if(statu){
    var readCount=$('.article_author').text();
    readCount=parseInt(readCount.substring(readCount.indexOf("：")+1,readCount.length));
   
    	$('.article_author').html('阅读量：'+parseInt(readCount+1));
    	
    }
}

function formatDate (strTime) {
    var date = new Date(parseInt(strTime+'000'));
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}


function  updateImgSrc(content){
	

	var content=content.replace(/\http:\/\/183.62.12.16:5120\/portal\/js\/ckeditor\/images\/Image/g, "images");
	//本地用127.0.0.1:8080/portal......
	   
	
	return  content;
}
