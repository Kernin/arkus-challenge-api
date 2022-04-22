<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/UserBO.php';

  $database = new Database();
  $db = $database->connect();

  $user_logic= new UserBO($db);

  $users = $user_logic->getAllUsers();

  $num = $users->rowCount();


  if($num > 0) {

    $users_arr = array();

    while($row = $users->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $user_item = array(
        'name' => $name,
        'email' => $email,
        'english_level' => $english_level,
        'url_cv' => $url_cv,
        'tech_knowledge' => $tech_knowledge,
        'role' => $role
      );

      array_push($users_arr, $user_item);

    }
    echo json_encode($users_arr);

  } else {

    echo json_encode(
      array('message' => 'No Users Found')
    );
  }