testMode = true;
var siteId = '21';

var dataSrcsTypeServer = {
    product:[{id:'1',name:'��ʳ'},{id:'2',name:'����'}],
    article:[{id:'1',name:'����'},{id:'2',name:'�'}]
};
var dataSrcsServer = {
    product:{
        
          '0':[
              {title: '��Ʒ����1',summary: '��Ʒ����1',date: '2016-10-01',price:'100.00',selled:'12'},
              {title: '��Ʒ����2',summary: '��Ʒ����2',date: '2016-10-02',price:'200.00',selled:'2345'},
              {title: '��Ʒ����3',summary: '��Ʒ����3',date: '2016-10-03',price:'300.00',selled:'367'},
              {title: '��Ʒ����4',summary: '��Ʒ����4',date: '2016-10-04',price:'400.00',selled:'4890'},
              {title: '��Ʒ����5',summary: '��Ʒ����5',date: '2016-10-05',price:'500.00',selled:'512'},
              {title: '��Ʒ����6',summary: '��Ʒ����6',date: '2016-10-06',price:'600.00',selled:'612'},
              {title: '��Ʒ����7',summary: '��Ʒ����7',date: '2016-10-07',price:'700.00',selled:'712'},
              {title: '��Ʒ����8',summary: '��Ʒ����8',date: '2016-10-08',price:'800.00',selled:'812'},
              {title: '��Ʒ����9',summary: '��Ʒ����9',date: '2016-10-09',price:'900.00',selled:'912'},
              {title: '��Ʒ����10',summary: '��Ʒ����10',date: '2016-10-10',price:'1000.00',selled:'1012'}
          ],  
        
        
          '1':[
              {title: '��ʳ��Ʒ1',summary: '��ʳ������������������������1',date: '2016-11-01',price:'100.00',selled:'11'},
              {title: '��ʳ��Ʒ2',summary: '��ʳ������������������������2',date: '2016-11-02',price:'200.00',selled:'22'},
              {title: '��ʳ��Ʒ3',summary: '��ʳ������������������������3',date: '2016-11-03',price:'300.00',selled:'33'},
              {title: '��ʳ��Ʒ4',summary: '��ʳ������������������������4',date: '2016-11-04',price:'400.00',selled:'44'},
              {title: '��ʳ��Ʒ5',summary: '��ʳ������������������������5',date: '2016-11-05',price:'500.00',selled:'55'},
              {title: '��ʳ��Ʒ6',summary: '��ʳ������������������������6',date: '2016-11-06',price:'600.00',selled:'66'},
              {title: '��ʳ��Ʒ7',summary: '��ʳ������������������������7',date: '2016-11-07',price:'700.00',selled:'77'},
              {title: '��ʳ��Ʒ8',summary: '��ʳ������������������������8',date: '2016-11-08',price:'800.00',selled:'88'},
              {title: '��ʳ��Ʒ9',summary: '��ʳ������������������������9',date: '2016-11-09',price:'900.00',selled:'99'},
              {title: '��ʳ��Ʒ10',summary: '��ʳ������������������������10',date: '2016-11-10',price:'1000.00',selled:'1010'}
          ], 
       
       
          '2':[
              {title: '������Ʒ1',summary: '����������������������������1',date: '2016-12-01',price:'100.00',selled:'10'},
              {title: '������Ʒ2',summary: '����������������������������2',date: '2016-12-02',price:'200.00',selled:'20'},
              {title: '������Ʒ3',summary: '����������������������������3',date: '2016-12-03',price:'300.00',selled:'30'},
              {title: '������Ʒ4',summary: '����������������������������4',date: '2016-12-04',price:'400.00',selled:'40'},
              {title: '������Ʒ5',summary: '����������������������������5',date: '2016-12-05',price:'500.00',selled:'50'},
              {title: '������Ʒ6',summary: '����������������������������6',date: '2016-12-06',price:'600.00',selled:'60'},
              {title: '������Ʒ7',summary: '����������������������������7',date: '2016-12-07',price:'700.00',selled:'70'},
              {title: '������Ʒ8',summary: '����������������������������8',date: '2016-12-08',price:'800.00',selled:'80'},
              {title: '������Ʒ9',summary: '����������������������������9',date: '2016-12-09',price:'900.00',selled:'90'},
              {title: '������Ʒ10',summary: '����������������������������10',date: '2016-12-10',price:'1000.00',selled:'100'}
          ]  
      
    },
    article:{
       
          '0':[
              {title: '���� 1',summary: '����ժҪ',date: '2015-10-01',visited:'123'},
              {title: '���� 2',summary: '����ժҪ',date: '2015-10-02',visited:'223'},
              {title: '���� 3',summary: '����ժҪ',date: '2015-10-03',visited:'323'},
              {title: '���� 4',summary: '����ժҪ',date: '2015-10-04',visited:'423'},
              {title: '���� 5',summary: '����ժҪ',date: '2015-10-05',visited:'523'},
              {title: '���� 6',summary: '����ժҪ',date: '2015-10-06',visited:'623'},
              {title: '���� 7',summary: '����ժҪ',date: '2015-10-07',visited:'723'},
              {title: '���� 8',summary: '����ժҪ',date: '2015-10-08',visited:'823'},
              {title: '���� 9',summary: '����ժҪ',date: '2015-10-09',visited:'923'},
              {title: '���� 10',summary: '����ժҪ',date: '2015-10-10',visited:'1023'}
          ],  
       
       
          '1':[
              {title: '���ű���1',summary: '����ժҪժҪժҪժҪժҪժҪ1',date: '2015-11-01',visited:'123'},
              {title: '���ű���2',summary: '����ժҪժҪժҪժҪժҪժҪ2',date: '2015-11-02',visited:'123'},
              {title: '���ű���3',summary: '����ժҪժҪժҪժҪժҪժҪ3',date: '2015-11-03',visited:'123'},
              {title: '���ű���4',summary: '����ժҪժҪժҪժҪժҪժҪ4',date: '2015-11-04',visited:'123'},
              {title: '���ű���5',summary: '����ժҪժҪժҪժҪժҪժҪ5',date: '2015-11-05',visited:'123'},
              {title: '���ű���6',summary: '����ժҪժҪժҪժҪժҪժҪ6',date: '2015-11-06',visited:'123'},
              {title: '���ű���7',summary: '����ժҪժҪժҪժҪժҪժҪ7',date: '2015-11-07',visited:'123'},
              {title: '���ű���8',summary: '����ժҪժҪժҪժҪժҪժҪ8',date: '2015-11-08',visited:'123'},
              {title: '���ű���9',summary: '����ժҪժҪժҪժҪժҪժҪ9',date: '2015-11-09',visited:'123'},
              {title: '���ű���10',summary: '����ժҪժҪժҪժҪժҪժҪ10',date: '2015-11-10',visited:'123'}
          ],  
     
       
          '2':[
              {title: '�����1',summary: '�ժҪժҪժҪժҪժҪժҪ1',date: '2015-12-01',visited:'123'},
              {title: '�����2',summary: '�ժҪժҪժҪժҪժҪժҪ2',date: '2015-12-02',visited:'123'},
              {title: '�����3',summary: '�ժҪժҪժҪժҪժҪժҪ3',date: '2015-12-03',visited:'123'},
              {title: '�����4',summary: '�ժҪժҪժҪժҪժҪժҪ4',date: '2015-12-04',visited:'123'},
              {title: '�����5',summary: '�ժҪժҪժҪժҪժҪժҪ5',date: '2015-12-05',visited:'123'},
              {title: '�����6',summary: '�ժҪժҪժҪժҪժҪժҪ6',date: '2015-12-06',visited:'123'},
              {title: '�����7',summary: '�ժҪժҪժҪժҪժҪժҪ7',date: '2015-12-07',visited:'123'},
              {title: '�����8',summary: '�ժҪժҪժҪժҪժҪժҪ8',date: '2015-12-08',visited:'123'},
              {title: '�����9',summary: '�ժҪժҪժҪժҪժҪժҪ9',date: '2015-12-09',visited:'123'},
              {title: '�����10',summary: '�ժҪժҪժҪժҪժҪժҪ10',date: '2015-12-10',visited:'123'}
          ]  
       
    }
};
var imageSrcAll = [
    {id:'1',title:'ͼƬ1',url:'images/imagesrc/1.jpg'},
    {id:'2',title:'ͼƬ2',url:'images/imagesrc/2.jpg'},
    {id:'3',title:'ͼƬ3',url:'images/imagesrc/3.jpg'},
    {id:'4',title:'ͼƬ4',url:'images/imagesrc/4.jpg'},
    {id:'5',title:'ͼƬ5',url:'images/imagesrc/5.jpg'},
    {id:'6',title:'ͼƬ6',url:'images/imagesrc/6.jpg'},
    {id:'7',title:'ͼƬ7',url:'images/imagesrc/7.jpg'},
    {id:'8',title:'ͼƬ8',url:'images/imagesrc/8.jpg'},
    {id:'9',title:'ͼƬ9',url:'images/imagesrc/9.jpg'},
    {id:'10',title:'ͼƬ10',url:'images/imagesrc/10.jpg'},
    {id:'11',title:'ͼƬ11',url:'images/imagesrc/11.jpg'},
    {id:'12',title:'ͼƬ12',url:'images/imagesrc/12.jpg'},
    {id:'13',title:'ͼƬ13',url:'images/imagesrc/13.jpg'},
    {id:'14',title:'ͼƬ14',url:'images/imagesrc/14.jpg'},
    {id:'15',title:'ͼƬ15',url:'images/imagesrc/15.jpg'},
    {id:'16',title:'ͼƬ16',url:'images/imagesrc/16.jpg'},
    {id:'17',title:'ͼƬ17',url:'images/imagesrc/17.jpg'},
    {id:'18',title:'ͼƬ18',url:'images/imagesrc/18.jpg'},
    {id:'19',title:'ͼƬ19',url:'images/imagesrc/19.jpg'},
    {id:'20',title:'ͼƬ20',url:'images/imagesrc/20.jpg'},
    {id:'21',title:'ͼƬ21',url:'images/imagesrc/21.jpg'},
    {id:'22',title:'ͼƬ22',url:'images/imagesrc/22.jpg'},
    {id:'23',title:'ͼƬ23',url:'images/imagesrc/23.jpg'},
    {id:'24',title:'ͼƬ24',url:'images/imagesrc/24.jpg'},
    {id:'25',title:'ͼƬ25',url:'images/imagesrc/25.jpg'},
    {id:'26',title:'ͼƬ26',url:'images/imagesrc/26.jpg'},
    {id:'27',title:'ͼƬ27',url:'images/imagesrc/27.jpg'},
    {id:'28',title:'ͼƬ28',url:'images/imagesrc/28.jpg'},
    {id:'29',title:'ͼƬ29',url:'images/imagesrc/29.jpg'},
    {id:'30',title:'ͼƬ30',url:'images/imagesrc/10.jpg'},
    {id:'31',title:'ͼƬ31',url:'images/imagesrc/31.jpg'},
    {id:'32',title:'ͼƬ32',url:'images/imagesrc/32.jpg'},
    {id:'33',title:'ͼƬ33',url:'images/imagesrc/33.jpg'},
    {id:'34',title:'ͼƬ34',url:'images/imagesrc/34.jpg'},
    {id:'35',title:'ͼƬ35',url:'images/imagesrc/35.jpg'},
    {id:'36',title:'ͼƬ36',url:'images/imagesrc/36.jpg'},
    {id:'37',title:'ͼƬ37',url:'images/imagesrc/37.jpg'},
    {id:'38',title:'ͼƬ38',url:'images/imagesrc/38.jpg'},
    {id:'39',title:'ͼƬ39',url:'images/imagesrc/39.jpg'},
    {id:'40',title:'ͼƬ40',url:'images/imagesrc/40.jpg'},
    {id:'41',title:'ͼƬ41',url:'images/imagesrc/41.jpg'},
    {id:'42',title:'ͼƬ42',url:'images/imagesrc/42.jpg'},
    {id:'43',title:'ͼƬ43',url:'images/imagesrc/43.jpg'},
    {id:'44',title:'ͼƬ44',url:'images/imagesrc/44.png'},
    {id:'45',title:'ͼƬ45',url:'images/imagesrc/45.png'},
    {id:'46',title:'ͼƬ46',url:'images/imagesrc/46.png'},
    {id:'47',title:'ͼƬ47',url:'images/imagesrc/47.png'},
    {id:'48',title:'ͼƬ48',url:'images/imagesrc/48.png'},
    {id:'49',title:'ͼƬ49',url:'images/imagesrc/49.png'},
    {id:'50',title:'ͼƬ50',url:'images/imagesrc/50.png'},
    {id:'51',title:'ͼƬ51',url:'images/imagesrc/51.png'},
    {id:'52',title:'ͼƬ52',url:'images/imagesrc/52.png'},
    {id:'53',title:'ͼƬ53',url:'images/imagesrc/53.png'},
    {id:'54',title:'ͼƬ54',url:'images/imagesrc/54.png'},
    {id:'55',title:'ͼƬ55',url:'images/imagesrc/55.png'},
    {id:'56',title:'ͼƬ56',url:'images/imagesrc/56.jpg'},
    {id:'57',title:'ͼƬ57',url:'images/imagesrc/57.jpg'},
    {id:'58',title:'ͼƬ58',url:'images/imagesrc/58.jpg'},
    {id:'49',title:'ͼƬ59',url:'images/imagesrc/59.jpg'},
    {id:'50',title:'ͼƬ60',url:'images/imagesrc/60.jpg'},
    {id:'51',title:'ͼƬ61',url:'images/imagesrc/61.jpg'},
    {id:'52',title:'ͼƬ62',url:'images/imagesrc/62.jpg'},
    {id:'53',title:'ͼƬ63',url:'images/imagesrc/63.jpg'},
    {id:'54',title:'ͼƬ64',url:'images/imagesrc/64.jpg'},
    {id:'55',title:'ͼƬ65',url:'images/imagesrc/65.jpg'},
    {id:'56',title:'ͼƬ66',url:'images/imagesrc/66.jpg'},
    {id:'57',title:'ͼƬ67',url:'images/imagesrc/67.jpg'},
    {id:'58',title:'ͼƬ68',url:'images/imagesrc/68.jpg'},
    {id:'58',title:'ͼƬ69',url:'images/imagesrc/69.jpg'},
    {id:'58',title:'ͼƬ70',url:'images/imagesrc/70.jpg'},
    {id:'58',title:'ͼƬ71',url:'images/imagesrc/71.png'},
    {id:'58',title:'ͼƬ72',url:'images/imagesrc/72.jpg'}
];
var dataGetcategory2 = [{id:'1',name:'����'},{id:'2',name:'����'}];
var dataDetail2 = [
              {cId:'1',title: '��������1',summary: '����ժҪժҪժҪժҪժҪժҪ1',time: '1472178619000',pv:'11',img:'1_1.jpg',url:'article.html'},
              {cId:'1',title: '��������2',summary: '����ժҪժҪժҪժҪժҪժҪ2',time: '1477096380000',pv:'22',img:'1_2.jpg',url:''},
              {cId:'2',title: '��������1',summary: '����ժҪժҪժҪժҪժҪժҪ1',time: '1476096980000',pv:'10',img:'2_1.jpg',url:'article.html'},
              {cId:'2',title: '��������2',summary: '����ժҪժҪժҪժҪժҪժҪ2',time: '1473509100000',pv:'20',img:'2_2.jpg',url:'article.html'},
              {cId:'1',title: '��������3',summary: '����ժҪժҪժҪժҪժҪժҪ3',time: '1473299100000',pv:'33',img:'1_3.jpg',url:'article.html'},
              {cId:'1',title: '��������4',summary: '����ժҪժҪժҪժҪժҪժҪ4',time: '1475579390000',pv:'44',img:'1_4.jpg',url:'article.html'},
              {cId:'1',title: '��������5',summary: '����ժҪժҪժҪժҪժҪժҪ5',time: '1475579300000',pv:'55',img:'1_5.jpg',url:'article.html'},
              {cId:'1',title: '��������6',summary: '����ժҪժҪժҪժҪժҪժҪ6',time: '1471576380000',pv:'66',img:'1_6.jpg',url:'article.html'},
              {cId:'1',title: '��������7',summary: '����ժҪժҪժҪժҪժҪժҪ7',time: '1470571380000',pv:'77',img:'1_7.jpg',url:'article.html'},
              {cId:'1',title: '��������8',summary: '����ժҪժҪժҪժҪժҪժҪ8',time: '1460571380000',pv:'88',img:'1_8.jpg',url:'article.html'},
              {cId:'2',title: '��������3',summary: '����ժҪժҪժҪժҪժҪժҪ3',time: '1460361300000',pv:'30',img:'2_3.jpg',url:'article.html'},
              {cId:'1',title: '��������9',summary: '����ժҪժҪժҪժҪժҪժҪ9',time: '1459769800000',pv:'99',img:'1_9.jpg',url:'article.html'},
              {cId:'1',title: '��������10',summary: '����ժҪժҪժҪժҪժҪժҪ10',time: '1459769100000',pv:'1010',img:'1_10.jpg',url:'article.html'},
              {cId:'2',title: '��������4',summary: '����ժҪժҪժҪժҪժҪժҪ4',time: '1459760100000',pv:'40',img:'2_4.jpg',url:'http://www.baidu.com'}
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
	pageList.push({id:'1',name:'��ҳ',pUrl:'page1.html'});
	for(var i=0;i<2;i++){
		var pageId = ++pageIdInt+'';
		pageList.push({id:pageId,name:'ҳ��'+pageId,pUrl:'page'+pageId+'.html'});
	}
    var data = {
        statu:1,
        homePageid:'1',
        /*homePage:{
                    header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"16","shape":"bars","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":0,"html":"��ҳ","padding":"14px 0px 0px","id":"17"}]},{"width":"15%"}],"id":"15"}]},
                    leftmenu:{id:'2'},
                    rightmenu:{id:'3'},
                    footer:{id:'4',show:0},
                    children:[]
                },*/
        homePage:{"pageid":"1","id":"0","name":"վ����ҳ","header":{"id":"1","show":1,"children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"56","children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"58","color":"rgb(255, 255, 255)","shape":"bars","padding":"10px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","html":"<span style=\"color:#FFFFFF;\">�����ز�</span>","padding":"14px 0px 0px","id":"59"}]},{"width":"15%"}],"id":"57"}],"height":"44px"}],"freeze":1},"leftmenu":{"id":"2","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"66","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"68","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#595959;\"><span style=\"color:#3F3F3F;\"></span><span style=\"color:#3F3F3F;\">�ʵ۸�</span></span>","id":"70","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"71","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"69","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","borderT":"0px solid rgb(221, 221, 221)","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"72","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\"><span style=\"color:#3F3F3F;\"></span><span style=\"color:#3F3F3F;\">ӥ����</span></span>","id":"74","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"75","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"73","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"76","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\">��ݮ</span>","id":"78","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"79","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"77","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"80","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\">ɳ����</span>","id":"82","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"83","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"81","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"84","borderB":"1px solid rgb(221, 221, 221)","children":[{"type":"grid","containers":[{"width":"89%","children":[{"type":"text","html":"<span style=\"color:#3F3F3F;\">����</span>","id":"86","padding":"2px 0px 0px"}]},{"width":"11%","children":[{"type":"icon","align":"right","id":"87","shap":"arrowright","color":"rgb(30, 180, 130)","shape":"arrowright","size":"21px"}]}],"id":"85","padding":"12px 10px 10px 15px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"8","freeze":1}],"height":"540px"}]},"rightmenu":{"id":"3"},"footer":{"id":"4","show":1,"children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"60","height":"44px","children":[{"type":"grid","containers":[{"width":"25%","children":[{"type":"text","html":"<span style=\"color:#FFFFFF;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">��ҳ</span></span>","align":"center","id":"62","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"1"}]},{"width":"25%","children":[{"type":"text","html":"<span style=\"color:#FFFFFF;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">Ԥ��</span></span>","align":"center","id":"63","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"2"}]},{"width":"25%","children":[{"type":"text","html":"<span style=\"color:#FFFFFF;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">��ѡ</span></span>","align":"center","id":"64","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"4"}]},{"width":"25%","children":[{"type":"text","html":"<span style=\"font-size:14px;color:#FFFFFF;\">����</span>","align":"center","id":"65","padding":"15px 0px","linkType":"none","linkSubtype":"custom","linkSubtype2":"7"}]}],"id":"61"}]}],"freeze":1},"children":[{"type":"slider","containers":[{"children":[{"type":"image","src":"images/imagesrc/32.jpg","align":"center","id":"12","desc":"һ���ʵ۸�","linkType":"page","linkSubtype":"custom","linkSubtype2":"3"}]},{"children":[{"type":"image","src":"images/imagesrc/18.jpg","align":"center","id":"13","desc":"�ؼ�ӥ����","linkType":"page","linkSubtype":"custom","linkSubtype2":"3"}]},{"children":[{"type":"image","src":"images/imagesrc/5.jpg","align":"center","id":"14","desc":"����÷��ɳ����","linkType":"page","linkSubtype":"custom","linkSubtype2":"3"}]}],"id":"11","indicator":"right","autoplay":"3","freeze":1},{"type":"div","borderT":"0px solid rgb(221, 221, 221)","borderB":"0px solid rgb(221, 221, 221)","bgColor":"#fff","children":[{"type":"grid","padding":"15px 5px 10px 5px","containers":[{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(254, 180, 148)","children":[{"type":"icon","shape":"flag","color":"#FFFFFF","size":"40px","padding":"8px 0 0 0","id":"18"}],"id":"17","linkType":"page","linkSubtype":"custom","linkSubtype2":"2","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">Ԥ��</span>","id":"19"}]},{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(121, 168, 255)","children":[{"type":"icon","shape":"star","color":"#FFFFFF","size":"39px","padding":"7px 0px 0px","id":"21"}],"id":"20","linkType":"page","linkSubtype":"custom","linkSubtype2":"4","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">��ѡ</span>","id":"22"}]},{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(251, 159, 223)","children":[{"type":"icon","shape":"person","color":"#FFFFFF","size":"40px","padding":"7px 0px 0px","id":"24"}],"id":"23","linkType":"page","linkSubtype":"custom","linkSubtype2":"5","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">����</span>","id":"25"}]},{"width":"25%","children":[{"type":"div","radius":"55px 55px 55px 55px","width":"55px","height":"55px","bgColor":"rgb(116, 224, 167)","children":[{"type":"icon","shape":"chatbubble","color":"#FFFFFF","size":"39px","padding":"7px 0px 0px","id":"27"}],"id":"26","linkType":"page","linkSubtype":"custom","linkSubtype2":"6","freeze":1},{"type":"text","html":"<span style=\"color:#666666;line-height:1.5;font-size:12px;\">�����ˮ</span>","id":"28"}]}],"id":"16"}],"id":"15","radius":"0px","freeze":1},{"type":"div","bgColor":"#FFFFFF","align":"center","id":"29","children":[{"type":"grid","containers":[{"width":"35%","children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"31","borderB":"0px solid rgb(192, 192, 192)","height":"1px","padding":"7px 0px 0px 10px"}]},{"width":"30%","children":[{"type":"text","html":"<span style=\"color:#51622B;\"><span style=\"color:#00AF50;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">�ر�</span></span><span style=\"color:#00AF50;font-size:14px;\">�Ƽ�</span></span>","align":"center","id":"32"}]},{"width":"35%","children":[{"type":"div","bgColor":"rgb(30, 180, 120)","align":"center","id":"33","borderB":"0px solid rgb(0, 128, 64)","height":"1px","padding":"7px 10px 0px 0px"}]}],"id":"30","padding":"13px 0px 10px"}],"padding":"6px 0px 0px","freeze":1},{"type":"div","bgColor":"rgb(239, 239, 244)","align":"center","id":"34","children":[{"type":"grid","containers":[{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"36","padding":"0px 3px 0px 0px","children":[{"type":"image","src":"images/imagesrc/40.jpg","align":"center","id":"37","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">�ʵ۸�30�����װ</span>","align":"center","id":"38","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]},{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"39","children":[{"type":"image","src":"images/imagesrc/42.jpg","align":"center","id":"40","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">һ��ӥ����</span>","align":"center","id":"41","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","padding":"0px 0px 0px 3px","freeze":1}]}],"id":"35","padding":"6px 0px 0px"},{"type":"grid","containers":[{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"43","padding":"0px 3px 0px 0px","children":[{"type":"image","src":"images/imagesrc/13.jpg","align":"center","id":"44","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;line-height:12px;\">�ش����Ͳ�ݮ</span>","align":"center","id":"45","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]},{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"46","children":[{"type":"image","src":"images/imagesrc/12.jpg","align":"center","id":"47","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">ӥ����20�����װ</span>","align":"center","id":"48","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","padding":"0px 0px 0px 3px"}]}],"id":"42","padding":"6px 0px 0px"},{"type":"grid","containers":[{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"50","padding":"0px 3px 5px 0px","children":[{"type":"image","src":"images/imagesrc/5.jpg","align":"center","id":"51","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;line-height:12px;\">����÷��ɳ����</span>","align":"center","id":"52","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]},{"width":"50%","children":[{"type":"div","bgColor":"#FFFFFF","align":"center","id":"53","padding":"0px 0px 5px 3px","children":[{"type":"image","src":"images/imagesrc/38.jpg","align":"center","id":"54","padding":"5px","height":"87px"},{"type":"text","html":"<span style=\"font-size:12px;color:#262626;\">���Ͳ�ݮ10�����װ</span>","align":"center","id":"55","padding":"0px 0px 5px"}],"linkType":"page","linkSubtype":"custom","linkSubtype2":"3","freeze":1}]}],"id":"49","padding":"6px 0px 0px"}],"freeze":1,"padding":"0px 0px 20px"}],"ishome":1,"iscurrent":1},
        pageList:pageList,
        replaceList : {'1':'51','2':'52','3':'53','4':'54'}
    };
    setTimeout(function(){
        callback(data);
    },500);
}
function AJAXRequestPage(callback,pageId){
    var name = 'ҳ��'+pageId;
    var statu = 1;
    if(pageId=='2'){
        statu = 0;
    }
    var data = {
                    statu:statu,
                    pageId:pageId,
                    page:{
                        header:{"id":"1",show:1,"children":[{"type":"grid","containers":[{"width":"15%","children":[{"type":"icon","align":"center","id":"46","shape":"bars","color":"rgb(0, 128, 255)","padding":"5px 0px 0px","linkType":"menu","linkSubtype":"menu_l"}]},{"width":"70%","children":[{"type":"text","align":"center","ispagename":0,"html":"ҳ��3","padding":"14px 0px 0px","id":"47"}]},{"width":"15%"}],"id":"45"}]},
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
function RestRequestArticleListFake(callback,channelId,startIdx,cnt,customData){	//���������б�
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
        title:'���±���',	//����
        time:'934850433',	//����ʱ��
        author:'������',	//��Դ
        pv:'199',	//�Ķ���
        content:'<img src="images/imagesrc/26.jpg" alt="" /><p>һ����һ��Ԫ������ǰĳ֪�����촴�µ��¼�¼�����ڴ̼��Ÿ����ˡ������쾭����ֱ��Ԫ��󣬿�ʼ�˸�Ѹ�ٵ��ݽ���һ�����γ��͵���̬ϵͳ��������ڵ���·���ڳ��졣</p><p>����ϵ�׬Ǯ�����Ǹ�̹�ϵı��ݣ����й���Ӫ�������ߵ��鷢�֣�ֱ��ƽ̨��ҵ�����ڽ�������ҵ�ݽ�֮���������˼���߼�������������������·���Ը��ơ�</p><img src="images/imagesrc/2.jpg" alt="" /><img src="images/imagesrc/7.jpg" alt="" /><img src="images/imagesrc/9.jpg" alt="" /><h3>Ϊʲô�������죿</h3><p>�����족������ֻ��ˣ�ֱ������Ѹ��ӵ����ҵ��ֵ�������ٶ��֡�</p><p>�������Ѿã�ֻ��Papi����Ѹ�ٴں�͹��������Ϊ��־���¼��������쾭���Ƶ��˹��ڹ�ע�Ľ����ϡ�������ƾ���ѧ�Ļ��봫ýѧԺ�¶�˵�������쾭�ñ�����ע�������á�����������ͼ�񴫲��׶Σ�ܽ�ؽ�㡢��㶼����˵�ǵ�������죬�������ִ���ʱ��������Ů���쾲�١�΢��Ů��Ҧ��Ҳ�������죬ֻ�ǵ�ʱû�����������¶�˵��������˵ֱ����Ϊ���쾭�ö����ģ�����ֱ��ǿ�������쾭�á�������ѧ����������ӳ����߼��ߣ��������Ů������Ϊֱ��ƽ̨�ϵ�������һ�ֱ�Ȼ����һ���棬����ֱ�������൱��ݣ��������Ů���п�����������ķ�˿�������㹻���Լ۱ȡ���һ���棬���ݰ�ȫ��Ҫ��Ҳ�þ�Ӫ���������������ǻ��Ծ����պ����ݵ����巽�򣬹�ܷ��ա��������ı����£����ݵĿ�ѡ��Χ��Ϊ��ȷ��������Χ�۵ķ�˿��˵��������Ҫһ���������֪ʶ���������ݣ�Ҳ�ǲ�����̫���������ġ����������ݾͱ�ø��������ڼ����á��������⣬����ʵ��</p>'	
        //���ģ�html��
    };
    setTimeout(function(){
        callback(data);
    },500);
}