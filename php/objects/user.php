<?php
class User{
  
    // database connection and table name
    private $conn;
    private $table_name = "users";
  
    // object properties
    public $id;
    public $username;
    public $password;
    public $score;
    public $played_matches;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function create(){
 
    // insert query
    $query = "INSERT INTO " . $this->table_name . " SET username = :username, password = :password";
 
    // prepare the query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->username=htmlspecialchars(strip_tags($this->username));
    $this->password=htmlspecialchars(strip_tags($this->password));
 
    // bind the values
    $stmt->bindParam(':username', $this->username);
 
    // hash the password before saving to database
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);
 
    // execute the query, also check if query was successful
    if($stmt->execute()){
        return true;
    }
 
    return false;
    }
	
public function update(){
 
    // if password needs to be updated
    $password_set=!empty($this->password) ? ", password = :password" : "";
 
    // if no posted password, do not update the password
    $query = "UPDATE " . $this->table_name . "
            SET
                score = score + :score,
				played_matches = played_matches + 1
                {$password_set}
            WHERE id = :id";
 
    // prepare the query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->score=htmlspecialchars(strip_tags($this->score));
 
    // bind the values from the form
    $stmt->bindParam(':score', $this->score);
 
    // hash the password before saving to database
    if(!empty($this->password)){
        $this->password=htmlspecialchars(strip_tags($this->password));
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
    }
 
    // unique ID of record to be edited
    $stmt->bindParam(':id', $this->id);
 
    // execute the query
    if($stmt->execute()){
        return true;
    }
 
    return false;
}

function usernameExists(){
    $query = "SELECT id, password FROM " . $this->table_name . " WHERE username = ? LIMIT 0,1";
            
    $stmt = $this->conn->prepare( $query );
    $this->username=htmlspecialchars(strip_tags($this->username));
    $stmt->bindParam(1, $this->username);
    $stmt->execute();
    $num = $stmt->rowCount();
    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['id'];
        $this->password = $row['password'];
        return true;
    }
    return false;
}
}
?>