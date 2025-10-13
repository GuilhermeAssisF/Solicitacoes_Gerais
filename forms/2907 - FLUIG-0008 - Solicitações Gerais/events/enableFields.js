/*
GESTOR - 7
DIRETOR - 8
CORREÇÃO - 41
ADMISSAO - 74
VALIDA KIT - 97
GERAR KIT - 89
*/

function enableFields(form){ 

	log.info("INICIO do EnableFields do formulário FLUIG-0007 - AFASTAMENTOS");
	
	var atividade = parseInt(getValue("WKNumState"));
	
	var Campos = new Array(
			//inicio e correcao
		{"campo" : "cpParecerObs","atividade" : "0,1,41"},
		//REABERTURA
		{"campo" : "cpReaberturaChamado","atividade" : "41"},
		{"campo" : "cpParecerReabertura","atividade" : "41"},
		//ANALISTA DP 
		{"campo" : "cpAprovacaoGestor","atividade" : "126"},
		{"campo" : "cpParecercol","atividade" : "126"},
		{"campo" : "cpRespGestor","atividade" : "126"},
		//ANALISTA BPO
		{"campo" : "cpAprovacaoGestor2","atividade" : "106"},
		{"campo" : "cpParecercol2","atividade" : "106"},
		{"campo" : "cpRespGestor2","atividade" : "106"}
	);

	for (var item in Campos){
		var Campo = Campos[item],
			atividades = Campo["atividade"].split(",");
		
		if(atividades.indexOf(atividade.toString()) >= 0){
			form.setEnabled(Campo["campo"],true);
			
		} else {
			form.setEnabled(Campo["campo"],false);
		}
	}

	log.info("Fim do EnableFields do formulário FLUIG-0007 - AFASTAMENTOS");
	
}



