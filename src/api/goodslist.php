<?php
    $page_no = isset($_POST['pageNo']) ? $_POST['pageNo'] : 1;
    $qty = isset($_POST['qty']) ? $_POST['qty'] : 88;
    // echo $page_no;
    // echo $qty;
    // 引入其他文件
    require('connect.php');//include 'connect.php'

    $sql = "select * from mygoods";

    $res = $conn->query($sql);

    $row = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);
    // $arr_row = json_encode($row);
    // var_dump($arr_row);
    // echo json_encode($row,JSON_UNESCAPED_UNICODE);
    // 根据分页截取数据
    $res = array(
        'data'=>array_slice($row, ($page_no-1)*$qty,$qty),
        'total'=>count($row),
        'qty'=>$qty,
        'pageNo'=>$page_no*1
    );
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>