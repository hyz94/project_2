<?php
    //获取传过来的手机号或者邮箱
    $telOrEmail = isset($_GET['$telOrEmail']) ? $_GET['$telOrEmail'] : null;
    // echo "$telOrEmail";
    //获取数据库的信息
    $path = 'data/enter.json';
    $file = fopen($path, 'r');
    $len = filesize($path);
    $content = fread($file,$len);
    fclose($file);
    $res = json_decode($content,true);

    // var_dump($res);
    // echo $res[0]['tel'];
    //判断数据库是否有此手机号或者邮箱
    if($res[0]['tel'] == $telOrEmail || $res[0]['email'] == $telOrEmail ){
        echo "yes";

    }else{
        echo "no";
    }
    //获取传过来的密码
    $password = isset($_GET['$password']) ?$_GET['$password'] : null;
    //判断密码是否正确
    if($res[0]['password'] == $password){
        echo "yes";
    }else{
        echo "no";
    }
    
?>
