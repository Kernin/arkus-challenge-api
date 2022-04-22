<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/UserBO.php';
  include_once '../../models/UserDO.php';

  $database = new Database();
  $db = $database->connect();

  $user_logic = new UserBO($db);

  $data = $_POST;

  $user_data = UserDO::constructNewUser($data);

  if($user_logic->createUser($user_data)) {
    echo json_encode(
      array('message' => 'User Created')
    );
  } else {
    echo json_encode(
      array('message' => 'User Not Created')
    );
  }