<?php
// show error reporting
error_reporting(E_ALL);
 
// set your default time-zone
date_default_timezone_set('Asia/Manila');
 
// variables used for jwt
$key = "random123!#";
$issued_at = time();
$expiration_time = $issued_at + (60 * 60); // valid for 1 hour
$issuer = "http://localhost/jwt_test";
?>