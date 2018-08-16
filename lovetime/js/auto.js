
var div123=document.getElementById("div123");//新建并获取需要放进去的div容器，然后更改id名称即可,
var rollImg=document.createElement("div");
rollImg.id="rollImg";
div123.appendChild(rollImg);//将轮播图放进容器里
rollImg.style.position="relative";
rollImg.style.overflow="hidden";
rollImg.style.margin="auto";
var imgCon=document.createElement("div");
rollImg.appendChild(imgCon);
imgCon.style.position="absolute";
imgCon.id="imgCon";
var uls=document.createElement("ul");
rollImg.appendChild(uls);
uls.style.position="absolute";
uls.style.listStyle="none";
uls.style.bottom="10px";
uls.id="uls";
var imgArr=["images/1.jpg","images/2.jpg","images/2.jpg","images/2.jpg"];
var time=200;
var position=0;
var dic="";
var bool=false;
var auto=false;
var preLi;
/*uls=document.getElementById(uls);
rollImg=document.getElementById(rollImg);
imgCon=document.getElementById(imgCon)*/
var left;
left=document.getElementById("left");

var right;
right=document.getElementById("right");

const WIDTH=760;
const HEIGHT=270;
loadImg();
setInterval(animation,16);
function loadImg() {
    left=new Image();
    left.addEventListener("load",loadHandler);
    left.src="images/left.png";
    left.id="left";
    left.style.position="absolute";
    left.style.left="5px";
}
function loadHandler(e) {
    e=e ||window.event;
    this.removeEventListener("load",loadHandler);
    rollImg.appendChild(this);
    if(this===left){
        right=new Image();
        right.addEventListener("load",loadHandler);
        right.src="images/right.png";
        right.id="right";
        right.style.position="absolute";
        right.style.right="5px";
    }else{
        initRollImg();
    }
}
function initRollImg() {
    rollImg.style.width=WIDTH+"px";
    rollImg.style.height=HEIGHT+"px";
    left.style.top=right.style.top=(HEIGHT-left.offsetHeight)/2+"px";
    var img=new Image();
    img.src=imgArr[0];
    img.style.width=WIDTH+"px";
    img.style.height=HEIGHT+"px";
    imgCon.appendChild(img);
    for(var i=0;i<imgArr.length;i++){
        var li=document.createElement("li");
        li.n=i;
        li.style.width="16px";
        li.style.height="16px";
        li.style.borderRadius="8px";
        li.style.border="1px solid #FF0000";
        li.style.backgroundColor="rgba(255,255,255,0.4)";
        li.style.margin="10px";
        li.style.float="left";
        li.addEventListener("click",liClickHandler);
        uls.appendChild(li);
    }
    uls.style.left=(WIDTH-uls.offsetWidth)/2+"px";
    uls.style.position="absolute";
    left.addEventListener("click",leftClickHandler);
    right.addEventListener("click",rightClickHandler);
    rollImg.addEventListener("mouseenter",mouseEnterHandler);
    rollImg.addEventListener("mouseleave",mouseLeaveHandler);
    changeLi();
}
function imgLeftMove() {
    position++;
    if(position>imgArr.length-1){
        position=0;
    }
    dic="left";
    createImg();
    bool=true;
    changeLi();
}
function createImg() {
    imgCon.style.width=WIDTH*2+"px";
    var img=new Image();
    img.src=imgArr[position];
    if(dic==="left"){
        imgCon.appendChild(img);
        imgCon.style.left="0px";
    }else if(dic==="right"){
        imgCon.insertBefore(img,imgCon.firstElementChild);
        imgCon.style.left=-WIDTH+"px";
    }
    img.style.width=WIDTH+"px";
    img.style.height=HEIGHT+"px";
}
function changeLi() {
    if(preLi){
        preLi.style.backgroundColor="rgba(255,255,255,0.4)";
    }
    uls.children[position].style.backgroundColor="rgba(255,0,0,0.4)";
    preLi=uls.children[position];
}
function mouseEnterHandler(e) {
    e=e || window.event;
    auto=false;
}
function mouseLeaveHandler(e) {
    e=e || window.event;
    auto=true;
}
function  leftClickHandler(e) {
    e=e || window.event;
    if(bool) return ;
    position--;
    if(position<0){
        position=imgArr.length-1;
    }
    dic="right";
    createImg();
    bool=true;
    changeLi();
}
function  rightClickHandler(e) {
    e=e || window.event;
    if(bool)  return;
    imgLeftMove();
}
function  liClickHandler(e) {
    e=e|| window.event;
    if(bool) return;
    if(this.n<position){
        dic="right";
    }else if(this.n>position){
        dic="left";
    }else {
        return;
    }
    position=this.n;
    createImg();
    bool=true;
    changeLi();
}
function  animation() {
    if(auto){
        time--;
        if(time<=0){
            imgLeftMove();
            time=200;
        }
    }else{
        time=200;
    }
    if(!bool) return;
    if(dic==="left"){
        imgCon.style.left=imgCon.offsetLeft-20+"px";
        if(imgCon.offsetLeft<=-WIDTH){
            imgCon.removeChild(imgCon.firstElementChild);
            imgCon.style.left="0px";
            bool=false;
        }
    }else if(dic==="right"){
        imgCon.style.left=imgCon.offsetLeft+20+"px";
        if(imgCon.offsetLeft>=0){
            imgCon.removeChild(imgCon.lastElementChild);
            bool=false;
        }
    }

}

