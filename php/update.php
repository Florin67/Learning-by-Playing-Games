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
include_once 'objects/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$jwt=isset($data->jwt) ? $data->jwt : "";

if($jwt){
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
	$user->score = $data->score;
	$user->id = $decoded->data->id;
	if($user->update()){
		http_response_code(200);
		echo json_encode(
			array(
				"message" => "Score updated"
			)
		);
	}
	else{
		http_response_code(401);
		echo json_encode(array("message" => "Unable to update score"));
	}
} catch (Exception $e){
http_response_code(401);
echo json_encode(array(
       "message" => "Access denied",
       "error" => $e->getMessage()
    ));
}
} else{
    http_response_code(401);
    echo json_encode(array("message" => "Access denied"));
}
?>





