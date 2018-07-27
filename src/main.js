import css from './css/index.css'
/* import less from './css/indexless.less'
import sass from './css/indexsass.scss' */
window.onload=function(){
    var list=document.getElementById('list');
    var prev=document.getElementById('prev');
    var next=document.getElementById('next');
    var buttons=document.getElementById('buttons').getElementsByTagName('span');
    var index=1;
    function buttonshow(){
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=='on'){
                buttons[i].className='';
            }
        }
        buttons[index-1].className='on';
    }
    function animate(offset){
        var newLeft=parseInt(list.style.left)+offset;
        if(newLeft<-3000){
            list.style.left=-600+'px';
        }else if(newLeft>-600){
            list.style.left=-3000+'px';
        }else{
            list.style.left=newLeft+'px';
        }
    }
    prev.onclick=function(){
        index -=1;
        if(index<1){
            index=5;
        }
        buttonshow();
        animate(600);
    }
    next.onclick=function(){
        index +=1;
        if(index>5){
            index=1;
        }
        buttonshow();
        animate(-600);
    }
    var timer;
    function play(){
        timer=setInterval(function(){
            next.onclick();
        },1500)
    }
    play();
    var container=document.getElementById('container');
    function stop(){
        clearInterval(timer);
    }
    container.onmouseover=stop;
    container.onmouseout=play;
    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick=function(){
            console.log(i);
            var clickindex=parseInt(this.getAttribute('index'));
            var offset=600*(index-clickindex);
            animate(offset);
            index=clickindex;
            buttonshow();
        }
    }
}