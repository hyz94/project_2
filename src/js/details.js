require(['config'],function(){
    require(['jquery','zoom','carousel'],function($){
        //引入头部的代码
        $('header').load('../html/header.html',function(){
            //实现鼠标移入移出，一级导航的显示隐藏，以及箭头的显示隐藏
            var arr = '1,2,#newGoods,#girlGoods,#manGoods,#homeLife,#watch,#brand'.split(',');
            var $jt1=$('.HnavF_jt1');
            var $jt2=$('.HnavF_jt2');
            // console.log($jt1)
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
            // console.log(location.search)
            $('.hoverUl').css({
                display:'none'
            })
            

            // if((location.search) != ''){
            //     var arr_LS = location.search.slice(1).split('=');
            //     // console.log(arr_LS[1]);
            //     //删除跳转到登录注册页的a标签
            //     $('.enter').closest('a').remove();
            //     $('<span/>').text(arr_LS[1]+'▲').appendTo($('.HnavH_ul2').children().first());
            //     $('.reg').closest('a').remove();
            //     $('.HnavH_ul2').width('250px');
            //     //hover上去生成一个ul
            //     $('.hoverLi').css({
            //         position:'relative'
            //     });
            //     $('.hoverUl').css({
            //         display:'none',
            //         position:'absolute',
            //         left:'1px',
            //         top:'30px',
            //         'z-index':'100',
            //         background:'#fff',
            //         border:'1px solid #ccc'
            //     });
            //     $('.hoverUl').find('li').css({
            //         padding:'0px 10px',
            //         height:'30px'
            //     });
            //     $('.hoverLi').mouseenter(function(){
            //         $('.hoverUl').show();
            //     }).mouseleave(function(){
            //         $('.hoverUl').hide();
            //     })
            // }
            // console.log(111)
        });
        //引入底部的代码
        $('footer').load('../html/footer.html');
        //获取传过来的id
        var id = location.search.slice(1);
        console.log(id)
        //用ajax实现商品详情
        //获取数据库的内容
        $.ajax({
            url:'../api/details.php?'+id,
            dataType:'json',
            success:function(data){
                console.log(data)
                var res = data;
                var $ulHtml=`<li>
                    <img src="${res.imgurl}"/></li>
                    <li><img src="${res.detailsImg1}"/></li>
                    <li><img src="${res.detailsImg2}"/></li>
                    <li><img src="${res.detailsImg3}"/></li>
                    <li><img src="${res.detailsImg4}"/></li>
                    <li><img src="${res.detailsImg5}"/>
                    </li>`;
                var $ul_detailsImg1 = $('<ul/>').html($ulHtml); 
                var $ul = $('<ul/>').html($ulHtml);    
                $('.detailsImg1').append($ul_detailsImg1);
                //默认高亮第一张
                $('.detailsImg1').find('img').first().css({
                    border:'1px solid #f90'
                })
                $('.detailsImg2').find('img').get(0).src = res.imgurl;
                $('.detailsImgName').html(res.name);
                $('.detailsImgType').html(res.type);
                $('.detailsImgPrice').html('￥'+res.price);
                $('.detailsImgColor').find('span').html(res.color);
                //实现hover改变图片的显示
                $('.detailsImg1').on('mouseenter','img',function(){
                    console.log(this.src)
                    $('.detailsImg2').find('img').get(0).src = this.src;
                    //高亮当前
                    $('.detailsImg1').find('img').css({
                        border:'1px solid #ccc'
                    })
                    $(this).css({
                        border:'1px solid #f90'
                    });
                    
                    
                })
                //高亮商品对应的尺码
                console.log(res.size)
                console.log($('.detailsImgSize').find('span').text())
                $detailsImgSizeSpan = $('.detailsImgSize').find('span');
                console.log($detailsImgSizeSpan.eq(1).text())
                for(var $i=0;$i<$detailsImgSizeSpan.length;$i++){
                    // console.log($i)
                    if($detailsImgSizeSpan.eq($i).text() == res.size){
                        // console.log($i)
                        $detailsImgSizeSpan.eq($i).css({
                            background:'#000',
                            color:'#fff'
                        })
                    }
                }
                //实现点击高亮当前span
                var size_cookie = '';
                $('.detailsImgSize').on('click','span',function(){
                    console.log($(this).index())
                    $('.detailsImgSize span').css({
                        background:'#fff',
                        color:'#333'
                    });
                    $(this).css({
                        background:'#000',
                        color:'#fff'
                    });
                    size_cookie = '';
                    size_cookie = $(this).text();
                    console.log(size_cookie);
                })
                // console.log($('.detailsImg2').find('img').get(0))
                //informationGoods商品信息的内容
                $('.articleNumber').text(res.articleNumber);
                $('.serialNumber').text(res.serialNumber);
                $('.goodsPlace').text(res.goodsPlace);
                $('.year').text(res.year);
                $('.suitable').text(res.suitable);
                $('.season').text(res.season);
                $('.goodsColor').text(res.color);
                $('.series').text(res.series);
                $('.texture').text(res.texture);
                $('.description').text(res.description);
                //storyBrand的品牌故事内容
                $('.storyBrand').text(res.story);
                //goodsDetails商品详情的内容
                var $goodsDetailsUl = $('<ul/>').html($ulHtml);
                $('.goodsDetails').append($goodsDetailsUl);
                //点击加入购物袋添加到购物车初始化
                //hover上去，显示固定定位
                $buyFixed = $('.buyFixed');
                $BF_jt1 = $('.BF_jt1');
                $BF_jt2 = $('.BF_jt2');
                $('.hoverBuyLi').mouseenter(function(){
                    $buyFixed.css({
                        display:'block'
                    });
                    $BF_jt1.css({
                        display:'block'
                    });
                    $BF_jt2.css({
                        display:'block'
                    })
                }).mouseleave(function(){
                    $buyFixed.css({
                        display:'none'
                    });
                    $BF_jt1.css({
                        display:'none'
                    });
                    $BF_jt2.css({
                        display:'none'
                    })
                })
                $p = $('<p/>');  
                $p.addClass('myGoodsP').html('我的商品');
                $p.appendTo($buyFixed); 
                var $checkP = $('<p/>');
                var arr = [];
                var qty = 1;
                //点击加入购物车
                //获取cookie
                var goodslist = [];
                var goodscar = {};
                var cookies = document.cookie;
                cookies = cookies.split('; ');
                cookies.forEach(function(item){
                    var arr_cookies = item.split('=');
                    if(arr_cookies[0] === 'goodslist'){
                        goodslist = JSON.parse(arr_cookies[1]);
                    }
                });
                //根据cookie实现ul的结构
                cookieUl();
                //点击购物袋出现
                $('.addGoodsCar').click(function(){
                    var QTY = qty;
                    $('.emptyP').remove();
                    $p.css({
                        display:'block'
                    });
                    $ul = $('<ul/>');
                    $li = $(`<li data-id=${res.id}/>`);
                    $buyFixed = $('.buyFixed');
                    $buyFixed.css({
                        display:'block'
                    });
                    $BF_jt1.css({
                        display:'block'
                    });
                    $BF_jt2.css({
                        display:'block'
                    })
                    //判断之前是否有这个商品
                    for(var i=0;i<arr.length;i++){
                        if(res.id == arr[i]){
                            qty++;
                            $('.goodsQty').text(qty);
                            
                            break;
                        }
                    }
                    // 判断当前商品是否已经存在cookie当中
                    //在的情况
                    for(var i=0;i<goodslist.length;i++){
                        if(goodslist[i].id === res.id){
                            goodslist[i].qty++;
                            break;
                        }
                    }                    
                    // 不在的情况
                    if(i===goodslist.length){
                        // 通过按钮获取商品信息
                        var goodscar = {
                            id:res.id,
                            imgurl:res.imgurl,
                            name:res.name,
                            price:res.price,
                            size:res.size,
                            type:res.type,
                            color:res.color,
                            qty:qty
                        }
                        // 添加到数组
                        goodslist.push(goodscar);
                    }
                    //根据cookie重写ul
                    cookieUl();
                    // 写入cookie
                    document.cookie = 'goodslist='+JSON.stringify(goodslist);
                    //实现商品飞入购物车效果
                    var $cloneImg = $('.detailsImg2').find('img');
                    var $goodsFlyImg = $cloneImg.clone();
                    $goodsFlyImg.css({
                        position:'absolute',
                        left:$cloneImg.offset().left,
                        top:$cloneImg.offset().top,
                        width:$cloneImg.outerWidth()
                    });

                    // 把图片写入页面
                    $('body').append($goodsFlyImg);


                    //动画
                    var $buyFixedCar = $('.buyFixed').find('ul');
                    $goodsFlyImg.animate({
                        left:$buyFixedCar.offset().left,
                        top:$buyFixedCar.offset().top + $buyFixedCar.height(),
                        width:30
                    },function(){
                        $goodsFlyImg.remove();
                    })



                })
                function cookieUl(){
                    if(goodslist.length != 0){
                        $('.emptyP').remove();
                    }
                    var $li_html = '';
                    var totalPrice = 0;
                    var totalQty = 0;
                    $li_html = goodslist.map(function(item){
                        totalPrice += item.price*item.qty;
                        totalQty += item.qty;
                        return `<li data-id="${item.id}">
                            <img src="${item.imgurl}" class="AGCImg fl"/>
                            <p>${item.name}</p>
                            <p>${item.type}</p>
                            <p><span>${item.price}</span>&times;<span class="goodsQty">${item.qty}</span></p>
                            <span class="closeSpan">&times;</span>
                        </li>`
                    })
                    console.log(totalPrice);
                    $buyFixed.find('ul').remove();
                    $ul.html($li_html);
                    $ul.appendTo($buyFixed);
                    //实现购物袋的数量与cookie同步
                    $('.HnavH_ul2_s1').text('购物袋（'+totalQty+'）');
                    //点击删除当前商品
                    $('.buyFixed').on('click','.closeSpan',function(){
                        $(this).closest('li').remove();
                        console.log($(this).closest('li').get(0).dataset.id);
                        //清除goodslist里储存的商品
                        for(var i=0;i<goodslist.length;i++){
                            if(goodslist[i].id == $(this).closest('li').get(0).dataset.id){
                                console.log(i)
                                goodslist.splice(i, 1);
                                console.log(goodslist);
                                totalPrice = 0;
                                totalQty = 0; 
                                for(var j=0;j<goodslist.length;j++){
                                    totalQty += goodslist[i].qty;
                                    totalPrice += goodslist[i].price*goodslist[i].qty;
                                }
                                //实现购物袋的数量/价格与cookie同步
                                $('.HnavH_ul2_s1').text('购物袋（'+totalQty+'）');
                                $('.TotalPrice').text(totalPrice);
                                document.cookie = 'goodslist='+JSON.stringify(goodslist);
                            }
                        }
                        
                    })
                    //移出之前添加的结算内容
                    $checkP.remove();
                    //创建结算内容
                    $checkP = $('<p/>');
                    $checkP.addClass('checkGoods').html(`商品合计： ￥<span class="TotalPrice"></span><a href="../html/car.html">去结算</a>`);
                    console.log($('.TotalPrice').text(111))
                    $checkP.appendTo($buyFixed);
                    $('.TotalPrice').text(totalPrice);
                    $checkP.css({
                        display:'block'
                    })

                }
          }
        });
        //用数据库实现商品
        $.ajax({
            url:'../api/index.php',
            dataType:'json',
            success:function(data){
                var res = data;
                console.log(res)
                var resLiHtml = [];
                var resHtml = res.map(function(item){
                    return resLiHtml.push(`<li data-id="${item.id}" class="fl commendLi">
                        <a href="#"><img src="${item.imgurl}"/></a>
                        <p class="nameP">${item.name}</p>
                        <p>${item.type}</p>
                        <p>￥${item.price}</p>
                        </li>`) ;
                }).join('');
                console.log(resLiHtml[0])
                $('<ul/>').addClass('clearfix').html(resHtml);
                $('.commendGoods').carousel({
                    lis:[resLiHtml[0],resLiHtml[1],resLiHtml[2],resLiHtml[3],resLiHtml[4],resLiHtml[5],resLiHtml[6],resLiHtml[7],resLiHtml[8],resLiHtml[9],resLiHtml[10],resLiHtml[11],resLiHtml[12],resLiHtml[13],resLiHtml[14],resLiHtml[15],resLiHtml[16],resLiHtml[17],resLiHtml[18],resLiHtml[19]],
                    width:'1160',
                    height:'330',
                    page:false,
                    // autoPlay:false,
                    number:4
                }).show();
                $('.yourLike').carousel({
                    lis:[resLiHtml[0],resLiHtml[1],resLiHtml[2],resLiHtml[3],resLiHtml[4],resLiHtml[5],resLiHtml[6],resLiHtml[7],resLiHtml[8],resLiHtml[9],resLiHtml[10],resLiHtml[11],resLiHtml[12],resLiHtml[13],resLiHtml[14],resLiHtml[15],resLiHtml[16],resLiHtml[17],resLiHtml[18],resLiHtml[19]],
                    width:'1200',
                    height:'420',
                    page:false,
                    // autoPlay:false,
                    number:4
                }).show();
            }
        })
        //实现放大镜功能
        $('.detailsImg2').gdsZoom();
    })
})