/**
 * Função que verifica se o usuário logado visualizou todos os anexos da solicitação.
 * @returns {boolean} - Retorna 'true' se todos os documentos foram visualizados ou se não há anexos. Retorna 'false' se algum documento não foi visualizado.
 */
function verificarDocumentosVisualizados() {
    var anexos = [];
    
    // Pega a tabela de anexos do formulário.
    // É necessário usar o 'parent.ECM.attachmentTable' pois a tabela de anexos pertence à página do Fluig, e não ao iframe do formulário.
    if (parent && parent.ECM && parent.ECM.attachmentTable && parent.ECM.attachmentTable.getData) {
        anexos = parent.ECM.attachmentTable.getData();
    }

    // Se não houver anexos, a validação passa.
    if (anexos.length === 0) {
        return true;
    }

    var todosVisualizados = true;
    var usuarioLogado = parent.WCMAPI.userCode; // Pega o código do usuário logado.

    // Itera sobre cada anexo.
    for (var i = 0; i < anexos.length; i++) {
        var anexo = anexos[i];
        var documentoVisualizado = false;

        // Monta a URL da API para consultar os acessos do documento.
        var url = "/api/public/ecm/document/documentHitsByVersion/" + anexo.documentId + "/" + anexo.version;
        
        // Faz uma chamada síncrona para a API do Fluig.
        $.ajax({
            async: false,
            type: "GET",
            dataType: "json",
            url: url,
            error: function(xhr, status, error) {
                console.error("Erro ao consultar acessos do documento: " + anexo.documentId, error);
                todosVisualizados = false; // Considera como não visualizado em caso de erro.
            },
            success: function(data, status, xhr) {
                if (data && data.content && data.content.userList) {
                    // Verifica se o usuário logado está na lista de quem acessou o documento.
                    for (var j = 0; j < data.content.userList.length; j++) {
                        if (data.content.userList[j].colleagueId == usuarioLogado) {
                            documentoVisualizado = true;
                            break; // Se encontrou o usuário, pode parar de procurar nesta lista.
                        }
                    }
                }
            }
        });

        // Se um único documento não foi visualizado, a validação geral falha.
        if (!documentoVisualizado) {
            todosVisualizados = false;
            break; // Se um não foi visto, não precisa checar os outros.
        }
    }

    return todosVisualizados;
}