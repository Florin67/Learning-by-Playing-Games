<?php
    Include('../php/connect.php');
    If(isset($_REQUEST['submit'])!=''){
        If($_REQUEST['email']=='' || $_REQUEST['username']=='' ||  $_REQUEST['password']==''){
            Echo "please fill the empty field.";
        }
        Else{
            $sql="insert into connection(email, username, password) values('.$_REQUEST['email'].', '.$_REQUEST['username'].', '.$_REQUEST['password'].')";
            $res=mysql_query($sql);
            If($res){
                Echo "Record successfully inserted";
            }
            Else{
                Echo "There is some problem in inserting record";
            }

        }
    }

?>