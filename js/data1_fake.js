testMode = true;
var siteId = '21';

var dataSrcsTypeServer = {
    product:[{id:'1',name:'美食'},{id:'2',name:'二手'}],
    article:[{id:'1',name:'新闻'},{id:'2',name:'活动'}]
};
var dataSrcsServer = {
    product:{
        
          '0':[
              {title: '商品名称1',summary: '商品描述1',date: '2016-10-01',price:'100.00',selled:'12'},
              {title: '商品名称2',summary: '商品描述2',date: '2016-10-02',price:'200.00',selled:'2345'},
              {title: '商品名称3',summary: '商品描述3',date: '2016-10-03',price:'300.00',selled:'367'},
              {title: '商品名称4',summary: '商品描述4',date: '2016-10-04',price:'400.00',selled:'4890'},
              {title: '商品名称5',summary: '商品描述5',date: '2016-10-05',price:'500.00',selled:'512'},
              {title: '商品名称6',summary: '商品描述6',date: '2016-10-06',price:'600.00',selled:'612'},
              {title: '商品名称7',summary: '商品描述7',date: '2016-10-07',price:'700.00',selled:'712'},
              {title: '商品名称8',summary: '商品描述8',date: '2016-10-08',price:'800.00',selled:'812'},
              {title: '商品名称9',summary: '商品描述9',date: '2016-10-09',price:'900.00',selled:'912'},
              {title: '商品名称10',summary: '商品描述10',date: '2016-10-10',price:'1000.00',selled:'1012'}
          ],  
        
        
          '1':[
              {title: '美食商品1',summary: '美食描述描述描述描述描述描述1',date: '2016-11-01',price:'100.00',selled:'11'},
              {title: '美食商品2',summary: '美食描述描述描述描述描述描述2',date: '2016-11-02',price:'200.00',selled:'22'},
              {title: '美食商品3',summary: '美食描述描述描述描述描述描述3',date: '2016-11-03',price:'300.00',selled:'33'},
              {title: '美食商品4',summary: '美食描述描述描述描述描述描述4',date: '2016-11-04',price:'400.00',selled:'44'},
              {title: '美食商品5',summary: '美食描述描述描述描述描述描述5',date: '2016-11-05',price:'500.00',selled:'55'},
              {title: '美食商品6',summary: '美食描述描述描述描述描述描述6',date: '2016-11-06',price:'600.00',selled:'66'},
              {title: '美食商品7',summary: '美食描述描述描述描述描述描述7',date: '2016-11-07',price:'700.00',selled:'77'},
              {title: '美食商品8',summary: '美食描述描述描述描述描述描述8',date: '2016-11-08',price:'800.00',selled:'88'},
              {title: '美食商品9',summary: '美食描述描述描述描述描述描述9',date: '2016-11-09',price:'900.00',selled:'99'},
              {title: '美食商品10',summary: '美食描述描述描述描述描述描述10',date: '2016-11-10',price:'1000.00',selled:'1010'}
          ], 
       
       
          '2':[
              {title: '二手商品1',summary: '二手描述描述描述描述描述描述1',date: '2016-12-01',price:'100.00',selled:'10'},
              {title: '二手商品2',summary: '二手描述描述描述描述描述描述2',date: '2016-12-02',price:'200.00',selled:'20'},
              {title: '二手商品3',summary: '二手描述描述描述描述描述描述3',date: '2016-12-03',price:'300.00',selled:'30'},
              {title: '二手商品4',summary: '二手描述描述描述描述描述描述4',date: '2016-12-04',price:'400.00',selled:'40'},
              {title: '二手商品5',summary: '二手描述描述描述描述描述描述5',date: '2016-12-05',price:'500.00',selled:'50'},
              {title: '二手商品6',summary: '二手描述描述描述描述描述描述6',date: '2016-12-06',price:'600.00',selled:'60'},
              {title: '二手商品7',summary: '二手描述描述描述描述描述描述7',date: '2016-12-07',price:'700.00',selled:'70'},
              {title: '二手商品8',summary: '二手描述描述描述描述描述描述8',date: '2016-12-08',price:'800.00',selled:'80'},
              {title: '二手商品9',summary: '二手描述描述描述描述描述描述9',date: '2016-12-09',price:'900.00',selled:'90'},
              {title: '二手商品10',summary: '二手描述描述描述描述描述描述10',date: '2016-12-10',price:'1000.00',selled:'100'}
          ]  
      
    },
    article:{
       
          '0':[
              {title: '文章 1',summary: '文章摘要',date: '2015-10-01',visited:'123'},
              {title: '文章 2',summary: '文章摘要',date: '2015-10-02',visited:'223'},
              {title: '文章 3',summary: '文章摘要',date: '2015-10-03',visited:'323'},
              {title: '文章 4',summary: '文章摘要',date: '2015-10-04',visited:'423'},
              {title: '文章 5',summary: '文章摘要',date: '2015-10-05',visited:'523'},
              {title: '文章 6',summary: '文章摘要',date: '2015-10-06',visited:'623'},
              {title: '文章 7',summary: '文章摘要',date: '2015-10-07',visited:'723'},
              {title: '文章 8',summary: '文章摘要',date: '2015-10-08',visited:'823'},
              {title: '文章 9',summary: '文章摘要',date: '2015-10-09',visited:'923'},
              {title: '文章 10',summary: '文章摘要',date: '2015-10-10',visited:'1023'}
          ],  
       
       
          '1':[
              {title: '新闻标题1',summary: '新闻摘要摘要摘要摘要摘要摘要1',date: '2015-11-01',visited:'123'},
              {title: '新闻标题2',summary: '新闻摘要摘要摘要摘要摘要摘要2',date: '2015-11-02',visited:'123'},
              {title: '新闻标题3',summary: '新闻摘要摘要摘要摘要摘要摘要3',date: '2015-11-03',visited:'123'},
              {title: '新闻标题4',summary: '新闻摘要摘要摘要摘要摘要摘要4',date: '2015-11-04',visited:'123'},
              {title: '新闻标题5',summary: '新闻摘要摘要摘要摘要摘要摘要5',date: '2015-11-05',visited:'123'},
              {title: '新闻标题6',summary: '新闻摘要摘要摘要摘要摘要摘要6',date: '2015-11-06',visited:'123'},
              {title: '新闻标题7',summary: '新闻摘要摘要摘要摘要摘要摘要7',date: '2015-11-07',visited:'123'},
              {title: '新闻标题8',summary: '新闻摘要摘要摘要摘要摘要摘要8',date: '2015-11-08',visited:'123'},
              {title: '新闻标题9',summary: '新闻摘要摘要摘要摘要摘要摘要9',date: '2015-11-09',visited:'123'},
              {title: '新闻标题10',summary: '新闻摘要摘要摘要摘要摘要摘要10',date: '2015-11-10',visited:'123'}
          ],  
     
       
          '2':[
              {title: '活动标题1',summary: '活动摘要摘要摘要摘要摘要摘要1',date: '2015-12-01',visited:'123'},
              {title: '活动标题2',summary: '活动摘要摘要摘要摘要摘要摘要2',date: '2015-12-02',visited:'123'},
              {title: '活动标题3',summary: '活动摘要摘要摘要摘要摘要摘要3',date: '2015-12-03',visited:'123'},
              {title: '活动标题4',summary: '活动摘要摘要摘要摘要摘要摘要4',date: '2015-12-04',visited:'123'},
              {title: '活动标题5',summary: '活动摘要摘要摘要摘要摘要摘要5',date: '2015-12-05',visited:'123'},
              {title: '活动标题6',summary: '活动摘要摘要摘要摘要摘要摘要6',date: '2015-12-06',visited:'123'},
              {title: '活动标题7',summary: '活动摘要摘要摘要摘要摘要摘要7',date: '2015-12-07',visited:'123'},
              {title: '活动标题8',summary: '活动摘要摘要摘要摘要摘要摘要8',date: '2015-12-08',visited:'123'},
              {title: '活动标题9',summary: '活动摘要摘要摘要摘要摘要摘要9',date: '2015-12-09',visited:'123'},
              {title: '活动标题10',summary: '活动摘要摘要摘要摘要摘要摘要10',date: '2015-12-10',visited:'123'}
          ]  
       
    }
};
var imageSrcAll = [
    {id:'1',title:'图片1',url:'images/imagesrc/1.jpg'},
    {id:'2',title:'图片2',url:'images/imagesrc/2.jpg'},
    {id:'3',title:'图片3',url:'images/imagesrc/3.jpg'},
    {id:'4',title:'图片4',url:'images/imagesrc/4.jpg'},
    {id:'5',title:'图片5',url:'images/imagesrc/5.jpg'},
    {id:'6',title:'图片6',url:'images/imagesrc/6.jpg'},
    {id:'7',title:'图片7',url:'images/imagesrc/7.jpg'},
    {id:'8',title:'图片8',url:'images/imagesrc/8.jpg'},
    {id:'9',title:'图片9',url:'images/imagesrc/9.jpg'},
    {id:'10',title:'图片10',url:'images/imagesrc/10.jpg'},
    {id:'11',title:'图片11',url:'images/imagesrc/11.jpg'},
    {id:'12',title:'图片12',url:'images/imagesrc/12.jpg'},
    {id:'13',title:'图片13',url:'images/imagesrc/13.jpg'},
    {id:'14',title:'图片14',url:'images/imagesrc/14.jpg'},
    {id:'15',title:'图片15',url:'images/imagesrc/15.jpg'},
    {id:'16',title:'图片16',url:'images/imagesrc/16.jpg'},
    {id:'17',title:'图片17',url:'images/imagesrc/17.jpg'},
    {id:'18',title:'图片18',url:'images/imagesrc/18.jpg'},
    {id:'19',title:'图片19',url:'images/imagesrc/19.jpg'},
    {id:'20',title:'图片20',url:'images/imagesrc/20.jpg'},
    {id:'21',title:'图片21',url:'images/imagesrc/21.jpg'},
    {id:'22',title:'图片22',url:'images/imagesrc/22.jpg'},
    {id:'23',title:'图片23',url:'images/imagesrc/23.jpg'},
    {id:'24',title:'图片24',url:'images/imagesrc/24.jpg'},
    {id:'25',title:'图片25',url:'images/imagesrc/25.jpg'},
    {id:'26',title:'图片26',url:'images/imagesrc/26.jpg'},
    {id:'27',title:'图片27',url:'images/imagesrc/27.jpg'},
    {id:'28',title:'图片28',url:'images/imagesrc/28.jpg'},
    {id:'29',title:'图片29',url:'images/imagesrc/29.jpg'},
    {id:'30',title:'图片30',url:'images/imagesrc/10.jpg'},
    {id:'31',title:'图片31',url:'images/imagesrc/31.jpg'},
    {id:'32',title:'图片32',url:'images/imagesrc/32.jpg'},
    {id:'33',title:'图片33',url:'images/imagesrc/33.jpg'},
    {id:'34',title:'图片34',url:'images/imagesrc/34.jpg'},
    {id:'35',title:'图片35',url:'images/imagesrc/35.jpg'},
    {id:'36',title:'图片36',url:'images/imagesrc/36.jpg'},
    {id:'37',title:'图片37',url:'images/imagesrc/37.jpg'},
    {id:'38',title:'图片38',url:'images/imagesrc/38.jpg'},
    {id:'39',title:'图片39',url:'images/imagesrc/39.jpg'},
    {id:'40',title:'图片40',url:'images/imagesrc/40.jpg'},
    {id:'41',title:'图片41',url:'images/imagesrc/41.jpg'},
    {id:'42',title:'图片42',url:'images/imagesrc/42.jpg'},
    {id:'43',title:'图片43',url:'images/imagesrc/43.jpg'},
    {id:'44',title:'图片44',url:'images/imagesrc/44.png'},
    {id:'45',title:'图片45',url:'images/imagesrc/45.png'},
    {id:'46',title:'图片46',url:'images/imagesrc/46.png'},
    {id:'47',title:'图片47',url:'images/imagesrc/47.png'},
    {id:'48',title:'图片48',url:'images/imagesrc/48.png'},
    {id:'49',title:'图片49',url:'images/imagesrc/49.png'},
    {id:'50',title:'图片50',url:'images/imagesrc/50.png'},
    {id:'51',title:'图片51',url:'images/imagesrc/51.png'},
    {id:'52',title:'图片52',url:'images/imagesrc/52.png'},
    {id:'53',title:'图片53',url:'images/imagesrc/53.png'},
    {id:'54',title:'图片54',url:'images/imagesrc/54.png'},
    {id:'55',title:'图片55',url:'images/imagesrc/55.png'},
    {id:'56',title:'图片56',url:'images/imagesrc/56.jpg'},
    {id:'57',title:'图片57',url:'images/imagesrc/57.jpg'},
    {id:'58',title:'图片58',url:'images/imagesrc/58.jpg'},
    {id:'49',title:'图片59',url:'images/imagesrc/59.jpg'},
    {id:'50',title:'图片60',url:'images/imagesrc/60.jpg'},
    {id:'51',title:'图片61',url:'images/imagesrc/61.jpg'},
    {id:'52',title:'图片62',url:'images/imagesrc/62.jpg'},
    {id:'53',title:'图片63',url:'images/imagesrc/63.jpg'},
    {id:'54',title:'图片64',url:'images/imagesrc/64.jpg'},
    {id:'55',title:'图片65',url:'images/imagesrc/65.jpg'},
    {id:'56',title:'图片66',url:'images/imagesrc/66.jpg'},
    {id:'57',title:'图片67',url:'images/imagesrc/67.jpg'},
    {id:'58',title:'图片68',url:'images/imagesrc/68.jpg'},
    {id:'58',title:'图片69',url:'images/imagesrc/69.jpg'},
    {id:'58',title:'图片70',url:'images/imagesrc/70.jpg'},
    {id:'58',title:'图片71',url:'images/imagesrc/71.png'},
    {id:'58',title:'图片72',url:'images/imagesrc/72.jpg'}
];
var dataGetcategory2 = [{id:'1',name:'新闻'},{id:'2',name:'娱乐'}];
var dataDetail2 = [
              {cId:'1',title: '新闻文章1',summary: '新闻摘要摘要摘要摘要摘要摘要1',time: '1472178619000',pv:'11',img:'1_1.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章2',summary: '新闻摘要摘要摘要摘要摘要摘要2',time: '1477096380000',pv:'22',img:'1_2.jpg',url:''},
              {cId:'2',title: '娱乐文章1',summary: '娱乐摘要摘要摘要摘要摘要摘要1',time: '1476096980000',pv:'10',img:'2_1.jpg',url:'article.html'},
              {cId:'2',title: '娱乐文章2',summary: '娱乐摘要摘要摘要摘要摘要摘要2',time: '1473509100000',pv:'20',img:'2_2.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章3',summary: '新闻摘要摘要摘要摘要摘要摘要3',time: '1473299100000',pv:'33',img:'1_3.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章4',summary: '新闻摘要摘要摘要摘要摘要摘要4',time: '1475579390000',pv:'44',img:'1_4.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章5',summary: '新闻摘要摘要摘要摘要摘要摘要5',time: '1475579300000',pv:'55',img:'1_5.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章6',summary: '新闻摘要摘要摘要摘要摘要摘要6',time: '1471576380000',pv:'66',img:'1_6.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章7',summary: '新闻摘要摘要摘要摘要摘要摘要7',time: '1470571380000',pv:'77',img:'1_7.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章8',summary: '新闻摘要摘要摘要摘要摘要摘要8',time: '1460571380000',pv:'88',img:'1_8.jpg',url:'article.html'},
              {cId:'2',title: '娱乐文章3',summary: '娱乐摘要摘要摘要摘要摘要摘要3',time: '1460361300000',pv:'30',img:'2_3.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章9',summary: '新闻摘要摘要摘要摘要摘要摘要9',time: '1459769800000',pv:'99',img:'1_9.jpg',url:'article.html'},
              {cId:'1',title: '新闻文章10',summary: '新闻摘要摘要摘要摘要摘要摘要10',time: '1459769100000',pv:'1010',img:'1_10.jpg',url:'article.html'},
              {cId:'2',title: '娱乐文章4',summary: '娱乐摘要摘要摘要摘要摘要摘要4',time: '1459760100000',pv:'40',img:'2_4.jpg',url:'http://www.baidu.com'}
          ];
