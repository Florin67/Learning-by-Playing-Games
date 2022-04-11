<div class="item4" style="flex-grow: 4; height: 700px;">
	<h1 class="title2">Scoreboard</h1>
			
	<?php
		$query = mysqli_query($sql, "SELECT username, points FROM users ORDER BY points DESC");
		while($row = mysqli_fetch_assoc($query)){
			echo '<p>' . $row['username'] . ': ' . $row['points'] . '</p>';
		}
	?>
			
</div>