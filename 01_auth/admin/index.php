<?php
session_start();

if (isset($_SESSION["connected"])) {

    echo "<p>Bienvenue....</p>";

}
else {

    echo "<p>Que fais tu ici ?</p>";
    
}