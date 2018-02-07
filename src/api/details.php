<?php
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    // 引入其他文件
    require('connect.php');//include 'connect.php'

    $sql = "select * from mygoods where id = '$id'";

    $res = $conn->query($sql);

    $row = $res->fetch_assoc();
    // var_dump($row);
    // $arr_row = json_encode($row);
    // var_dump($arr_row);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
  
    

?>