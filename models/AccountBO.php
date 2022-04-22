<?php
  include "AccountDO.php";

  class AccountBO {
    private $conn;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function getAllAccounts(){
      $query = 'SELECT m.id, m.name, m.client_name, m.manager_name, m.email, m.team_name, m.team_id FROM (
        SELECT a.id, u.name as manager_name, ac.email, ac.account_id, a.name, a.client_name, t.name as team_name, t.id as team_id 
        FROM accountmanager as ac, account as a, user as u, team as t 
        WHERE ac.account_id = a.id AND ac.email = u.email AND t.account_id = a.id
      ) as m';
      $statement = $this->conn->prepare($query);
      $statement->execute();
      $statement->setFetchMode(PDO::FETCH_ASSOC);

      return $statement;
    }

    public function getAccount($account_id){
      $query = 'SELECT m.id, m.name, m.client_name, m.manager_name, m.email, m.team_name, m.team_id FROM (
        SELECT a.id, u.name as manager_name, ac.email, ac.account_id, a.name, a.client_name, t.name as team_name, t.id as team_id 
        FROM accountmanager as ac, account as a, user as u, team as t 
        WHERE ac.account_id = :current_account_id AND ac.email = u.email AND t.account_id = :current_account_id
      ) as m';
      $statement = $this->conn->prepare($query);
      $statement->bindParam(':current_account_id', $account_id);
      $statement->execute();
      $row = $statement->fetch(PDO::FETCH_ASSOC);

      $account = AccountDO::constructNewAccount($row);

      return  $account;
    }

  }