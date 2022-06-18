<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT username,score,played_matches from users order by score desc, played_matches asc limit 100";
$stmt = $db->prepare($query);
$stmt->execute();
$records = array();
while(($row = $stmt->fetch(PDO::FETCH_ASSOC))) {
	$records[] = $row;
}

echo json_encode(
  array(
      "records" => $records
      )
);
?>