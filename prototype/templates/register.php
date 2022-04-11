<?php
	$username = $password = $password2 = "";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$username = test_input($_POST["username"]);
		$password = test_input($_POST["password"]);
		$password2 = test_input($_POST["password2"]);
	}

	function test_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	
	if($password != $password2) {
		echo '<script>alert("Passwords do not match!")</script>';
	}elseif($username != ""){
		$command = "INSERT INTO users (username, password, points) VALUES ('$username', '$password', 0)";
		try{
			if($sql->query($command) == true){
				echo '<script>alert("Account created succesfully!")</script>';
			}else{
				echo '<script>alert("Account could not be created")</script>';
			}
		}catch(exception $e){
			$message = $e->getCode();
			if($message == 1062) {
				echo '<script>alert("Username already taken")</script>';
			}
		}
		
	}
	
	$username = $password = $password2 = "";
?>
<div id="register" style="height: 50%;">
	<form class="flex-container2" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
		<input type="text" name="username" placeholder="Username" required minlength="6" maxlength="30">
		<input type="password" name="password" placeholder="Password" required minlength="7" maxlength="255">
		<input type="password" name="password2" placeholder="Confirm Password" required minlength="7" maxlength="255">
		<input type="submit" name="register" value="Register">
		<p style="margin-top:10px; margin-bottom:-10px;">Got an account?</p>
		<input type="button" value="Login" onclick="toLogin()"> 
	</form>
</div>