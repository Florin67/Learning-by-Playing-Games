<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'config/core.php';
include_once 'libs/php-jwt-main/src/BeforeValidException.php';
include_once 'libs/php-jwt-main/src/ExpiredException.php';
include_once 'libs/php-jwt-main/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-main/src/JWT.php';
include_once 'libs/php-jwt-main/src/Key.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

include_once 'config/database.php';

$data = json_decode(file_get_contents("php://input"));
$jwt=isset($data->jwt) ? $data->jwt : "";

$database = new Database();
$db = $database->getConnection();

if($jwt){
    try {
        $decoded = JWT::decode($jwt, new Key($key ,'HS256'));
	$query = "SELECT score from users where id = :id";
	$stmt = $db->prepare($query);
	$stmt->bindParam(':id', $decoded->data->id);
	$stmt->execute();
	if(($row = $stmt->fetch(PDO::FETCH_ASSOC))) {
		http_response_code(200);
        echo json_encode($row);
	}
        
    } catch (Exception $e){
 
    http_response_code(401);
    echo json_encode(array(
        "message" => "Access denied",
        "error" => $e->getMessage()
    ));
}} else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied"));
}
?>