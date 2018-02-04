require(['config'],function(){
    require(['jquery'],function(){
        //生成随机验证码
        
        $('#tel').on('blur',function(){
            $tel = $('#tel').val();
            console.log($tel)
            if(!/^1[34578]\d{9}$/.test($tel)){
                alert('手机号码不合法');
                return false;
            }
        })
        
    })
    
})