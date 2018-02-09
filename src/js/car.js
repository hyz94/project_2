require(['config'],function(){
    require(['jquery','carousel'],function($){
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
            
            // var cookies = document.cookie;
            // cookies = cookies.split('; ');
            // cookies.forEach(function(item){
            //     var arr_cookies = item.split('=');
            //     if(arr_cookies[0] === 'goodslist'){
            //         goodslist = JSON.parse(arr_cookies[1]);
            //     }
            // });
            // var totalQty = 0;
            // for(var i=0;i<goodslist.length;i++){
            //     totalQty +=goodslist[i].qty;
            // }
            // $('.HnavH_ul2_s1').text('购物袋（'+totalQty+'）');
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
        //读取cookie
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
        console.log(goodslist)
        $ul = $('<ul/>');
        var $totalprice = 0;
        var $carAllQty = 0;
        $ulHtml = goodslist.map(function(item){
            $totalprice += item.price*item.qty;
            $carAllQty +=item.qty;
            return `<li class="clearfix" data-id="${item.id}">
                <div class="fl all">
                    <input type="checkbox" checked="true" class="goodsCheckbox"/>
                    <img src="${item.imgurl}" />
                </div>
                <div class="fl goodsInformation">
                    <p class="goodsName">${item.name}</p>
                    <p class="goodsType">${item.type}</p>
                    <p class="goodsCS">颜色：<span>${item.color}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>尺寸：${item.size}</span></p>
                </div>
                <div class="fl goodsPrice">
                    <p>￥ ${item.price}</p>
                </div>
                <div class="fl goodsQty">
                    <p class="clearfix"><button class="fl qtySubtract">-</button><input type="text" value="${item.qty}" class="fl"/><button class="fl qtyAdd">+</button></p>
                </div>
                <div class="fl totalPrice">
                    <p>￥ ${item.qty*item.price}.00</p>
                </div>
                <div class="fl lastDiv">
                    <p>加入收藏</p>
                    <span class="carClose">删除</span>
                </div>
            </li>`
        })
        $ul.html($ulHtml).appendTo('.goods');
        function calQty(){
            console.log($('.HnavH_ul2_s1'))
            return $('.HnavH_ul2_s1').text($carAllQty);
        }
        $('.carQty').text($carAllQty);
        $('.ttPrice').text($totalprice.toFixed(2));
        //点击+、-、删除按钮，改变数据
        var qtySubNumber = 0;
        $('.goods').on('click','.qtySubtract',function(){
            //获取当前li的dataset.id
            var $liId = $(this).closest('li').get(0).dataset.id;
            console.log($liId)
            for(var i=0;i<goodslist.length;i++){
                if(goodslist[i].id == $liId){
                    if(goodslist[i].qty != 1){
                        goodslist[i].qty--
                    }
                }
            }
            location.reload();
            //更新cookie
            document.cookie = 'goodslist='+JSON.stringify(goodslist);

        }).on('click','.qtyAdd',function(){
            //获取当前li的dataset.id
            var $liId = $(this).closest('li').get(0).dataset.id;
            console.log($liId)
            for(var i=0;i<goodslist.length;i++){
                if(goodslist[i].id == $liId){
                    goodslist[i].qty++
                }
            }
            location.reload();
            //更新cookie
            document.cookie = 'goodslist='+JSON.stringify(goodslist);

        }).on('click','.carClose',function(){
            console.log($(this).closest('li').get(0).dataset.id)
            $(this).closest('li').remove();
            var $liId = $(this).closest('li').get(0).dataset.id;
            var clickTotalPrice = 0;
            var clickTotalQty = 0;
            for(var j=0;j<goodslist.length;j++){
                if($liId == goodslist[j].id){
                    
                    goodslist.splice(j, 1);
                    for(var i=0;i<goodslist.length;i++){
                        clickTotalPrice += goodslist[i].price*goodslist[i].qty;
                        clickTotalQty += goodslist[i].qty;
                        console.log(goodslist.length)
                        
                    }
                    $('.carQty').text(clickTotalQty);
                    $('.ttPrice').text(clickTotalPrice.toFixed(2));
                    document.cookie = 'goodslist='+JSON.stringify(goodslist);
                }
            }
        })
        //实现全选功能
        var $goodsCheckbox = $('.goodsCheckbox');
        var $allSel = $('.allSel')
        $allSel.click(function(){
            var $allSelType = $allSel.get(0).checked;
            for(var i=0;i<$goodsCheckbox.length;i++){
                $('.goodsCheckbox').get(i).checked = $allSelType;
            }
            $allSel.get(1).checked = $allSelType;
        })
        $goodsCheckbox.click(function(){
            for(var i=0;i<$goodsCheckbox.length;i++){
                if($goodsCheckbox.get(i).checked == false){
                    console.log(111)
                    $('.allSel').get(0).checked = false;
                    $('.allSel').get(1).checked = false;
                }
                if($goodsCheckbox.get(0).checked == true && $goodsCheckbox.get(1).checked == true && $goodsCheckbox.get(2).checked == true){
                    $('.allSel').get(0).checked = true;
                    $('.allSel').get(1).checked = true;
                }
            }
            //实现总价、数量跟选择框的checked状态一致
            var checkedTotalPrice = 0;
            var checkedTotalQty = 0;
            for(var i=0;i<$goodsCheckbox.length;i++){
                if($goodsCheckbox.get(i).checked == true){
                    // console.log(i)
                    //获取当前行li的dataset.id
                    var $liId = $($goodsCheckbox.get(i)).closest('li').get(0).dataset.id;
                    // console.log($liId) 
                    //计算选中的价格
                    for(var j=0;j<goodslist.length;j++){
                        if($liId == goodslist[j].id){
                            checkedTotalPrice += goodslist[i].price*goodslist[i].qty;
                            checkedTotalQty += goodslist[i].qty;
                        }
                    }
                }
            }
            console.log(checkedTotalPrice,checkedTotalQty)
            $('.carQty').text(checkedTotalQty);
            $('.ttPrice').text(checkedTotalPrice.toFixed(2));
        })
        $('.carQty').css({
            fontSize:'20px',
            color:'green'
        })
        $('.ttPrice').css({
            fontSize:'20px',
            color:'red'
        })



        //猜你喜欢
        $.ajax({
            url:'../api/index.php',
            dataType:'json',
            success:function(data){
                var res = data;
                // console.log(res)
                var resLiHtml = [];
                var resHtml = res.map(function(item){
                    return resLiHtml.push(`<li data-id="${item.id}" class="fl commendLi">
                        <a href="#"><img src="${item.imgurl}"/></a>
                        <p class="nameP">${item.name}</p>
                        <p>${item.type}</p>
                        <p>￥${item.price}</p>
                        <span class="add">添加到购物袋</span>
                        </li>`) ;
                }).join('');
                // console.log(resLiHtml[0])
                $('<ul/>').addClass('clearfix').html(resHtml);
                $('.yourLike').carousel({
                    lis:[resLiHtml[0],resLiHtml[1],resLiHtml[2],resLiHtml[3],resLiHtml[4],resLiHtml[5],resLiHtml[6],resLiHtml[7],resLiHtml[8],resLiHtml[9],resLiHtml[10],resLiHtml[11],resLiHtml[12],resLiHtml[13],resLiHtml[14],resLiHtml[15],resLiHtml[16],resLiHtml[17],resLiHtml[18],resLiHtml[19]],
                    width:'1200',
                    height:'500',
                    page:false,
                    // autoPlay:false,
                    number:4
                }).show();
            }
        })
    })
})