
$(document).ready(function() {
		
	
	var atividade = getWKNumState();
	
	Compartilhados.expandePainel(atividade);
	Compartilhados.destacaAprovacoes();
	Compartilhados.destacaParecer();
	Compartilhados.camposObrigatorio();
	
	if(atividade !== 41 && $("#cpReaberturaChamado").val() == ""){
    	$("#divReabertura").hide();
    }
});