<?php
    require('connect.php');
    // 获取前端数据
    $telOrEmail = isset($_GET['$telOrEmail']) ? $_GET['$telOrEmail'] : null;
    $sql = "select * from user where telOrEmail='$telOrEmail'";
    // 获取查询结果
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo 'success';
    }else{
        echo 'fail';
    }
    $password = isset($_GET['$password']) ?$_GET['$password'] : null;
    // 密码md5加密
    $password = md5($password);
    $sql = "select * from user where password='$password'";
    // 获取查询结果
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        echo 'success';
    }else{
        echo 'fail';
    }
    // 释放查询内存(销毁)
    $result->free();
    //关闭连接
    $conn->close();
?>
