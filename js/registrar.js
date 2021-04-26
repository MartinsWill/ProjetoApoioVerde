
function validaFormulario(){


    
    $("#nome").change(function(){ $("#nomeError").html("") })
    $("#sobrenome").change(function(){ $("#sobrenomeError").html("") })
    $("#email").change(function(){ $("#emailError").html("") })
    $("#senha").change(function(){ $("#senhaError").html("") })

    if ($("#nome").val() == "") {
        $("#nomeError").html("* O campo Nome não pode ser vazio");
        return false;
    }
    else if ($("#sobrenome").val() == "") {
        $("#sobrenomeError").html("* O campo SobreNome não pode ser vazio");
        return false;
    }
    else if ($("#email").val() == "") {
        $("#emailError").html("* O campo Email não pode ser vazio");
        return false;
    }
    else if ($("#senha").val() == "") {
        $("#senhaError").html("* O campo Senha não pode ser vazio");
        return false;
    }
    else{
        let sql = `INSERT INTO DB_APOIOVERDE.TB_USUARIO (NOME, SOBRENOME, SENHA, EMAIL, TIPO, ATIVO) VALUES ("${$("#nome").val()}","${$("#sobrenome").val()}","${$("#senha").val()}","${$("#email").val()}",'C',1);`

        jQuery.ajax({
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


    }

    return false
        
}

