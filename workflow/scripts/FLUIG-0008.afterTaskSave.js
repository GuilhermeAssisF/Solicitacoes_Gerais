function afterTaskSave(colleagueId, nextSequenceId, userList) {

    log.info("--- [FLUIG-0008] Evento afterTaskSave ---");

    // ID da atividade de Correção do Solicitante (geralmente 41, confirme no seu fluxo)
    var ATIVIDADE_CORRECAO = 41;
    var atividadeAtual = getValue("WKNumState");

    log.info("--- [FLUIG-0008] Atividade Atual: " + atividadeAtual);

    // Verifica se a tarefa que está sendo salva é a de "Correção da Solicitação"
    if (atividadeAtual == ATIVIDADE_CORRECAO) {

        // Pega o valor da decisão do solicitante (1 = Reencaminhar, 2 = Cancelar)
        var decisaoSolicitante = hAPI.getCardValue("cpReaberturaChamado");
        log.info("--- [FLUIG-0008] Decisão do Solicitante na Correção: " + decisaoSolicitante);

        // Se a decisão for "Reencaminhar", limpa os campos do parecer anterior do analista
        if (decisaoSolicitante == "1") {
            log.info("--- [FLUIG-0008] Limpando campos de parecer do analista para nova avaliação. Processo: " + getValue("WKNumProces"));
            
            // Limpa os campos de aprovação, parecer e nome do aprovador
            hAPI.setCardValue("cpAprovacaoGestor2", "");
            hAPI.setCardValue("cpParecercol2", "");
            hAPI.setCardValue("cpRespGestor2", "");
        }
    }
}