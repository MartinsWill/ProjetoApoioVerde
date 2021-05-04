
function validaFormulario(){


    
        let sql = `INSERT INTO tb_usuario (NOME, SOBRENOME, SENHA, EMAIL, TIPO, ATIVO) VALUES ("${$("#nome").val()}","${$("#sobrenome").val()}","${$("#senha").val()}","${$("#email").val()}","${$("#select_tipo").val()}",1);`

        $.ajax({
            type: "POST",
            url: '../backend/crud.class.php',
            dataType: 'json',
            data: {functionname: 'execute_query', arguments: sql},
        
            success: function (obj, textstatus) {
                          if( !('error' in obj) ) {
                              yourVariable = obj.result;
                              alert('Cadastro realizado com sucesso!')
                              window.location.replace("../frontend/login.html");
                          }
                          else {
                              console.log(obj.error);
                          }
                    }
        });


    

    return false
        
}

