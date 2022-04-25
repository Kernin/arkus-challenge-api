<?php

class ManagerDO
{
  private $manager_email;
  private $account_id;

  public function __construct()
  {
  }

  static function constructNewManager($manager){
    $instance = new self();
    $instance->manager_email = $manager['manager_email'];
    $instance->account_id = $manager['account_id'];

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
