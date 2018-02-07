require(['config'],function(){
    require(['jquery'],function(){
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
                var $ul = $('<ul/>').html($ulHtml);   
                $('.detailsImg1').append($ul);
                $('.detailsImg2').find('img').get(0).src = res.imgurl;
                $('.detailsImgName').html(res.name);
                $('.detailsImgType').html(res.type);
                $('.detailsImgPrice').html('￥'+res.price);
                $('.detailsImgColor').find('span').html(res.color);
                //实现hover改变图片的显示
                $('.detailsImg1').on('mouseenter','img',function(){
                    console.log(this.src)
                    $('.detailsImg2').find('img').get(0).src = this.src;
                    
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
                    // arr.push(res.id);
                    //之前没有这个商品的情况下
                    // if(qty == QTY){
                    //     $li.html(`
                    //         <img src="${res.imgurl}" class="AGCImg fl"/>
                    //         <p>${res.name}</p>
                    //         <p>${res.type}</p>
                    //         <p><span>${res.price}</span>&times;<span class="goodsQty">1</span></p>
                    //         <span class="closeSpan">&times;</span>
                    //         `);
                        
                    //     $li.appendTo($ul);
                    //     $ul.appendTo($buyFixed);
                    // }
                    




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
                    var $li_html = '';
                    var totalPrice = 0;
                    $li_html = goodslist.map(function(item){
                        totalPrice += item.price*item.qty;
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
                                document.cookie = 'goodslist='+JSON.stringify(goodslist);
                            }
                        }
                        
                    })



                    // 写入cookie
                    document.cookie = 'goodslist='+JSON.stringify(goodslist);

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
                    
                    
                })
            }
        })
        //用ajax实现相关推荐的商品列表
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