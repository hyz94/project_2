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
        //用ajax实现商品详情
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
                //detailsImg的内容
                var $ulHtml=`<li>
                    <img src="${res.imgurl}"/></li>
                    <li><img src="${res.detailsImg1}"/></li>
                    <li><img src="${res.detailsImg2}"/></li>
                    <li><img src="${res.detailsImg3}"/></li>
                    <li><img src="${res.detailsImg4}"/></li>
                    <li><img src="${res.detailsImg5}"/>
                    </li>`;
                var $ul = $('<ul/>').html($ulHtml);   
                $('.detailsImg1').append($ul);
                console.log($('.detailsImg2').find('img').get(0))
                $('.detailsImg2').find('img').get(0).src = res.imgurl;
                $('.detailsImgName').html(res.name);
                $('.detailsImgType').html(res.type);
                $('.detailsImgPrice').html('￥'+res.price);
                $('.detailsImgColor').find('span').html(res.color);
                //高亮商品对应的尺码
                console.log(res.size)
                console.log($('.detailsImgSize').find('span').text())
                $detailsImgSizeSpan = $('.detailsImgSize').find('span');
                for(var $i=0;$i<$detailsImgSizeSpan.length;$i++){
                    if($detailsImgSizeSpan.eq($i).text() == res.size){
                        $detailsImgSizeSpan.eq($i).css({
                            background:'#000',
                            color:'#fff'
                        })
                    }
                }
                //实现点击高亮当前span
                $('.detailsImgSize').on('click','span',function(){
                    console.log($(this).index())
                    $('span').css({
                        background:'#fff',
                        color:'#333'
                    })
                    $(this).css({
                        background:'#000',
                        color:'#fff'
                    })
                })
                //informationGoods商品信息的内容
                $('.articleNumber').text(res.articleNumber);
                $('.serialNumber').text(res.serialNumber);
                $('.goodsPlace').text(res.goodsPlace);
                $('.year').text(res.year);
                $('.suitable').text(res.suitable);
                $('.goodsColor').text(res.color);
                $('.season').text(res.season);
                $('.series').text(res.series);
                $('.texture').text(res.texture);
                $('.description').text(res.description);
                //storyBrand的品牌故事内容
                $('.storyBrand').text(res.story);
                //goodsDetails商品详情的内容
                var $goodsDetailsUl = $('<ul/>').html($ulHtml);
                $('.goodsDetails').append($goodsDetailsUl);
            }
        })
        //用ajax实现相关推荐的商品列表
        //没有数据库暂时借用商品列表页的数据
        $.ajax({
            url:'../api/data/goodslist.json',
            success:function(data){
                console.log(data)
                //相关推荐
                var commendUlHtml = `<li class="fl commendBtn"><i><img src="../img/pre_btn.png"/></i></li>`;
                commendUlHtml += data.map(function(item){
                        return `<li data-id="${item.id}" class="fl commendLi">
                        <a href="#"><img src="${item.imgurl}"/></a>
                        <p class="nameP">${item.name}</p>
                        <p>${item.type}</p>
                        <p>￥${item.price}</p>
                        </li>`
                    }).join('');
                commendUlHtml += `<li class="fr commendBtn"><i><img src="../img/next_btn.png"/></i></li>`
                $('<ul/>').addClass('clearfix').html(commendUlHtml).appendTo('.commendGoods');
                //猜你喜欢
                $('<ul/>').addClass('clearfix').html(commendUlHtml).appendTo('.yourLike');
            }
        })
        
    })
})