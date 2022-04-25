<?php

  class ManagerBO{
    private $conn;
    private $table = 'accountmanager';

    public function __construct($db) {
      $this->conn = $db;
    }

    public function assignManager($manager){
      $query = 'INSERT INTO ' . $this->table . '
      (email, account_id)
      VALUES
      (:email,:account_id)';

      $statement = $this->conn->prepare($query);

      $email =  htmlspecialchars(strip_tags($manager->manager_email));
      $account_id = htmlspecialchars(strip_tags($manager->account_id));

      $statement->bindParam(':email', $email);
      $statement->bindParam(':account_id', $account_id);

      return $statement->execute();
    }

    public function deleteManager($manager){
      $query = 'DELETE FROM '. $this->table . ' WHERE email=:email AND account_id=:account_id';
      $statement = $this->conn->prepare($query);

      $email = htmlspecialchars(strip_tags($manager->manager_email));
      $account_id = htmlspecialchars(strip_tags($manager->account_id));

      $statement->bindParam(':email', $email);
      $statement->bindParam(':account_id', $account_id);

      if($statement->execute()) {
        return true;
      }

      printf("Error: %s.\n", $statement->error);

      return false;
    }
  }
