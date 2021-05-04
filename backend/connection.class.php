<?php 

define('DB_HOST'        , "fdb27.mutanthost.com"); 
define('DB_USER'        , "3823449_apoioverde");
define('DB_PASSWORD'    , "apoioverde26042021");
define('DB_NAME'        , "3823449_apoioverde");
define('DB_DRIVER'      , "mysql");


class Connection{

   private static $connection;
  
   //private function __construct(){}
  
   public static function getConnection() {
  
       $pdoConfig  = DB_DRIVER . ":". "Server=" . DB_HOST . ";";
       $pdoConfig .= "Database=".DB_NAME.";";
       
       try {
           if(!isset($connection)){
               $connection = new PDO('mysql:host=' . DB_HOST . ';dbname='. DB_NAME .';charset=utf8mb4', DB_USER, DB_PASSWORD);
               //$connection =  new PDO($pdoConfig, DB_USER, DB_PASSWORD);
               $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
               
           }
           
           return $connection;
       } catch (PDOException $e) {
           $mensagem = "Drivers disponiveis: " . implode(",", PDO::getAvailableDrivers());
           $mensagem .= "\nErro: " . $e->getMessage();
           throw new Exception($mensagem);
       }
   }

   	public function closeConnection(){

		$this->connection = null;

	}
   
}



?>