function AJAXRequestImage(callback,startIdx,cnt){
    var imgs = [];
    var dataAll = imageSrcAll;
    if(dataAll){
        for(var i=startIdx;i<startIdx+cnt;i++){
            var dataI = dataAll[i];
            if(dataI){
                imgs.push(dataI);
            }else{
                break;
            }
        }
    }
	var data = {
        statu:1,
        imgs:imgs
    };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function AJAXRequestArticleChannel(callback){
    var res = {
        statu:1,
        channels:dataGetcategory2
    };
    
    setTimeout(function(){
    	callback(res);
    },500);
}
function AJAXRequestArticleList(callback,channelId,startIdx,cnt,customData){
	console.log('AJAXRequestArticleListFake......');
    var articles = [];
    var dataAll = [];
    if(channelId=='0'){
        dataAll = dataDetail2;
    }else{
        for(var i=0;i<dataDetail2.length;i++){
            var dI = dataDetail2[i];
            if(channelId==dI.cId){
                dataAll.push(dI);
            }
        }
    }
    var data = [];
    for(var i=startIdx;i<startIdx+cnt;i++){
        var dataI = dataAll[i];
        if(dataI){
            data.push(dataI);
        }else{
            break;
        }
    }
	var res = {
        statu:1,
        articles:data,
        customData:customData
    };
    setTimeout(function(){
    	callback(res);
    },500);
}
var pageIdInt = 1;
function AJAXRequestPageList(callback){
	var pageList = [];
	pageList.push({id:'1',name:'主页',pUrl:'page1.html'});
	for(var i=0;i<2;i++){
		var pageId = ++pageIdInt+'';
		pageList.push({id:pageId,name:'页面'+pageId,pUrl:'page'+pageId+'.html'});
	}
    var data = {
        statu:1,
        homePageid:'1',
        /*homePage:{
                    header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"16","shape":"bars","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":0,"html":"主页","padding":"14px 0px 0px","id":"17"}]},{"width":"15%"}],"id":"15"}]},
                    leftmenu:{id:'2'},
                    rightmenu:{id:'3'},
                    footer:{id:'4',show:0},
                    children:[]
                },*/
        homePage:{"pageid":"1","id":"0","name":"站点首页","header":{"id":"1","show":1,"children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"56","children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"58","color":"rgb(255, 255, 255)","shape":"bars","padding":"10px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","html":"<span style=\"color:#FFFFFF;\">家乡特产</span>","padding":"14px 0px 0px","id":"59"}]},{"width":"15%"}],"id":"57"}],"height":"44px"}],"freeze":1},"leftmenu":{"id":"2","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"66","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"68","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"color:#3F3F3F;\"></span><span style=\"color:#3F3F3F;\">皇帝柑</span></span>","id":"70","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"71","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"69","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","borderT":"0px solid rgb(221, 221, 221)","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"72","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\"><span style=\"color:#3F3F3F;\"></span><span style=\"color:#3F3F3F;\">鹰嘴桃</span></span>","id":"74","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"75","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"73","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"76","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\">草莓</span>","id":"78","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"79","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"77","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"80","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\">沙田柚</span>","id":"82","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"83","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"81","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"84","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\">其他</span>","id":"86","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"87","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"85","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1}],"height":"540px"}]},"rightmenu":{"id":"3"},"footer":{"id":"4","show":1,"children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"60","height":"44px","children":[{"type":"grid","containers":[{"width":"25%","children":[{"type":"text","html":"<span style=\"color:#FFFFFF;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">首页</span></span>","align":"center","id":"62","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"1"}]},{"width":"25%","children":[{"type":"text","html":"<span style=\"color:#FFFFFF;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">预定</span></span>","align":"center","id":"63","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"2"}]},{"width":"25%","children":[{"type":"text","html":"<span style=\"color:#FFFFFF;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">精选</span></span>","align":"center","id":"64","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"4"}]},{"width":"25%","children":[{"type":"text","html":"<span style=\"font-size:14px;color:#FFFFFF;\">关于</span>","align":"center","id":"65","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"7"}]}],"id":"61"}]}],"freeze":1},"children":[{"type":"slider","containers":[{"children":[{"type":"image","src":"images/imagesrc/32.jpg","align":"center","id":"12","desc":"一级皇帝柑","linkType":"page","linkSubtype":"custom","linkSubtype2":"3"}]},{"children":[{"type":"image","src":"images/imagesrc/18.jpg","align":"center","id":"13","desc":"特级鹰嘴桃","linkType":"page","linkSubtype":"custom","linkSubtype2":"3"}]},{"children":[{"type":"image","src":"images/imagesrc/5.jpg","align":"center","id":"14","desc":"正宗梅县沙田柚","linkType":"page","linkSubtype":"custom","linkSubtype2":"3"}]}],"id":"11","indicator":"right","autoplay":"3","freeze":1},{"type":"div","borderT":"0px solid rgb(221, 221, 221)","borderB":"0px solid rgb(221, 221, 221)","bgColor":"#fff","children":[{"type":"grid","padding":"15px 5px 10px 5px","containers":[{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(254, 180, 148)","children":[{"type":"icon","shape":"flag","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"18"}],"id":"17","linkType":"page","linkSubtype":"custom","linkSubtype2":"2","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">预定</span>","id":"19"}]},{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(121, 168, 255)","children":[{"type":"icon","shape":"star","color":"#FFFFFF","size":"39px","padding":"7px 0px 0px","id":"21"}],"id":"20","linkType":"page","linkSubtype":"custom","linkSubtype2":"4","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">精选</span>","id":"22"}]},{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(251, 159, 223)","children":[{"type":"icon","shape":"person","color":"#FFFFFF","size":"40px","padding":"7px 0px 0px","id":"24"}],"id":"23","linkType":"page","linkSubtype":"custom","linkSubtype2":"5","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">乡情</span>","id":"25"}]},{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(116, 224, 167)","children":[{"type":"icon","shape":"chatbubble","color":"#FFFFFF","size":"39px","padding":"7px 0px 0px","id":"27"}],"id":"26","linkType":"page","linkSubtype":"custom","linkSubtype2":"6","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">老乡灌水</span>","id":"28"}]}],"id":"16"}],"id":"15","radius":"0px","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"29","children":[{"type":"grid","containers":[{"width":"35%","children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"31","borderB":"0px solid rgb(192, 192, 192)","height":"1px","padding":"7px 0px 0px 10px"}]},{"width":"30%","children":[{"type":"text","html":"<span style=\"color:#51622B;\"><span style=\"color:#00AF50;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">特别</span></span><span style=\"color:#00AF50;font-size:14px;\">推荐</span></span>","align":"center","id":"32"}]},{"width":"35%","children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"33","borderB":"0px solid rgb(0, 128, 64)","height":"1px","padding":"7px 10px 0px 0px"}]}],"id":"30","padding":"13px 0px 10px"}],"padding":"6px 0px 0px","freeze":1},{"type":"div","bgColor":"rgb(239, 239, 244)","align":"center","id":"34","children":[{"type":"grid","containers":[{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"36","padding":"0px 3px 0px 0px","children":[{"type":"image","src":"images/imagesrc/40.jpg","align":"center","id":"37","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">皇帝柑30斤礼盒装</span>","align":"center","id":"38","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]},{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"39","children":[{"type":"image","src":"images/imagesrc/42.jpg","align":"center","id":"40","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">一级鹰嘴桃</span>","align":"center","id":"41","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","padding":"0px 0px 0px 3px","freeze":1}]}],"id":"35","padding":"6px 0px 0px"},{"type":"grid","containers":[{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"43","padding":"0px 3px 0px 0px","children":[{"type":"image","src":"images/imagesrc/13.jpg","align":"center","id":"44","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;line-height:12px;\">特大奶油草莓</span>","align":"center","id":"45","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]},{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"46","children":[{"type":"image","src":"images/imagesrc/12.jpg","align":"center","id":"47","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">鹰嘴桃20斤礼盒装</span>","align":"center","id":"48","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","padding":"0px 0px 0px 3px"}]}],"id":"42","padding":"6px 0px 0px"},{"type":"grid","containers":[{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"50","padding":"0px 3px 5px 0px","children":[{"type":"image","src":"images/imagesrc/5.jpg","align":"center","id":"51","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;line-height:12px;\">正宗梅县沙田柚</span>","align":"center","id":"52","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]},{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"53","padding":"0px 0px 5px 3px","children":[{"type":"image","src":"images/imagesrc/38.jpg","align":"center","id":"54","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">奶油草莓10斤礼盒装</span>","align":"center","id":"55","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]}],"id":"49","padding":"6px 0px 0px"}],"freeze":1,"padding":"0px 0px 20px"}],"ishome":1,"iscurrent":1},
        pageList:pageList,
        replaceList : {'1':'51','2':'52','3':'53','4':'54'}
    };
    setTimeout(function(){
        callback(data);
    },500);
}
function AJAXRequestPage(callback,pageId){
    var name = '页面'+pageId;
    var statu = 1;
    if(pageId=='2'){
        statu = 0;
    }
    var data = {
                    statu:statu,
                    pageId:pageId,
                    page:{
                        header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"46","shape":"bars","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":0,"html":"页面3","padding":"14px 0px 0px","id":"47"}]},{"width":"15%"}],"id":"45"}]},
                        leftmenu:{id:'2'},
                        rightmenu:{id:'3'},
                        footer:{id:'4',show:0},
                        children:[]
                    },
        			replaceList : {'1':'51','2':'52','3':'53','4':'54'}
                };
    setTimeout(function(){
        callback(data);
    },500);
}
function AJAXRequestAddPage(callback,pageName,pData){
    var statu = 1;
    var pageId = ++pageIdInt+'';
    var pUrl = 'page'+pageId+'.html';
    var data = {
                    statu:statu,
                    pageId:pageId,
                    pUrl:pUrl
                };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function AJAXRequestRenamePage(callback,pageId,newName){
    var statu = 1;
    var data = {
                    statu:statu
                };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function AJAXRequestDeletePage(callback,pageId){
    var statu = 1;
    var data = {
                    statu:statu
                };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function AJAXRequestHomePage(callback,pageId){
    var statu = 1;
    var data = {
                    statu:statu
                };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function AJAXRequestSavePage(callback,pageId,pData){
    log(pageId,'pageId');
    log(pData,'pData');
    
    localStorage.pageList = JSON.stringify(pageList);
    localStorage.homePageId = homePageId;
    var statu = 1;
    var data = {
                    statu:statu
                };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function AJAXRequestReleasePage(callback,pageId,pData){
    log(pageId,'pageId');
    log(pData,'pData');
    
    localStorage.pageList = JSON.stringify(pageList);
    localStorage.homePageId = homePageId;
    var statu = 1;
    var data = {
                    statu:statu,
                    isRelease:0
                };
    var dataStr = JSON.stringify(data);
    setTimeout(function(){
        eval(callback+'(\''+dataStr+'\')');
    },500);
}
function RestRequestArticleListFake(callback,channelId,startIdx,cnt,customData){	//请求文章列表
	console.log('RestRequestArticleListFake..............');
	var articles = [];
    var dataAll = [];
    if(channelId=='0'){
        dataAll = dataDetail2;
    }else{
        for(var i=0;i<dataDetail2.length;i++){
            var dI = dataDetail2[i];
            if(channelId==dI.cId){
                dataAll.push(dI);
            }
        }
    }
    var data = [];
    for(var i=startIdx;i<startIdx+cnt;i++){
        var dataI = dataAll[i];
        if(dataI){
            data.push(dataI);
        }else{
            break;
        }
    }
	var res = {
        statu:1,
        articles:data,
        customData:customData,
        isFake:1
    };
    setTimeout(function(){
    	callback(res);
    },500);
}
function RestquestFormCommit(callback,commitId,formName,formElements){
    console.log(commitId);
    console.log(formElements);
    var statu = 1;
    var data = {
                    statu:statu
                };
    setTimeout(function(){
        callback(data);
    },500);
}


function AJAXRequestArticle(callback,articleId){
    var data = {
        statu:1,
        title:'文章标题',	//标题
        time:'934850433',	//更新时间
        author:'新闻网',	//来源
        pv:'199',	//阅读数
        content:'<img src="images/imagesrc/26.jpg" alt="" /><p>一分钟一万元！不久前某知名网红创下的新纪录，正在刺激着更多人。而网红经济在直播元年后，开始了更迅速的演进。一个渐次成型的生态系统里，各个环节的套路正在成熟。</p><p>更真诚地赚钱，还是更坦诚的表演？《中国经营报》记者调查发现，直播平台从业者正在进行着商业演进之外的内容深思，逻辑有望更加清晰，但套路难言复制。</p><img src="images/imagesrc/2.jpg" alt="" /><img src="images/imagesrc/7.jpg" alt="" /><img src="images/imagesrc/9.jpg" alt="" /><h3>为什么总是网红？</h3><p>“网红”这个词又火了，直播让其迅速拥有商业价值，并快速兑现。</p><p>“由来已久，只是Papi酱的迅速蹿红和广告拍卖作为标志性事件，把网红经济推到了公众关注的焦点上。”中央财经大学文化与传媒学院陈端说，“网红经济本质是注意力经济。”“在早期图像传播阶段，芙蓉姐姐、凤姐都可以说是当年的网红，到了文字传播时代，博客女王徐静蕾、微博女王姚晨也都是网红，只是当时没有这个概念。”陈端说，“不能说直播是为网红经济而生的，但是直播强化了网红经济。”心理学科普作家唐映红告诉记者，网红和美女主播成为直播平台上的主流是一种必然。“一方面，网络直播由于相当便捷，网红或美女才有可能吸引更多的粉丝，才有足够的性价比。另一方面，内容安全的要求也让经营者心中有数，他们会自觉把握好内容的主体方向，规避风险。在这样的背景下，内容的可选范围较为明确。而对于围观的粉丝来说，那种需要一定理解力和知识背景的内容，也是不具有太大吸引力的。这样，内容就变得更多趋向于简单愉悦。”愈虚拟，愈真实？</p>'	
        //正文（html）
    };
    setTimeout(function(){
        callback(data);
    },500);
}