var Util={loaderInterval:0,secondsToTime:function(secs){if(!isFinite(secs)||secs===null)
return"00:00:00";var seconds=Math.floor(secs);var hours=Math.floor(seconds/3600);seconds-=hours*3600;var minutes=Math.floor(seconds/60);seconds-=minutes*60;if(hours<10){hours="0"+hours;}
if(minutes<10){minutes="0"+minutes;}
if(seconds<10){seconds="0"+seconds;}
return hours+':'+minutes+':'+seconds;},animateSprite:function(elemId){var el=document.getElementById(elemId);el.style.display="block";var width=68;var pos=0;var frames=64;var max=64-(frames*width);this.loaderInterval=setInterval(function(){pos-=width;pos=pos<max?pos=0:pos;el.style.backgroundPosition=pos+'px 0px';},60);},stopSpriteAnimation:function(elemId){clearInterval(this.loaderInterval);document.getElementById(elemId).style.display="block";},showSpriteLoader:function(){if(Model.App.listen){if(settings.device==="samsung_tizen"){$("#loaderShadow").css({"background-color":"rgba(0,0,0,0)"});}
$("#loaderContainer").css({display:'block'});this.animateSprite("loader");Model.App.listen=false;}},hideSpriteLoader:function(){var scope=this;if(!Model.App.listen){if(settings.device==='panasonic'){setTimeout(function(){scope.stopSpriteAnimation("loader");},500);}else{scope.stopSpriteAnimation("loader");}
$('#loaderContainer').hide();Model.App.listen=true;}},openFile:function(path){if(TVA_Storage.openStore(path||config.storageName)){if(Model.App){this.getFile();}else{ModelManager.init();this.getFile();}}},saveFile:function(data,path){config.store=data;var str=JSON.stringify(config.store);try{TVA_Storage.toFile(path||config.storageName,str);}
catch(e){TVA.log(e.message);}
this.getFile();},getFile:function(path){var str=TVA_Storage.fromFile(path||config.storageName);Model.App.file=JSON.parse(str);return Model.App.file;},isotime:function(iso){var arr=Util.isotimedetail(iso);var isoDate=null;if(arr[5]){isoDate=new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]);}else{isoDate=new Date(arr[0],arr[1]-1,arr[2],arr[3],[4],'00');}
return isoDate;},isotimedetail:function(iso){var arr=iso?iso.split(new RegExp("-|T| |:|\\.|\\+|\-")):[];var offSet=new Date().getTimezoneOffset()/60;if(arr.length>5&&arr[5][arr[5].length-1]==='Z'){arr[5]=arr[5].substring(0,arr[5].length-1);}
arr[3]=parseInt(arr[3])-offSet;return arr;},getMonthAbbrev:function(month){month=parseInt(month);switch(month){case 1:return"jan";case 2:return"feb";case 3:return"mar";case 4:return"apr";case 5:return"may";case 6:return"jun";case 7:return"jul";case 8:return"aug";case 9:return"sep";case 10:return"oct";case 11:return"nov";case 12:return"dec";default:return"jan";}},sendGAMessage:function(action,message){TVA_GoogleAnalytics.analyticMark(action,settings.device+'/'+message);},ellipseText:function(text,maxlength){var max;if(!maxlength){max=50;}else{max=maxlength;}
if(text.length>max){text=text.substring(0,(max-3))+'...';}
return text;},timeRemaining:function(expiration){var days=null;var hours=null;var minutes=null;var seconds=null;var currTime=new Date();var currDay=currTime.getDate();var currHour=currTime.getHours();var currMinute=currTime.getMinutes();var currSecond=currTime.getSeconds();var expTime=Util.isotime(expiration);var expDay=expTime.getDate();var expHour=expTime.getHours();var expMinute=expTime.getMinutes();var expSecond=expTime.getSeconds();if(currTime.getMonth()!=expTime.getMonth()){expDay=expDay+Util.daysInMonth(currTime.getMonth()+1,currTime.getFullYear());}
var totalExpSeconds=(expDay*86400)+(expHour*3600)+(expMinute*60)+expSecond;var totalCurrSeconds=(currDay*86400)+(currHour*3600)+(currMinute*60)+currSecond;var totalSeconds=totalExpSeconds-totalCurrSeconds<0?0:totalExpSeconds-totalCurrSeconds;var totalMinutes=totalSeconds/60;var totalHours=totalMinutes/60;var totalDays=totalHours/24;seconds=Math.floor(totalSeconds-(Math.floor(totalMinutes)*60));minutes=Math.floor(totalMinutes-(Math.floor(totalHours)*60));hours=Math.floor(totalHours-(Math.floor(totalDays)*24));days=Math.floor(totalDays);days=days>0?days+' days ':'';hours=hours>0?hours+':':'';minutes=minutes>0?minutes>9?minutes+':':'0'+minutes+':':'00:';seconds=seconds>0?seconds>9?seconds:'0'+seconds:'00';return days+hours+minutes+seconds;},daysInMonth:function(month,year){return new Date(year,month,0).getDate();},getFirstElementWithId:function(target,callback){function getId(target){if(target.id&&target.id!=='trafficMap'){callback(target.id);}else{getId(target.parentNode);}}
getId(target);},mod:function(n,m){return((n%m)+m)%m;},revealEllipsedText:function(element){var element=$(element);if(element.length>0){if(settings.device==='samsung'||settings.device==='samsung_tizen'||settings.device==='webos'||settings.device==='panasonic'||settings.device==='lg'){}else if(this.previousElement){Util.resetEllipsedText(this.previousElement);}
this.previousElement=element;if(settings.device==='samsung'||settings.device==='samsung_tizen'||settings.device==='webos'||settings.device==='panasonic'||settings.device==='lg'){element.css({'transition-duration':'0s','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden',left:0,width:215+'px'});}else{element.css({width:'auto',position:'fixed'});var width=parseInt(element.css('width').replace('px',''));element.css({position:'absolute'});}
if(width>=215){element.css({width:width+5+'px',left:(width-215)+'px'});if(settings.device==='samsung'||settings.device==='samsung_tizen'||settings.device==='webos'||settings.device==='panasonic'||settings.device==='lg'){element.css({'transition-duration':'0s','text-overflow':'ellipsis','white-space':'nowrap','overflow':'hidden',left:0,width:215+'px'});}else{element.css({left:'-'+(width-210)+'px','transition-duration':'5s'});}}else{element.css({width:'100%',left:'0px'});}}},resetEllipsedText:function(element){var el;if(!element){el=null;}else{el=this.previousElement;}
$(el).css({'transition-duration':'0s','transition-delay':'0s'});$(el).css({width:'183px',left:'0px'});},Base64:{_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Util.Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}
t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}
return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}
if(a!=64){t=t+String.fromCharCode(i)}}
t=Util.Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}
return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}
return t}},_generateRandomInt:function(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min))+min;}};