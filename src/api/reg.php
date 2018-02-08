<?php
    // 引入其他文件
    require('connect.php');//include 'connect.php'

    $telOrEmail = isset($_GET['telOrEmail']) ? $_GET['telOrEmail'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    // echo $telOrEmail;
    // echo $password;
    // 判断用户名是否存在
    $data = $conn->query("select * from user where telOrEmail='$telOrEmail'");

    // var_dump($data); 
    if($data->num_rows == 0 && $telOrEmail !='' && $password != ''){
        // 密码md5加密
        $password = md5($password);
        
        // 写入数据sql语句
        // 将数据存入数据库
        $sql = "insert into user(telOrEmail,password) values('$telOrEmail','$password')";

        $res = $conn->query($sql);

        echo 'success';
    }else{
        echo 'fail';
    }
?>