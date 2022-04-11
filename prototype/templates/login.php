<div id="login" style="height: 50%;">
	<form class="flex-container2" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
		<input type="text" name="name" placeholder="Username">
		<input type="password" name="password" placeholder="Password">
		<input type="submit" name="login" value="Login">
		<input type="button" value="Register" onclick="toRegister()"> 
	</form>
</div>