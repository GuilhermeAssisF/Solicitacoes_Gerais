/**
 * Funcao executada no momento do envio da solicitação para a próxima atividade e
 * é utilizada para realizar validações do formulário no lado do cliente (browser).
 * @param {string} numState - Número da atividade atual.
 * @param {string} nextState - Número da próxima atividade.
 */
var beforeSendValidate = function(numState, nextState) {
    var ATIVIDADE_ANALISTA_BPO = 106;

    // Se a atividade atual for a do Analista BPO, executa a validação.
    if (numState == ATIVIDADE_ANALISTA_BPO) {
        
        // A função verificarDocumentosVisualizados() está no arquivo custom.js
        if (!verificarDocumentosVisualizados()) {
            // Se a função retornar 'false', exibe uma mensagem de erro e impede o envio.
            throw "É necessário visualizar todos os documentos anexos antes de prosseguir com a solicitação.";
        }
    }
}