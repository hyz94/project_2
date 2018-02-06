require(['config'],function(){
    require(['jquery'],function($){
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
            console.log(location.search)
            $('.hoverUl').css({
                display:'none'
            })
            if((location.search) != ''){
                var arr_LS = location.search.slice(1).split('=');
                console.log(arr_LS[1]);
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
        //根据数据生成商品导航条
        //商品类型
        $.ajax({
            url:"../api/data/goodsType.json",
            success:function(data){
                var goodsTypeHtml = data.map(function(item){
                    return `<li><i class="fl"></i><span>${item.goodsType}</span></li>`
                });
                $('<ul/>').html(goodsTypeHtml).appendTo('.goodsType')
            }

        })
        //商品品牌
        $.ajax({
            url:"../api/data/goodsBrand.json",
            success:function(data){
                // console.log(data)
                var goodsBrandHtml = data.map(function(item){
                    return `<li><input type="checkbox"/><span>${item.goodsBrand}</span></li>`
                });
                $('<ul/>').html(goodsBrandHtml).appendTo('.goodsBrand')
            }

        })
        $('.spanFr').first().text('-');
        $('.goodsType').css({
            display:'block'
        })
        //点击实现手风琴效果
        $('.nav').on('click','.spanFr',function(){
            $this = $(this);
            $div = $this.closest('div').children('div');
            $div.slideDown();
            $this.removeClass('spanFr').addClass('slideUp');
            $this.text('-');
            $this.css({fontSize:'24px'});  
            if($div.get(0).className == 'goodsType'){
                $div.slideUp();
                $this.removeClass('spanFr').addClass('slideUp');
                $this.text('+');
            }
            
        }).on('click','.slideUp',function(){
            $this = $(this);
            $div = $this.closest('div').children('div');
            $div.slideUp();
            $this.removeClass('slideUp').addClass('spanFr');
            $this.text('+');     
            if($div.get(0).className == 'goodsType'){
                $div.slideDown();
                $this.removeClass('slideUp').addClass('spanFr');
                $this.text('-');
            }  
        });
        //利用ajax生成商品列表
        var number = 1;
        ajaxPost(number);
        //头部切换分页
        $('.navTop').on('click','span',function(){
            console.log(this);
            var number = this.innerText*1;
            console.log(number);
            $('.goodsList').html('');
            ajaxPost(number);
            //点击高亮当前span
            //实现顶部与底部高亮同步
            $('.navTop').find('span').css({
                background:'#fff',
                color:'#555'
            });
            var i = $(this).parent().index() - 1;
            // console.log(i)
            $(this).css({
                background:'#000',
                color:'#fff'
            })
            $('.bottomNav').find('span').css({
                background:'#f5f5f5',
                color:'#555'
            });
            $('.bottomNav').find('span').eq(i).css({
                background:'#000',
                color:'#fff'
            })
        })
        // 尾部切换分页
        $('.bottomNav').on('click','span',function(){
            console.log(this);
            var number = this.innerText*1;
            console.log(number);
            $('.goodsList').html('');
            ajaxPost(number);
            //点击高亮当前span
            //实现顶部底部同步高亮
            var i = $(this).parent().index() - 1;
            $('.bottomNav').find('span').css({
                background:'#f5f5f5',
                color:'#555'
            });
            $(this).css({
                background:'#000',
                color:'#fff'
            });
            $('.navTop').find('span').css({
                background:'#fff',
                color:'#555'
            });
            $('.navTop').find('span').eq(i).css({
                background:'#000',
                color:'#fff'
            })
        })
        function ajaxPost(number){
            $.post('../api/goodslist.php',{pageNo:number,qty:88},function(data){
                console.log(JSON.parse(data))
                var data = JSON.parse(data).data;
                var goodsListHtml = data.map(function(item){
                    return `<li data-id="${item.id}" class="fl">
                    <a href="#"><img src="${item.imgurl}"/></a>
                    <p class="nameP">${item.name}</p>
                    <p>${item.type}</p>
                    <p>￥${item.price}</p>
                    </li>`
                }).join('');
                
                
                $('<ul/>').html(goodsListHtml).appendTo('.goodsList');
                $('<ul/>').addClass('clearfix');
                //点击获取商品的id并传参
                $('.goodsList').on('click','li',function(){
                    console.log(this.dataset.id)
                    $(this).find('a').prop({
                        href:'../html/details.html?'+this.dataset.id
                    })
                })
                
            })
        }
        
        //滚动到一定距离，设置固定定位
        $(window).scroll(function(){
            // console.log('window:',scrollY)
            // console.log($('.nav').offsetParent())
            if(scrollY >= 313 && scrollY <= 8000){
                $('.nav').css({
                    position:'fixed',
                    top:'0px'
                })
            }else if(scrollY <313){
                $('.nav').css({
                    position:'',
                    top:'0px'
                })
            }else{
                $('.nav').css({
                    position:'absolute',
                    top:'7770px'
                })
            }
        })
        //点击返回顶部效果
        $('.toTop').click(function(){
            var timer = setInterval(function(){
                var scrollTop = window.scrollY;
                var speed = Math.floor(scrollTop/10);
                if(scrollTop<=10 || speed === 0){
                    clearInterval(timer);
                }
                window.scrollBy(0,-speed);
            },30);
        })
    })
})