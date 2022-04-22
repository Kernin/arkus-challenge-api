<?php 
  include "UserDO.php";

  class UserBO {
    private $conn;
    private $table = 'user';

    public function __construct($db) {
      $this->conn = $db;
    }

    public function getAllUsers() {

      $query = 'SELECT * FROM '. $this->table;   
      $statement = $this->conn->prepare($query);
      $statement->execute();
      $statement->setFetchMode(PDO::FETCH_ASSOC);

      return $statement;
    }

    public function getUser($email) {
      
      $query = 'SELECT * FROM '. $this->table .' WHERE email = :email';
      $statement = $this->conn->prepare($query);
      $statement->bindParam(':email', $email);
      $statement->execute();
      $row = $statement->fetch(PDO::FETCH_ASSOC);

      $user = UserDO::constructNewUser($row);
  
      return $user;
    }

    public function createUser($user) {
      $query =  'INSERT INTO ' . $this->table . '
      (name, email, password, english_level, url_cv, tech_knowledge, role)
      VALUES
      (:name, :email, :password, :english_level, :url_cv, :tech_knowledge, :role)';
      
      $statement = $this->conn->prepare($query);

      $name =  htmlspecialchars(strip_tags($user->name));
      $email = htmlspecialchars(strip_tags($user->email));
      $password = htmlspecialchars(strip_tags($user->password));
      $english_level = htmlspecialchars(strip_tags($user->english_level));
      $url_cv = htmlspecialchars(strip_tags($user->url_cv));
      $tech_knowledge = htmlspecialchars(strip_tags($user->tech_knowledge));
      $role = htmlspecialchars(strip_tags($user->role));
      
      $statement->bindParam(':name', $name);
      $statement->bindParam(':email', $email);
      $statement->bindParam(':password', $password);
      $statement->bindParam(':english_level', $english_level);
      $statement->bindParam(':url_cv', $url_cv);
      $statement->bindParam(':tech_knowledge', $tech_knowledge);
      $statement->bindParam(':role', $role);

      return $statement->execute();
    }

    public function updateUser($user) {
      $query =  'UPDATE ' . $this->table . 
      ' SET name = :name, 
      email = :email, 
      password = :password, 
      english_level = :english_level, 
      url_cv = :url_cv, 
      tech_knowledge = :tech_knowledge, 
      role = :role 
      WHERE email = :email';
      
      $statement = $this->conn->prepare($query);

      $name =  htmlspecialchars(strip_tags($user->name));
      $email = htmlspecialchars(strip_tags($user->email));
      $password = htmlspecialchars(strip_tags($user->password));
      $english_level = htmlspecialchars(strip_tags($user->english_level));
      $url_cv = htmlspecialchars(strip_tags($user->url_cv));
      $tech_knowledge = htmlspecialchars(strip_tags($user->tech_knowledge));
      $role = htmlspecialchars(strip_tags($user->role));
      
      $statement->bindParam(':name', $name);
      $statement->bindParam(':email', $email);
      $statement->bindParam(':password', $password);
      $statement->bindParam(':english_level', $english_level);
      $statement->bindParam(':url_cv', $url_cv);
      $statement->bindParam(':tech_knowledge', $tech_knowledge);
      $statement->bindParam(':role', $role);

      if($statement->execute()) {
        return true;
      }

      printf("Error: %s.\n", $statement->error);

      return false;
    }

    public function deleteUser($email){
      $query = 'DELETE FROM user where email=:email';
      $statement = $this->conn->prepare($query);

      $email = htmlspecialchars(strip_tags($email));

      $statement->bindParam(':email', $email);

      if($statement->execute()) {
        return true;
      }

      printf("Error: %s.\n", $statement->error);

      return false;
    }

  }
