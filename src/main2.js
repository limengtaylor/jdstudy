import css from './css/index2.css'
window.addEventListener('load',function(){
    var wrap=document.getElementsByClassName('wrap')[0],
    container=document.getElementsByClassName('container')[0],
    buttons=document.getElementsByClassName('buttons')[0],
    prev=document.getElementsById('arrow-left'),
    next=document.getElementsById('arrow-right'),
    butspan=document.getElementsByClassName('buttons')[0].getElementsByTagName('span');

    var stopFlag=0;
    function startInterval(){
        LM.timer=setTimeout(() => {
            if(!stopFlag){
                LM.changePhoto(-600);
                startInterval();
            }else{
                clearTimeout(LM.timer);
            }
        }, 4500);
    }
    

    function LMSlider(){
        this.timer=0;
        this.index=0;
    }
    LMSlider.prototype.animate=function(Left){
        var curLeft=parseInt(container.style.left)||-600,
        speed=(Left-curLeft)/20,
        delay=20,
        self=this;
        var time=setInterval(function(){
            curLeft +=speed;
            container.style.left=curLeft+'px';
            if(curLeft==Left){
                clearInterval(time);
                if(curLeft<=-3600){
                    container.style.left='-600px';
                }
                if(curLeft>=0){
                    container.style.left='-3000px';
                }
                self.buttonshow();
            }
        },delay);
    }
    LMSlider.prototype.buttonshow=function(){
        for(var i=0;i<butspan.length;i++){
            if(butspan[i].className=='on'){
                butspan[i].className='';
            }
        }
        butspan[this.index].className='on';   
    }
    LMSlider.prototype.changePhoto=function(offset){
        var left=container.style.left,
        newleft=left?parseInt(left)+offset:offset-600;
        this.index=offset>0?this.index-1:this.index+1;
        if(this.index>4){
            this.index=0;
        }
        if(this.index<0){
            this.index=4;
        }
        this.animate(newleft);
    }
    LMSlider.prototype.gotoPhoto=function(conut){
        var newleft=count*-600;
        this.index=count-1;
        this.animate(newleft);
    }
    var LM=new LMSlider();
    prev.addEventListener('click',function(){
        LM.changePhoto(600);
    });
    next.addEventListener('click',function(){
        LM.changePhoto(-600);
    });
    buttons.addEventListener('click',function(event){
        var count=parseInt(event.target.innerText);
        if(count<6){
            LM.gotoPhoto(count);
        }
    });

    startInterval();
});
