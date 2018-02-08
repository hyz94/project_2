require(['config'],function(){
    require(['jquery'],function(){
        //判断手机号码，邮箱的格式
        var $verify=$('.verify');
        $('#tel').on('blur',function(){
            var $tel = $('#tel').val();
            console.log($tel)
            if((!/^1[34578]\d{9}$/.test($tel))&&(!/^[a-z0-9_\-\.]{2,}@[a-z\d\-]{1,63}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test($tel))){
                $verify.text('手机号码或者邮箱不合法');
                return false;
            }
            
        })
        

        //生成随机验证码
        var $verifyCode = $('.verifyCode');
        var $createVerify = verifyCode();
        $verifyCode.text($createVerify);
        //判断验证码是否输错
        $('#inputVerify').blur(function(){
            var $inputVerify = $('#inputVerify').val();
            if($inputVerify != $createVerify){
                $verify.text('验证码不正确');
                return false;
            }
        })
        //生成四位随机验证码
        function verifyCode(){
            var str='0123456789abcdefghijklmnopqrstuvwxyz';
            var res = '';
            for(var i=0;i<4;i++){
                var idx = parseInt(Math.random()*str.length);
                res += str.charAt(idx);
            }
            return res;
        }

        //判断两次密码是否输入错误
        $('#cfpw').blur(function(){
            var $password = $('#password').val();
            var $cfpw = $('#cfpw').val();
            if($password != $cfpw){
                $verify.text('两次密码输入不一致');
                return false;
            }
        })
        //将数据传入数据库，判断是否已经存在
        $('.regBtn').click(function(){
            $.ajax({
                url:'../api/reg.php',
                data:{
                    telOrEmail:$('#tel').val(),
                    password:$('#password').val()
                },
                success:function(data){
                    console.log(data);
                    if(data === 'success'){
                        location.href = '../html/enter.html';
                    }else if(data === 'fail'){
                        $verify.text('用户已存在');
                    }
                }
            })
        })
    })
    
})