<?php

class TeamMemberDO
{
  private $user_email;
  private $account_id;
  private $init_date;
  private $end_date;
  private $team_name;

  public function __construct()
  {
  }

  static function constructNewMember($user){
    $instance = new self();
    $instance->user_email = $user['user_email'];
    $instance->account_id = $user['account_id'];
    $instance->team_name = $user['team_name'];
    $instance->init_date = $user['init_date'];
    $instance->end_date = $user['end_date'];

    return $instance;
  }

  public function __get($property)
  {
    if (property_exists($this, $property)) {
      return $this->$property;
    }
  }

  public function __set($property, $value)
  {
    if (property_exists($this, $property)) {
      $this->$property = $value;
    }
    return $this;
  }

}