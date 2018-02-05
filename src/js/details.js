require(['config'],function(){
    require(['jquery'],function(){
        //引入头部的代码
        $('header').load('../html/header.html',function(){
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
                // console.log(arr_LS[1]);
                //删除跳转到登录注册页的a标签
                $('.enter').closest('a').remove();
                $('<span/>').text(arr_LS[1]+'▲').appendTo($('.HnavH_ul2').children().first());
                $('.reg').closest('a').remove();
                $('.HnavH_ul2').width('250px');
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
        $('footer').load('../html/footer.html');
        //获取传过来的id
        var id = location.search.slice(1);
        console.log(id)
        //用ajax获取商品列表
        $.ajax({
            url:'../api/data/goodslist.json',
            success:function(data){
                var res;
                for(var i=0;i<data.length;i++){
                    if(data[i].id == id){
                        res = data[i];
                             
                    }
                         
                }    
                console.log(res)
                var $ul = $('<ul/>').html(`<li>
                    <img src="${res.imgurl}"/>
                    <img src="${res.detailsImg1}"/>
                    <img src="${res.detailsImg2}"/>
                    <img src="${res.detailsImg3}"/>
                    <img src="${res.detailsImg4}"/>
                    <img src="${res.detailsImg5}"/>
                    </li>`);
                $('.detailsImg1').append($ul);
                console.log($('.detailsImg2').find('img').get(0))
                $('.detailsImg2').find('img').get(0).src = res.imgurl;
                $('.detailsImgName').html(res.name);
                $('.detailsImgType').html(res.type);
                $('.detailsImgPrice').html('￥'+res.price);
                $('.detailsImgColor').find('span').html(res.color);


            }
        })
    })
})