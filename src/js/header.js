

require(['config'],function(){
    require(['jquery'],function($){
        //实现鼠标移入移出，一级导航的显示隐藏，以及箭头的显示隐藏
        var arr = '1,2,#newGoods,#girlGoods,#manGoods,#homeLife,#watch,#brand'.split(',');
        var $jt1=$('.HnavF_jt1');
        var $jt2=$('.HnavF_jt2');
        $('.HnavF').on('mouseenter','li',function(){
            // console.log($(this).index());
            var idx = $(this).index();
            $(arr[idx]).css({display:'block'});
            if(idx == 2){
                $jt1.css({
                    display:'block',
                    left:'350px'
                });
                $jt2.css({
                    display:'block',
                    left:'350px'
                })
            }
            if(idx == 3){
                $jt1.css({
                    display:'block',
                    left:'482px'
                });
                $jt2.css({
                    display:'block',
                    left:'482px'
                })
            }
            if(idx == 4){
                $jt1.css({
                    display:'block',
                    left:'600px'
                });
                $jt2.css({
                    display:'block',
                    left:'600px'
                })
            }
            if(idx == 5){
                $jt1.css({
                    display:'block',
                    left:'732px'
                });
                $jt2.css({
                    display:'block',
                    left:'732px'
                })
            }
            if(idx == 6){
                $jt1.css({
                    display:'block',
                    left:'867px'
                });
                $jt2.css({
                    display:'block',
                    left:'867px'
                })
            }
            if(idx == 7){
                $jt1.css({
                    display:'block',
                    left:'987px'
                });
                $jt2.css({
                    display:'block',
                    left:'987px'
                })
            }
        }).on('mouseleave','li',function(){
            var idx = $(this).index();
            $(arr[idx]).css({display:'none'});
            $jt1.css({
                    display:'none',
            });
            $jt2.css({
                display:'none',
            })
        })
        //实现鼠标移入移出，字体变色
        $('header').on('mouseenter','span',function(){
            $(this).css({color:'red'});
        }).on('mouseleave','span',function(){
            $(this).css({color:'#555454'});
        })

    })
})