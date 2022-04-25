<?php
include "TeamMemberDO.php";

class TeamBO
{
  private $conn;
  private $table = 'team';

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function createTeam($team)
  {
    $query = 'INSERT INTO ' . $this->table . '
      (email, account_id, init_date, end_date, name)
      VALUES ';

    $total_members = count($team);

    $counter = 0;
    foreach ($team as $member) {
      $email = htmlspecialchars(strip_tags($member->user_email));
      $account_id =  htmlspecialchars(strip_tags($member->account_id));
      $init_date =  htmlspecialchars(strip_tags($member->init_date));
      $end_date =  htmlspecialchars(strip_tags($member->end_date));
      $name =  htmlspecialchars(strip_tags($member->team_name));

      if (++$counter === $total_members) {
        $query .= '("' . $email . '",' . $account_id . ',"' . $init_date . '","' . $end_date . '","' . $name . '")';
      } else {
        $query .= '("' . $email . '",' . $account_id . ',"' . $init_date . '","' . $end_date . '","' . $name . '"),';
      }
    }

    $statement = $this->conn->prepare($query);
    return $statement->execute();
  }
}
