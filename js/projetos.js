$( document ).ready(function() {

    sql = `SELECT P.IMAGEM, P.ID, P.NOME, U.NOME AS NOME_PRODUTOR FROM tb_projeto AS P
            INNER JOIN tb_usuario AS U
            ON P.ID_PRODUTOR = U.ID
            ORDER BY P.ID DESC
            ;`

    cons = ''

    jQuery.ajax({
        type: "POST",
        url: '../backend/crud.class.php',
        dataType: 'json',
        data: {functionname: 'execute_query', arguments: sql},

        success: function (data, textstatus) {
                      if( !('error' in data) ) {
                          resultado = JSON.parse(data.result);

                        console.log(resultado)
                          resultado.forEach(element => {
                              imagens = JSON.parse(element.IMAGEM)
                              console.log(imagens)
                              cons += `
                                <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                    <a class="card " onclick="window.location.href = 'projeto-view.html?${element.ID}'">
                                        <div class="img container mb-3">
                                            <div style="background-image: url('https://i.imgur.com/${imagens[0]}m.jpg'); background-position: center; background-size: cover; width:500px; height:220px;" class="img-fluid"> </div>
                                        </div>
                                        <h5>${element.NOME}</h5>
                                        <p class="mb-0">${element.NOME_PRODUTOR}</p>
                                        <button type="button" class="btn button-primary-outline button">Ver
                                            projeto</button>
                                    </a>
                                </div>
                              `
                          });

                          $('#listaProjetos').append(cons);

                      }
                      else {
                          console.log(data.error);
                      }
                }
    })
    
});