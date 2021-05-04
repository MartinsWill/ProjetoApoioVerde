

var token = 0;
var filesHash = [];

function uploadImagem(ev) {

    for (let i = 0; i < ev.files.length; i++) {

        const formdata = new FormData()
        formdata.append("image", ev.files[i])
        fetch("https://api.imgur.com/3/image/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token_acesso}`
            },
            body: formdata
        })
            .then(data => data.json())
            .then(data => {
                //img.src = data.data.link
                //url.innerText = data.data.link
                filesHash.push(data.data.id)
                //console.log(data.data.id)

                if (filesHash.length == ev.files.length) {
                    console.log(JSON.stringify(filesHash))
                    validaFormulario(JSON.stringify(filesHash))
                }
            })

    }

    return false
}


//LISTENER PREEVIEW DAS IMAGENS SELECIONADAS
file.addEventListener("change", ev => {
    let conc = ''
    document.getElementById('spanImagem').innerHTML = ''
    let files = ev.target.files

    for (let i = 0; i < files.length; i++) {
        const image = document.createElement('img')
        image.src = URL.createObjectURL(files[i])
        conc += `<img src="${image.src}" id="image_${i}" style="max-height:200px;"/>  &nbsp`
    }

    document.getElementById('spanImagem').innerHTML = conc
})


function validaFormulario(imgHash) {

    // $("#nome").change(function(){ $("#nomeError").html("") })
    // $("#descricao").change(function(){ $("#descricaoError").html("") })
    // $("#valor").change(function(){ $("#valorError").html("") })
    // $("#metaf").change(function(){ $("#metafError").html("") })

    // if ($("#nome").val() == "") {
    //     $("#nomeError").html("* O campo Nome não pode ser vazio");
    //     return false;
    // }
    // else if ($("#descricao").val() == "") {
    //     $("#descricaoError").html("* O campo Descrição não pode ser vazio");
    //     return false;
    // }
    // else if ($("#valor").val() == "") {
    //     $("#valorError").html("* O campo Valor não pode ser vazio");
    //     return false;
    // }
    // else if ($("#metaf").val() == "") {
    //     $("#metafError").html("* O campo Meta Final não pode ser vazio");
    //     return false;
    // }
    // else{

    let sql = `INSERT INTO tb_projeto 
    (NOME, OQUE_APOIAREI, OQUE_RECEBEREI, QUANDO_RECEBEREI, VALOR, META_FINAL, ESTADO, DATA_ENTREGA, IMAGEM, ID_PRODUTOR) 
    VALUES 
    ("${$("#nome").val()}","${$("#descricao1").val()}","${$("#descricao2").val()}","${$("#descricao3").val()}","${$("#valor").val()}","${$("#metaf").val()}", 1, "${$("#data").val()}", '${imgHash}', "${localStorage.getItem('id_usuario')}");`

    $.ajax({
        type: "POST",
        url: '../backend/crud.class.php',
        dataType: 'json',
        data: { functionname: 'execute_query', arguments: sql },

        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                yourVariable = obj.result;
                console.log(obj.result)
                alert('Cadastrado Com sucesso!!')
                window.location.replace(`#`);
            }
            else {
                console.log(obj.error);
            }
        }
    });



}
