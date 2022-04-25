<?php

  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/ManagerBO.php';
  include_once '../../models/ManagerDO.php';

  $database = new Database();
  $db = $database->connect();

  $manager_logic = new ManagerBO($db);

  $data = $_POST;

  $manager_data = ManagerDO::constructNewManager($data);

  if ($manager_logic->assignManager($manager_data)) {
    echo json_encode(
      array('message' => 'Manager Assigned')
    );
  } else {
    echo json_encode(
      array('message' => 'Manager Not Assigned')
    );
  }
