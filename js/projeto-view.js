var id_projeto
$(document).ready(function () {
    id_projeto = location.search.substring(1)
    // console.log(parametro)

    sql = `SELECT PJ.NOME, PD.NOME AS NOME_PRODUTOR, PJ.IMAGEM, PJ.META_FINAL FROM tb_projeto AS PJ
    INNER JOIN tb_usuario AS PD
    ON PJ.ID_PRODUTOR = PD.ID
    WHERE PJ.ID = '${id_projeto}'`

    jQuery.ajax({
        type: "POST",
        url: '../backend/crud.class.php',
        dataType: 'json',
        data: {
            functionname: 'execute_query',
            arguments: sql
        },

        success: function (data, textstatus) {
            if (!('error' in data)) {
                resultado = JSON.parse(data.result);

                resultado.forEach(element => {
                    imagens = JSON.parse(element.IMAGEM)

                    //$('#imagem').append(`<img src="https://i.imgur.com/${imagens[0]}.jpg" class="img-fluid" alt="">`)
                    $('#imagem').append(
                        `<div style="background-image: url('https://i.imgur.com/${imagens[0]}.jpg'); background-position: center; background-size: cover; width:735px; height:600px; border-radius:5px" class="img-fluid"> </div>`
                    )
                    $('#nomeProjeto').html(element.NOME)
                    $('#nomeProdutor').html(element.NOME_PRODUTOR)

                    $('#valorMeta').html(`Meta R$${element.META_FINAL}`)


                });


            } else {
                console.log(data.error);
            }
        }
    })

});

modalCadastro = () => {

    if (localStorage.getItem("tipo_usuario") == 'P') {
 
        $('#modalInfo').modal('hide');

        Swal.fire({
            icon: 'error',
            title: 'Erro ao no apoio',
            text: 'Impossivel apoiar um projeto com uma conta de Produtor',
            showConfirmButton: false,
            timer: 3000
        })

    }
    else if (localStorage.getItem("tipo_usuario") == 'C') {

        $('#nome').val(localStorage.getItem("nome_usuario"))
        $('#sobrenome').val(localStorage.getItem("sobrenome_usuario"))
        $('#email').val(localStorage.getItem("email_usuario"))
        if (localStorage.getItem("id_usuario") != null) {
            $('#nome').prop("disabled", true);
            $('#sobrenome').prop("disabled", true);
            $('#email').prop("disabled", true);
        }

        sql = `SELECT * FROM tb_info_usuario
            WHERE ID_USUARIO = '${localStorage.getItem("id_usuario")}'`

        $.ajax({
            type: "POST",
            url: '../backend/crud.class.php',
            dataType: 'json',
            data: {
                functionname: 'execute_query',
                arguments: sql
            },

            success: function (data, textstatus) {
                if (!('error' in data)) {
                    resultado = JSON.parse(data.result);

                    $('#cpf').val(resultado[0].CPF)
                    $('#telefone').val(resultado[0].TELEFONE)
                    $('#logradouro').val(resultado[0].LOGRADOURO)
                    $('#cidade').val(resultado[0].CIDADE)
                    $('#estado').val(resultado[0].ESTADO)
                    $('#bairro').val(resultado[0].BAIRRO)
                    $('#cep').val(resultado[0].CEP)
                    $('#numero').val(resultado[0].NUMERO)


                } else {
                    console.log(data.error);
                }
            }
        })

    }


}


validaFormulario = () => {

    if (localStorage.getItem("id_usuario") == null) {
        localStorage.setItem("id_usuario", 0)
    }

    sql = `CALL realiza_pedido(${localStorage.getItem("id_usuario")},${id_projeto},'${$('#nome').val()}','${$('#sobrenome').val()}','${$('#cpf').val()}','${$('#telefone').val()}','${$('#email').val()}','${$('#logradouro').val()}','${$('#cidade').val()}','${$('#estado').val()}','${$('#bairro').val()}','${$('#cep').val()}','${$('#numero').val()}')`

    $.ajax({
        type: "POST",
        url: '../backend/crud.class.php',
        dataType: 'json',
        data: {
            functionname: 'execute_query',
            arguments: sql
        },

        success: function (data, textstatus) {
            if (!('error' in data)) {
                resultado = JSON.parse(data.result);

                $('#nome').val(localStorage.getItem("nome_usuario"))
                console.log(resultado)
                
                $('#modalInfo').modal('hide');

                Swal.fire({
                    icon: 'success',
                    title: 'Projeto apoiado com sucesso',
                    text: 'Obrigado por Apoiar esse projeto',
                    showConfirmButton: true,
                    //timer: 3000
                })


            } else {
                console.log(data.error);
            }
        }
    })

    return false
}

let data_inicio = '2021-09-31'
let data_fim = '2021-10-07'

document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        themeSystem: 'bootstrap',
        initialDate: data_inicio,
        headerToolbar: {
            text: 'custom!',
            left: 'title',
            center: '',
            right: ''
        },
        events: [{
            title: 'Previsão de Entrega',
            start: data_inicio,
            end: data_fim,
        },
        {
            start: data_inicio,
            end: data_fim,
            display: 'background',
            color: 'green'
        }
        ]
    });

    calendar.render();
});