require(['config'],function(){
    require(['jquery'],function($){
        //引入头部的代码
        $('header').load('html/header.html',function(){
            //实现鼠标移入移出，一级导航的显示隐藏，以及箭头的显示隐藏
            var arr = '1,2,#newGoods,#girlGoods,#manGoods,#homeLife,#watch,#brand'.split(',');
            var $jt1=$('.HnavF_jt1');
            var $jt2=$('.HnavF_jt2');
            console.log($jt1)
            $('.HnavF').on('mouseenter','.mouseLi',function(){
                // console.log($(this).index());
                // console.log($(this))
                var idx = $(this).index();
                 $(arr[idx]).stop().slideDown(600);

                // $(arr[idx]).css({display:'block'});
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
            }).on('mouseleave','.mouseLi',function(){
                var idx = $(this).index();
                setTimeout(function(){
                    $(arr[idx]).stop().slideUp(600);

                    // $(arr[idx]).css({display:'none'});
                }, 300)
                
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
        });
        //引入底部的代码
        $('footer').load('html/footer.html');
        
        //轮播图
        $img=$('.carousel').find('img');
        $img.slice(1).hide();
        let i=0;
        setInterval(function(){
            i++;
            if(i>3){
                i=0;
            }
            $img.hide();
            $img.eq(i).fadeIn();
            
        }, 3000)
        //用ajax生成选购商品的html结构
        $.ajax({
            url:"../api/data/index.json",
            success:function(data){
                var res = data;
                console.log(res)
                var resHtml = `<li class="fl"><img src="../img/index_hot_zuo.png"/></li>`;
                resHtml += res.map(function(item){
                    return `<li data-id="${item.id}" class="fl goodsLi">
                        <a href="#"><img src="${item.imgurl}" /></a>
                        <p>${item.name}</p>
                        <p>${item.chineseName}</p>
                        <p class="goodsType">${item.type}</p>
                    </li>`;
                }).join('');
                resHtml += `<li class="fr"><img src="../img/index_hot_you.png"/></li>`;
                console.log(resHtml)
                $('<ul/>').addClass('clearfix').html(resHtml).appendTo('.soldGoods');
            }

        })
        
    })
    
})

