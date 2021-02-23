<?php
session_start();

 if (isset($_GET["code"]) && $_GET["code"]==="03678") {

    $_SESSION["connected"]=true;
    echo json_encode(["ok" =>true]);
 }
 else {

     unset($_SESSION["connected"]);
     echo json_encode(["ok" => false]);

 }