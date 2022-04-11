<div class="flex-containerr">
		<?php include('templates/login.php'); ?>
		<?php include('templates/register.php'); ?>
		
		<?php include('templates/leaderboard.php'); ?>
</div>
<script>
	function toRegister() {
		document.getElementById('login').style.display = 'none';
		document.getElementById('register').style.display = 'block';
	}
	function toLogin() {
		document.getElementById('login').style.display = 'block';
		document.getElementById('register').style.display = 'none';
	}
	document.getElementById('register').style.display = 'none';
</script>