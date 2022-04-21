<?php
include "config.php";
include "utils.php";

$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  if (isset($_GET['email'])) {
    //Mostrar un post
    $sql = $dbConn->prepare("SELECT * FROM user where email=:email");
    $sql->bindValue(':email', $_GET['email']);
    $sql->execute();
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetch(PDO::FETCH_ASSOC));
    exit();
  } else {
    //Mostrar lista de post
    $sql = $dbConn->prepare("SELECT * FROM user");
    $sql->execute();
    $sql->setFetchMode(PDO::FETCH_ASSOC);
    header("HTTP/1.1 200 OK");
    echo json_encode($sql->fetchAll());
    exit();
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $input = $_POST;
  $sql = "INSERT INTO user
            (name, email, password, english_level, url_cv, tech_knowledge, role)
            VALUES
            (:name, :email, :password, :english_level, :url_cv, :tech_knowledge, :role)";
  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);
  $executionStatus = $statement->execute();

  if ($executionStatus) {
    header("HTTP/1.1 200 OK");
    echo json_encode($input);
    exit();
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  $email = $_GET['email'];
  $statement = $dbConn->prepare("DELETE FROM user where email=:email");
  $statement->bindValue(':email', $email);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
  $input = $_GET;
  $email = $input['email'];
  $fields = getParams($input);

  $sql = "
          UPDATE user
          SET $fields
          WHERE email='$email'
           ";

  $statement = $dbConn->prepare($sql);
  bindAllValues($statement, $input);

  $statement->execute();
  header("HTTP/1.1 200 OK");
  exit();
}

header("HTTP/1.1 400 Bad Request");
