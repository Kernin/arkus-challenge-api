<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/AccountBO.php';

  $database = new Database();
  $db = $database->connect();

  $account_logic= new AccountBO($db);

  if(isset($_GET['account_id'])){
    $account = $account_logic->getAccount($_GET['account_id']);

    $account_arr = array(
      'id' => $account->id,
      'account_name' => $account->account_name,
      'client_name' => $account->client_name,
      'manager_name' => $account->manager_name,
      'manager_email' => $account->manager_email,
      'team_name' => $account->team_name,
      'team_id' => $account->team_id
    );
    print_r(json_encode($account_arr));
  } else {
    die();
  }
  