<?php 

define('DB_HOST'        , "localhost"); 
define('DB_USER'        , "root");
define('DB_PASSWORD'    , "");
define('DB_NAME'        , "DB_APOIOVERDE");
define('DB_DRIVER'      , "mysql");

class Connection{

   private static $connection;
  
   //private function __construct(){}
  
   public static function getConnection() {
  
       $pdoConfig  = DB_DRIVER . ":". "Server=" . DB_HOST . ";";
       $pdoConfig .= "Database=".DB_NAME.";";
       
       try {
           if(!isset($connection)){
               $connection =  new PDO($pdoConfig, DB_USER, DB_PASSWORD);
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
