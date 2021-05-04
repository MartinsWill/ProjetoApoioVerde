
function validaLogin() {


    $("#email").change(function () { $("#emailError").html("") })
    $("#senha").change(function () { $("#senhaError").html("") })

    if ($("#email").val() == "") {
        $("#emailError").html("* O campo Email não pode ser vazio");
        return false;
    }
    else if ($("#senha").val() == "") {
        $("#senhaError").html("* O campo Senha não pode ser vazio");
        return false;
    }
    else {
        let sql = `SELECT * FROM tb_usuario WHERE EMAIL = "${$("#email").val()}" AND SENHA = "${$("#senha").val()}"`

        jQuery.ajax({
            type: "POST",
            url: '../backend/crud.class.php',
            dataType: 'json',
            data: { functionname: 'execute_query', arguments: sql },

            success: function (obj, textstatus) {
                if (!('error' in obj)) {
                    resultado = JSON.parse(obj.result)
                    console.log(resultado)

                    if (resultado.length > 0) {
                        alert("Login Realizado com sucesso")

                        localStorage.setItem("id_usuario", resultado[0].ID);
                        localStorage.setItem("nome_usuario", resultado[0].NOME);
                        localStorage.setItem("sobrenome_usuario", resultado[0].SOBRENOME);
                        localStorage.setItem("email_usuario", resultado[0].EMAIL);
                        localStorage.setItem("tipo_usuario", resultado[0].TIPO);

                        if (resultado[0].TIPO == 'P')
                                window.location.replace(`../frontend/cadastro_projeto.html`);
                        else
                                window.location.replace(`../frontend/inicial.html`);
                    }
                    else
                        $("#loginInfo").html("* As informações de login informadas não constam em nossa base de dados");

                }
                else {
                    console.log(obj.error);
                }
            }
        });


    }

    return false
}

