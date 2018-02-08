'use strict';
;(function($){
    $.fn.carousel = function(options){
        var defaults = {
            index:0,
            width:400,
            height:260,
            duration:3000,
            autoPlay:true,
            page:true,
            seamless:true,
            type:'horizontal', //fade,vertical
            pn:true,
            number:1 
        }

        return this.each(function(idx,item){
            var opt = $.extend({},defaults,options);
            // opt.len = opt.imgs.length;
            var $this = $(this);
            $this.addClass('box');
            $this.css({
                width:opt.width,
                height:opt.height
            });
            var len;
            var $ul;
            init();
            function init(){
                $ul = $('<ul/>');
                if(opt.imgs){
                    
                    var html = $.map(opt.imgs,function(item){
                        return '<li><img src="'+item+'"/></li>'
                    }).join('\n');
                    $ul.html(html).appendTo($this);
                }
                if(opt.lis){
                    var html = $.map(opt.lis,function(item){
                        return item;

                    })
                    $ul.html(html).appendTo($this);
                    console.log(opt.width*1/opt.number)
                }
                if(opt.lis){
                    opt.width = opt.width*1/opt.number;
                }

                //无缝
                if(opt.seamless){
                    var $li = $('<li/>');
                    $li=$ul.children('li').first().clone();
                    $ul.append($li);
                }
                len = $ul.children('li').length;
                $ul.css('width',len*opt.width);
                //自动轮播
                if(opt.autoPlay){
                    move();
                }
                //点击实现前后跳转
                if(opt.pn){
                    var $prev=$('<div/>');
                    $prev.addClass('zuo');
                    $prev.text('<');
                    $prev.appendTo($this);
                    $this.on('click','.zuo',function(){
                        opt.index --;
                        bian();            
                    });
                    var $next=$('<div/>');
                    $next.addClass('you');
                    $next.text('>');
                    $next.appendTo($this);
                    $this.on('click','.you',function(){
                        opt.index ++;
                        bian();            
                    });
                }
                //显示第几张
                if(opt.page){
                    if(opt.seamless){
                        var $page = $('<div/>');
                        $page.addClass('page');
                        opt.span=[];
                        for(var i=1;i<len;i++){
                            var $span = $('<span/>');
                            $span.text(i);
                            opt.span.push($span);
                            $page.append($span);
                        }
                        $this.append($page);
                        opt.span[0].addClass('activeCarousel');
                        $this.on('click','span',function(){
                            opt.index=this.innerHTML-1;
                            bian();
                        });
                     }else{
                        var $page = $('<div/>');
                        $page.addClass('page');
                        opt.span=[];
                        for(var i=1;i<=len;i++){
                            var $span = $('<span/>');
                            $span.text(i);
                            opt.span.push($span);
                            $page.append($span);
                        }
                        $this.append($page);
                        opt.span[0].addClass('activeCarousel');
                        $this.on('click','span',function(){
                            opt.index=this.innerHTML-1;
                            bian();
                        });
                    }   
                }
                //鼠标移入移出，暂停动画
                $this.mouseenter(function(){
                    if(opt.autoPlay){
                        clearInterval(opt.timer);       
                    }
                    if(opt.pn){
                        $('.zuo').css('display','block');
                        $('.you').css('display','block');
                    } 
                });
                $this.mouseleave(function(){
                    if(opt.autoPlay){
                        clearInterval(opt.timer);
                        opt.timer=setInterval(()=>{
                            show();
                        },opt.duration);
                    }
                    if(opt.pn){
                        $('.zuo').css('display','none');
                        $('.you').css('display','none');
                    } 
                    if(opt.number !=1){
                        $('.zuo').css('display','block');
                        $('.you').css('display','block');
                    }
                });
                if(opt.number !=1){
                    $('.zuo').css('display','block');
                    $('.you').css('display','block');
                }
            }   

            function move(){
                opt.timer = setInterval(()=>{
                    show();
                },opt.duration);         
            }
            function show(){
                opt.index++;
                bian();
            }
            function bian(){
                if(opt.seamless){
                    if(opt.index>len - opt.number){
                        opt.index=1;
                        $ul.css('left',0);
                        
                    }else if(opt.index<0){
                        opt.index = len - opt.number - 1;
                        $ul.css('left',-opt.width*(len-1));   
                    }    
                }else{
                    if(opt.index>len - opt.number){
                        opt.index=0;
                        
                    }else if(opt.index<0){
                        opt.index = len-opt.number-1;     
                    }   
                }
                var target = -opt.width*opt.index;
                $ul.stop().animate({'left':target});
                if(opt.page){
                    $.each(opt.span,function(idx,item){
                        $(item).removeClass('activeCarousel');
                    });
                    if(opt.seamless){
                        if(opt.index<len-1){ 
                            opt.span[opt.index].addClass('activeCarousel');
                        }else{
                            opt.span[0].addClass('activeCarousel');
                        }
                    }else{
                        if(opt.index<len){
                            opt.span[opt.index].addClass('activeCarousel');
                        }else{
                            opt.span[0].addClass('activeCarousel');
                        } 
                    }
                }
            }   
        });
    }
})(jQuery);