require(['config'],function(){
    require(['jquery','carousel'],function($){
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
                 // console.log(arr)
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
            //自动登录，获取传过来的用户名
            console.log(location.search)
            $('.hoverUl').css({
                display:'none'
            })
            if((location.search) != ''){
                var arr_LS = location.search.slice(1).split('=');
                console.log(arr_LS[1]);
                //删除跳转到登录注册页的a标签
                $('.enter').closest('a').remove();
                $('<span/>').text(arr_LS[1]).appendTo($('.HnavH_ul2').children().first());
                $('.reg').closest('a').remove();
                $('.HnavH_ul2').width('300px');
                //hover上去生成一个ul
                $('.hoverLi').css({
                    position:'relative'
                });
                $('.hoverUl').css({
                    display:'none',
                    position:'absolute',
                    left:'1px',
                    top:'30px',
                    'z-index':'100',
                    background:'#fff',
                    border:'1px solid #ccc'
                });
                $('.hoverUl').find('li').css({
                    padding:'0px 10px',
                    height:'30px'
                });
                $('.hoverLi').mouseenter(function(){
                    $('.hoverUl').show();
                }).mouseleave(function(){
                    $('.hoverUl').hide();
                })
            }
            
        });
        //引入底部的代码
        $('footer').load('html/footer.html');
        
        //轮播图
        // $img=$('.carousel').find('img');
        // $img.slice(1).hide();
        // let i=0;
        // setInterval(function(){
        //     i++;
        //     if(i>3){
        //         i=0;
        //     }
        //     $img.hide();
        //     $img.eq(i).fadeIn();
            
        // }, 3000)
        $('.carousel').carousel({
            width:'1200',
            height:'600',
            imgs:['../img/benner1.jpg','../img/benner2.jpg','../img/benner3.jpg','../img/benner4.jpg']
        }).show()
        //用ajax生成选购商品的html结构
        // $.ajax({
        //     url:"../api/data/index.json",
        //     success:function(data){
        //         var res = data;
        //         console.log(res)
        //         var resHtml = `<li class="fl"><img src="../img/index_hot_zuo.png"/></li>`;
        //         resHtml += res.map(function(item){
        //             return `<li data-id="${item.id}" class="fl goodsLi">
        //                 <a href="#"><img src="${item.imgurl}" /></a>
        //                 <p>${item.name}</p>
        //                 <p>${item.chineseName}</p>
        //                 <p class="goodsType">${item.type}</p>
        //             </li>`;
        //         }).join('');
        //         resHtml += `<li class="fr"><img src="../img/index_hot_you.png"/></li>`;
        //         // console.log(resHtml)
        //         $('<ul/>').addClass('clearfix').html(resHtml).appendTo('.soldGoods');
        //     }

        // })
        $.ajax({
            url:'../api/index.php',
            dataType:'json',
            success:function(data){
                var res = data;
                console.log(res)
                // var resHtml = `<li class="fl"><img src="../img/index_hot_zuo.png"/></li>`;
                var resLiHtml = [];
                var resHtml = res.map(function(item){
                    return resLiHtml.push(`<li data-id="${item.id}" class="fl goodsLi">
                        <a href="#"><img src="${item.imgurl}" /></a>
                        <p>${item.name}</p>
                        <p>${item.type}</p>
                        <p class="goodsType">${item.buyType}</p>
                    </li>`) ;
                }).join('');
                // resHtml += `<li class="fr"><img src="../img/index_hot_you.png"/></li>`;
                // console.log(resHtml)
                console.log(resLiHtml[0])
                $('<ul/>').addClass('clearfix').html(resHtml);
                $('.soldGoods').carousel({
                    lis:[resLiHtml[0],resLiHtml[1],resLiHtml[2],resLiHtml[3],resLiHtml[4],resLiHtml[5],resLiHtml[6],resLiHtml[7],resLiHtml[8],resLiHtml[9],resLiHtml[10],resLiHtml[11],resLiHtml[12],resLiHtml[13],resLiHtml[14],resLiHtml[15],resLiHtml[16],resLiHtml[17],resLiHtml[18],resLiHtml[19]],
                    width:'1200',
                    height:'305',
                    page:false,
                    number:6
                }).show();
            }
        })

    })
    
})

