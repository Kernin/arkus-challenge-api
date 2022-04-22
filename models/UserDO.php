<?php 
  class UserDO {
    private $name;
    private $email;
    private $password;
    private $english_level;
    private $url_cv;
    private $tech_knowledge;
    private $role;
    
    public function __construct()
    {
      
    }
    static function constructNewUser($user_information) {
      $instance = new self();

      $instance->name = $user_information['name'];
      $instance->email = $user_information['email'];
      $instance->password = $user_information['password'];
      $instance->english_level = $user_information['english_level'];
      $instance->url_cv = $user_information['url_cv'];
      $instance->tech_knowledge = $user_information['tech_knowledge'];
      $instance->role  = $user_information['role'];

      return $instance;
    }

    public function __get($property) { 
      if (property_exists($this, $property)) { 
        return $this->$property; 
      } 
    }

    public function __set($property, $value) { 
      if (property_exists($this, $property)) { 
        $this->$property = $value; 
      } 
      return $this; 
    }

  }
