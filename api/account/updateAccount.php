<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/AccountBO.php';
  include_once '../../models/AccountDO.php';

  $database = new Database();
  $db = $database->connect();

  $account_logic = new AccountBO($db);

  $data = $_GET;

  $account_data = AccountDO::constructNewAccount($data);

  if($account_logic->updateAccount($account_data)) {
    echo json_encode(
      array('message' => 'Account Updated')
    );
  } else {
    echo json_encode(
      array('message' => 'Account Not Updated')
    );
  }