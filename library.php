<?php
    require_once "vendor/autoload.php";
    $db = (new MongoDB\Client)->lb6_var0;
    
    $query = array();

    if (array_key_exists("publisher", $_GET)) {
        $query = ["publisher" => $_GET['publisher']];
    } else if (array_key_exists("from", $_GET)
              && array_key_exists("to", $_GET)) {
        $query = [];
    } else if (array_key_exists("authors", $_GET)) {
        $query = ["authours" =>  $_GET['authors']];
    }

    $cursor = $db->literature->find($query);
    $data = $cursor->toArray();    

    // in case literature is requested by period
    if (array_key_exists("from", $_GET)
              && array_key_exists("to", $_GET)) {
        
        $arrToShow = array();
        
        $fromInt = strtotime($_GET['from']);
        $toInt = strtotime($_GET['to']); 

        // weed out an inappropriate array elements
        foreach ($data as $value) {
            $strDate = $value["publication_date"];
            $intDate = strtotime($strDate);

            if ($fromInt <= $intDate && $intDate <= $toInt) {
                array_push($arrToShow, $value);
            }
        }

        $data = $arrToShow;
    }

    header('Content-Type:application/json');
    echo json_encode($data);
