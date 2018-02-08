<?php
    // 引入其他文件
    require('connect.php');//include 'connect.php'

    $sql = "select * from mygoods where id between 1 and 20";

    $res = $conn->query($sql);

    $row = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);
    // $arr_row = json_encode($row);
    // var_dump($arr_row);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
  
    

?>