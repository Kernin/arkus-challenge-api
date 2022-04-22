<?php

class AccountDO
{
  private $id;
  private $account_name;
  private $client_name;
  private $manager_name;
  private $manager_email;
  private $team_name;
  private $team_id;

  public function __construct()
  {
  }

  static function constructNewFullAccount($account)
  {
    $instance = new self();

    $instance->id = $account['id'];
    $instance->account_name = $account['name'];
    $instance->client_name = $account['client_name'];
    $instance->manager_name = $account['manager_name'];
    $instance->manager_email = $account['email'];
    $instance->team_name = $account['team_name'];
    $instance->team_id  = $account['team_id'];

    return $instance;
  }

  static function constructNewAccount($account){
    $instance = new self();

    $instance->id = isset($account['id']) ? $account['id'] : null;
    $instance->account_name = $account['name'];
    $instance->client_name = $account['client_name'];

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
