<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Библиотека</title>
	<link rel="stylesheet" href="style.css">
	<script src="index.js" defer></script>
</head>
<body>
	<h1>Библиотека</h1>
	<p>
		<label for="publisher">
			Литература издательства:
		</label>
		<select id="publisher">
			<?php
				error_reporting(E_ALL);
				require 'vendor/autoload.php';
				$client = new MongoDB\Client();
				$db = $client->lb6_var0;

        		$cursor = $db->literature->find(
        			array(),
        			array('publisher' => true)
        		);
        		$uniquePubl = array();	
        		foreach ($cursor as $book) {
        			$publ = $book['publisher'];
        			if (!array_key_exists($publ, $uniquePubl)) {
        				$uniquePubl[$publ] = $publ;
        				echo "<option>$publ</option>";
        			}
        		}
			?>
		</select>   
		<a href="by-publisher.htm">
            <button>
                Показать   
            </button>
        </a>
    </p>

    <p>
		Литература за период с 
		<input type="date" name="from" id="from">
		<label for="to">по</label>
		<input type="date" name="to" id="to">
		<a href="by-period.htm">
            <button>
                Показать   
            </button>
        </a>
    </p>

    <p>
		Литература автора: 
		<select id="author">
			<?php
        		$cursor = $db->literature->find(
        			array(),
        			array('authours' => true)
        		);
        		$uniqueAuthors = array();	
        		foreach ($cursor as $book) {
        			if (array_key_exists('authours', $book)) {
        				$auth = $book['authours'];
        				if (!array_key_exists($auth, $uniqueAuthors)) {
        					$uniquePubl[$auth] = $auth;
        					echo "<option>$auth</option>";
        				}	
        			}
        		}				
			?>
		</select>
		<a href="by-author.htm">
            <button>
                Показать   
            </button>
        </a>
    </p>
</body>
</html>