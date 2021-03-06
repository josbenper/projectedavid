/***
 * raphael.pan-zoom plugin 0.2.1
 * Copyright (c) 2012 @author Juan S. Escobar
 * https://github.com/escobar5
 *
 * licensed under the MIT license
 */
(function(){
    function b(e){var h=e.offsetLeft,f=e.offsetTop,g;

while(e.offsetParent){if(e===document.getElementsByTagName("body")[0]){break}
    else{h=h+e.offsetParent.offsetLeft;
f=f+e.offsetParent.offsetTop;
e=e.offsetParent}}g=[h,f];
return g}

    function a(h,g){var f,j,i;
if(h.pageX||h.pageY){f=h.pageX;
j=h.pageY}else{f=h.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
j=h.clientY+document.body.scrollTop+document.documentElement.scrollTop}i=b(g);
f-=i[0];
j-=i[1];
return{x:f,y:j}}var d={enable:function(){this.enabled=true},disable:function(){this.enabled=false},zoomIn:function(e){this.applyZoom(e)},zoomOut:function(e){this.applyZoom(e>0?e*-1:e)},pan:function(f,e){this.applyPan(f*-1,e*-1)},isDragging:function(){return this.dragTime>this.dragThreshold},getCurrentPosition:function(){return this.currPos},getCurrentZoom:function(){return this.currZoom}},c=function(f,s){var g=f,e=g.canvas.parentNode,p=this,j={},h={x:0,y:0},l=0,k=0,q=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";
this.enabled=false;
this.dragThreshold=5;
this.dragTime=0;
s=s||{};
j.maxZoom=s.maxZoom||9;
j.minZoom=s.minZoom||0;
j.zoomStep=s.zoomStep||0.1;
j.initialZoom=s.initialZoom||0;
j.initialPosition=s.initialPosition||{x:0,y:0};
this.currZoom=j.initialZoom;
this.currPos=j.initialPosition;
function i(){p.currPos.x=p.currPos.x+l;
p.currPos.y=p.currPos.y+k;
var u=g.width*(1-(p.currZoom*j.zoomStep)),t=g.height*(1-(p.currZoom*j.zoomStep));
if(p.currPos.x<0){p.currPos.x=0}else{if(p.currPos.x>(g.width*p.currZoom*j.zoomStep)){p.currPos.x=(g.width*p.currZoom*j.zoomStep)}}if(p.currPos.y<0){p.currPos.y=0}else{if(p.currPos.y>(g.height*p.currZoom*j.zoomStep)){p.currPos.y=(g.height*p.currZoom*j.zoomStep)}}g.setViewBox(p.currPos.x,p.currPos.y,u,t)}function r(x){if(!p.enabled){return false}var v=window.event||x,w=g.width*(1-(p.currZoom*j.zoomStep)),u=g.height*(1-(p.currZoom*j.zoomStep)),t=a(v,e);
l=(w*(t.x-h.x)/g.width)*-1;
k=(u*(t.y-h.y)/g.height)*-1;
h=t;
i();
p.dragTime+=1;
if(v.preventDefault){v.preventDefault()}else{v.returnValue=false}return false}function o(t,u){if(!p.enabled){return false}p.currZoom+=t;
if(p.currZoom<j.minZoom){p.currZoom=j.minZoom}else{if(p.currZoom>j.maxZoom){p.currZoom=j.maxZoom}else{u=u||{x:g.width/2,y:g.height/2};
l=((g.width*j.zoomStep)*(u.x/g.width))*t;
k=(g.height*j.zoomStep)*(u.y/g.height)*t;
i()}}}this.applyZoom=o;
function m(v){if(!p.enabled){return false}var t=window.event||v,w=t.detail||t.wheelDelta*-1,u=a(t,e);
if(w>0){w=-1}else{if(w<0){w=1}}o(w,u);
if(t.preventDefault){t.preventDefault()}else{t.returnValue=false}return false}i();
e.onmousedown=function(u){var t=window.event||u;
if(!p.enabled){return false}p.dragTime=0;
h=a(t,e);
e.className+=" grabbing";
e.onmousemove=r;
document.onmousemove=function(){return false};
if(t.preventDefault){t.preventDefault()}else{t.returnValue=false}return false};
e.onmouseup=function(t){document.onmousemove=null;
e.className=e.className.replace(/(?:^|\s)grabbing(?!\S)/g,"");
e.onmousemove=null};
if(e.attachEvent){e.attachEvent("on"+q,m)}else{if(e.addEventListener){e.addEventListener(q,m,false)}}function n(u,t){l=u;
k=t;
i()}this.applyPan=n};
c.prototype=d;
Raphael.fn.panzoom={};
Raphael.fn.panzoom=function(e){var f=this;
return new c(f,e)}}());
