<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/ManagerBO.php';
  include_once '../../models/ManagerDO.php';

  $database = new Database();
  $db = $database->connect();

  $manager_logic = new ManagerBO($db);

  $data = $_GET;
  $manager_data = ManagerDO::constructNewManager($data);

  if($manager_logic->deleteManager( $manager_data)) {
    echo json_encode(
      array('message' => 'Manager Deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'Manager Not Deleted')
    );
  }