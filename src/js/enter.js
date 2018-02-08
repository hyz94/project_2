require(['config'],function(){
    require(['jquery'],function($){
        //判断手机号或者邮箱是否存在
        var $tel = $('#tel');
        $tel.blur(function(){
            var $telOrEmail = $tel.val();
            $.ajax({
                url:'../api/shujuku_enter.php?$telOrEmail='+$telOrEmail,
                success:function(data){
                    console.log(data);
                    if(data != 'successfail'){
                        $('.verify').text('会员不存在');
                    }
                }
            })


        })
        //判断密码是否正确
        var $pw = $('#password');
        $pw.blur(function(){
            var $password = $pw.val();
            $.ajax({
                url:'../api/shujuku_enter.php?$password='+$password,
                success:function(data){
                    console.log(data);
                    if(data != 'failsuccess'){
                        $('.verify').text('密码不正确');
                    }else{
                        $('.btn').prop({
                            disabled:false
                        })
                        $('.btn').click(function(){
                            $telOrEmail = $tel.val();
                            window.location.href="../index.html?$telOrEmail="+$telOrEmail;
                        })
                        
                    }
                }
            })
        })
        //自动登录 onclick="javascrtpt:window.location.href='../index.html'"
        $('.btn').click(function(){
            $telOrEmail = $tel.val();
            $password = $pw.val();
            console.log($telOrEmail,$password)
            if($('#checkBox').prop('checked')){
                document.cookie = '$telOrEmail='+$telOrEmail;
                document.cookie = '$password=' + $password;
            }
        })
        //遍历获取
        var cookies = document.cookie;
        cookies = cookies.split('; ');
        cookies.forEach(function(item){
            var arr_cookie = item.split('=');
            console.log(arr_cookie)
            if(arr_cookie[0] === '$telOrEmail'){
                autoEnter(arr_cookie[1]);
            }
        });
        function autoEnter($telOrEmail){
            $tel.val($telOrEmail);
            // $pw.val($password);
            window.location.href="../index.html?$telOrEmail="+$telOrEmail;

        }
    })
})