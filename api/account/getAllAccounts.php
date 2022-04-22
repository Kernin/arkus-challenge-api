<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/AccountBO.php';

  $database = new Database();
  $db = $database->connect();

  $account_logic= new AccountBO($db);

  $accounts = $account_logic->getAllAccounts();

  $num = $accounts->rowCount();

  if($num > 0) {

    $accounts_arr = array();

    while($row = $accounts->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $account_item = array(
        'id' => $id,
        'account_name' => $name,
        'client_name' => $client_name,
        'manager_name' => $manager_name,
        'manager_email' => $email,
        'team_name' => $team_name,
        'team_id' => $team_id
      );

      array_push($accounts_arr, $account_item);

    }
    echo json_encode($accounts_arr);

  } else {

    echo json_encode(
      array('message' => 'No Accounts Found')
    );
  }
