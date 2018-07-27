import css from './css/jd2.css';
import reset from './css/reset.css';

window.onload = function(){
    /* 下拉时搜索框背景变化 */
    function BackScroll(){
        var navDom=document.querySelector('.jd-slider');
        var floorDom=document.querySelector('.jd-floor');
        var hh=document.querySelector('.jd-top');
        var topheight=hh.offsetHeight;
        var scrHeight=navDom.offsetHeight-topheight;
        window.onscroll=function(){
            var scrollDistance=0;
            if (document.compatMode == "BackCompat") 
            { 
                 scrollDistance=window.document.body.scrollTop;
            } 
            else 
            { 
                 scrollDistance=document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
            } 
            if(scrollDistance>scrHeight){
                hh.style.background='red';
            }
            else{
                hh.style.background='';
            }
        }
    }
    BackScroll();
    /* 下拉图片懒加载 */
    lazyimg();
    document.addEventListener("scroll",lazyimg);
    var viewHeight =document.documentElement.clientHeight;
    function lazyimg(){
        var lazypic = document.querySelectorAll('img[data-original]');
        Array.prototype.forEach.call(lazypic,function(item,index){
            var rect;
            if(item.dataset.original===""){
                return;
            }
            rect = item.getBoundingClientRect();
            if(rect.bottom>0&&rect.top<viewHeight){
                !function(){
                    item.setAttribute("src", "http://localhost:8888/static/"+item.dataset.original);
                    item.removeAttribute("data-original");
                }();
            }
        });
    }

     /* 图片轮播 */
     var imageCount = 8;
     var slider = document.querySelector('.jd-slider');
     var width = slider.offsetWidth;
     var imageBox = slider.querySelector('.slider');
     var pointBox = slider.querySelector('.slider-index');
     var points = pointBox.querySelectorAll('li');

     var addTransition = function () {
         imageBox.style.transition = "all 300ms ease";
         imageBox.style.webkitTransition = "all 300ms ease";
     }

     var clearTransition = function () {
         imageBox.style.transition = "none";
         imageBox.style.webkitTransition = "none";
     }

     var moveTranslateX = function (X) {
         imageBox.style.transform = "translateX("+X+"px)";
         imageBox.style.webkitTransform = "translateX("+X+"px)";
     }

     var index = 1;
     var timer = setInterval(function(){
         index++;
         addTransition();
         moveTranslateX(-index*width);
     },3000);

     jd.transitionEnd(imageBox,function(){
         if(index > imageCount){
             index = 1;
         }
         if(index <= 0){
             index = imageCount;
         }
         clearTransition();
         moveTranslateX(-index * width);
         movePoint();
     });

     var movePoint = function () {
         for(let i=0;i<points.length;i++){
             points[i].className = " ";
         }
         points[index-1].className = "on";
     }

     var startX = 0;
     var moveX = 0;
     var distanceX = 0;
     var isMove = false;

     imageBox.addEventListener('touchstart',function(event){
         clearInterval(timer);
         startX = event.touches[0].clientX;
     });
     imageBox.addEventListener('touchmove',function(event){
         moveX = event.touches[0].clientX;
         distanceX = moveX - startX;
         clearTransition();
         moveTranslateX(-index * width + distanceX);
         isMove = true;
     });
     imageBox.addEventListener('touchend',function(e){
         if(isMove){
             /* 滑动超过1/3时，图片移动，否则返回 */
             if(Math.abs(distanceX) > width/3){
                if(distanceX > 0){
                    index--;
                }
                if(distanceX < 0){
                    index++;
                }
             }
             addTransition();
             moveTranslateX(-index*width);
             if(index > imageCount ){
                 index = 1;
             }else if(index <= 0){
                 index = imageCount;
             }
             movePoint();   
             startX = 0;
             moveX = 0;
             distanceX = 0;
             isMove = false;
             clearInterval(timer);
             timer= setInterval(function(){
                 index++ ;
                 addTransition();
                 moveTranslateX(-index * width);
             },3000);
         }
     });


     /* 京东快报向上滚动 */
     var newBox=document.querySelector('.news-list ul li');
     var newBoxH = newBox.offsetHeight;
    startmarquee(newBoxH,10,1500);
    function startmarquee(newBoxH,speed,delay) {
        var timer2 = null;
        var _timer2 = null;
        var marqueeBox = document.querySelector('.news-list ul');//滚动元素
        marqueeBox.style.marginTop = 0;

        function start(){
            clearInterval(timer2);
            timer2 = setInterval(scrolling,speed);
            marqueeBox.style.marginTop=parseInt(marqueeBox.style.marginTop) - 1 + "px";
        }
        function scrolling(){
            if(parseInt(marqueeBox.style.marginTop) % newBoxH != 0){  
                marqueeBox.style.marginTop = parseInt(marqueeBox.style.marginTop) - 1 + "px";
                /* 新闻播完时回到顶部 */
                if(Math.abs(parseInt(marqueeBox.style.marginTop)) >= marqueeBox.scrollHeight){
                    marqueeBox.style.marginTop = 0;
                }                
            }else{
                clearInterval(timer2);
                clearTimeout(_timer2);
                _timer2=setTimeout(start,delay);
            }
        }
        clearTimeout(_timer2);
        _timer2=setTimeout(start,delay);
    }
    
    /* 动态设置秒杀中图片大小 */

        var skipeBox = document.querySelectorAll('.spike-container ul .spike-item');
        
        for(let i=0;i<skipeBox.length;i++){
            skipeBox[i].style.width = document.documentElement.clientWidth*0.21505+"px";
            var skipephotoBox=skipeBox[i].querySelector('.spike-photo');
            skipephotoBox.style.height = document.documentElement.clientWidth*0.21505*0.876+'px';
        }



    left_scroll();
    function left_scroll(){
        var spikeContentBox=document.querySelector('.spike-content');
    
        var startX1=0;
        var moveX1=0;
        var distanceX1=0;
        var skipe_transition=function(time){
            spikeContentBox.style.transition='all .'+time+'s';
            spikeContentBox.style.webkitTransition='all .'+time+'s';
        }
        var skipe_transitionnone=function(){
            spikeContentBox.style.transition='none';
            spikeContentBox.style.webkitTransition='none';
        }
        var skipe_translate=function(dist){
            spikeContentBox.style.transform='translateX('+dist+'px)';
            spikeContentBox.style.webkitTransition='translateX('+dist+'px)';
        }

        spikeContentBox.addEventListener('touchstart',function(event){
            startX1=event.touches[0].clientX;
        });
        spikeContentBox.addEventListener('touchmove',function(event){
            moveX1=event.touches[0].clientX-startX1;
            console.log(moveX1);
            skipe_transitionnone();
            skipe_transition(3);
            skipe_translate(moveX1);
        });
        spikeContentBox.addEventListener('touchend',function(event){
            var SingleWidth=document.documentElement.clientWidth*0.21505;
            distanceX1=moveX1/SingleWidth;
            var dis=0;
            if(distanceX1>0){
                dis=Math.ceil(distanceX1);
                skipe_transition(4);
                skipe_translate(0);
            }
            if(distanceX1<0){
                dis=Math.ceil(distanceX1)-1;
                skipe_transition(4);
                skipe_translate(dis*SingleWidth);
            }
        });
    }
 }

