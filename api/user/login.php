<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/UserBO.php';

  $database = new Database();
  $db = $database->connect();

  $user_logic= new UserBO($db);

  if(isset($_GET['email']) && isset($_GET['password'])){
    $user = $user_logic->getUser($_GET['email']);

    $credential_validation=validateUserCredentials($user,  $_GET['email'], $_GET['password']);
    createResponse($user,$credential_validation);
  } else {
    die();
  }
  
  function validateUserCredentials($user,$current_email,$current_password) {
    $correct_email = $user->email == $current_email;
    $correct_password = $user->password == $current_password;

    return $correct_email && $correct_password;
  }

  function createResponse($user, $credential_validation){
    if($credential_validation){
      $user_arr = array(
        'name' => $user->name,
        'email' => $user->email,
        'english_level' => $user->english_level,
        'url_cv' => $user->url_cv,
        'tech_knowledge' => $user->tech_knowledge,
        'role' => $user->role
      );
      print_r(json_encode($user_arr));
    } else {
      header("HTTP/1.1 420  Error");

      echo json_encode(
        array('error' => 'Wrong credentials')
      );
    }
  }