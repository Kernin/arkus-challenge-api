<?php 
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/UserBO.php';

  $database = new Database();
  $db = $database->connect();

  $user_logic= new UserBO($db);

  if(isset($_GET['email'])){
    $user = $user_logic->getUser($_GET['email']);

    $user_arr = array(
      'name' => $user->name,
      'email' => $user->email,
      'password' => $user->password,
      'english_level' => $user->english_level,
      'url_cv' => $user->url_cv,
      'tech_knowledge' => $user->tech_knowledge,
      'role' => $user->role
    );
    print_r(json_encode($user_arr));
  } else {
    die();
  }
  