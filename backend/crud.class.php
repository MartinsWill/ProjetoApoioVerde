<?php 
/*
* 	Descrição do Arquivo
* 	@autor - João Ricardo Gomes dos Reis
* 	@data de criação - dd/mm/aaaa
* 	@arquivo - controller.class.php
*/
//Importa a classe
require_once("connection.class.php");

abstract class Crud {

     /**
     *
     * @method execute_query
     * @param $sql (SQL Script que será executado no banco)
     * @return true || false
     *
     * */
	
    
    public static function execute_query($sql) {

      try{
        $conexao  = Connection::getConnection();
        $sql = $conexao->prepare($sql);
        $sql->execute();

        $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
        return $response = json_encode($resultado,JSON_UNESCAPED_UNICODE);
      }catch(Exception $e){
        return $e->getMessage();
        exit;
    }
	  	 

        //echo  $response = json_encode( array('data' =>  $resultado), JSON_UNESCAPED_UNICODE  );
   
    }

    /*
    public static function execute_query_data_table($sql) {

      $conexao  = Connection::getConnection();
      $sql = $conexao->prepare($sql);
      $sql->execute();

      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
      //echo $response = json_encode($resultado,JSON_UNESCAPED_UNICODE);
      //echo  $response = json_encode( array('data' =>  $resultado), JSON_UNESCAPED_UNICODE  );
      
      $result = array();
      
      for ($i=0; $i < count($resultado) ; $i++) {

            $result[] = array_values($resultado[$i]);
            
            
      }
      
      return  $response = json_encode( array('data' =>  $resultado), JSON_UNESCAPED_UNICODE  );
 
  }

  
  public static function execute_query1($sql) {

    $conexao  = Connection::getConnection();
      $sql = $conexao->prepare($sql);
      $sql->execute();

      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
      echo $resultado[0][MENSAGEM];echo "<br>";
      // echo  $response = json_encode( array('data' =>  $resultado[0][MENSAGEM]), JSON_UNESCAPED_UNICODE  );
 
  }

  public static function execute_query_return($sql) {

    try{
      $conexao  = Connection::getConnection();
      $sql = $conexao->prepare($sql);
      $sql->execute();

      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

      if(empty($resultado)){
        return $resultado;
      }else{
        $response = json_encode($resultado,JSON_UNESCAPED_UNICODE);
      }

      return $response;
      
    }catch(Exception $e){
      echo $e->getMessage();
      exit;
    }
   
  }

  public static function execute_query_qad($sql) {

    try{

      $conexao  = Connection::getConnection();
      $sql = $conexao->prepare($sql);
      $sql->execute();

      $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

      return $resultado;

    }catch(Exception $e){
      echo $e->getMessage();
      exit;
  }
     
  }

  */

}

header('Content-Type: application/json');

    $aResult = array();

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'execute_query':
              /*
               if( !is_array($_POST['arguments']) || (count($_POST['arguments']) < 2) ) {
                   $aResult['error'] = 'Error in arguments!';
               }
               else {
                 */
                   //$aResult['result'] = add(floatval($_POST['arguments'][0]), floatval($_POST['arguments'][1]));
                   $aResult['result'] = Crud::execute_query($_POST['arguments']);
               //}
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
        }

    }

    echo json_encode($aResult);
?>