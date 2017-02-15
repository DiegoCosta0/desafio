/*==========================================================
    Autor      : Diego Fernandes
    Data da Criação : 10 Fev 2017
    Description : Controller para gerar a lista semanal do café 
    recebendo e enviando dados através do service
 ===========================================================*/
(function(){
	'use strict';
	angular.module('myapp').controller('listaSemanalController',listaSemanalController);

	listaSemanalController.$inject =['$scope','$rootScope','$location','$http','service'];
	

	function listaSemanalController($scope,$rootScope,$location,$http,service){
			
	    $scope.semanas = [
            { id: 1, dia: "Segunda" ,turno: "Manhã",nome:""},
            { id: 2, dia: "Segunda" ,turno: "Tarde",nome:""},
            { id: 3, dia: "Terça" ,turno: "Manhã",nome:""},
            { id: 4, dia: "Terça" ,turno: "Tarde",nome:""},
            { id: 5, dia: "Quarta" ,turno: "Manhã",nome:""},
            { id: 6, dia: "Quarta" ,turno: "Tarde",nome:""},
            { id: 7, dia: "Quinta" ,turno: "Manhã",nome:""},
            { id: 8, dia: "Quinta" ,turno: "Tarde",nome:""},
            { id: 9, dia: "Sexta" ,turno: "Manhã",nome:""},
            { id: 10, dia: "Sexta" ,turno: "Tarde",nome:""}
        ];

		$scope.gerar = function(){
			$scope.dados = service.getDados();
			if ($scope.dados == null) {
				toastr.error('Para gerar a lista, tem que haver nomes cadastrados, por favor faça o cadastro.');
			}else{
				var cadastrosAleatorios = $scope.aleatorio($scope.dados); 
				var listaAleatoria = $scope.gerarLista(cadastrosAleatorios);
	        	var salvar = service.postListaSemanal(listaAleatoria);
				var mostrar = listaGerada();
			}
		}

		$scope.aleatorio = function(array) {
			var indice = array.length, valorTemporario, indiceAleatorio;
			// enquato a elementos para misturar...
			while (0 !== indice) {
				// escolhe um elemento restante...
				indiceAleatorio = Math.floor(Math.random() * indice);
				indice -= 1;
				// faz a troca com o elemento atual.
				valorTemporario = array[indice];
				array[indice] = array[indiceAleatorio];
				array[indiceAleatorio] = valorTemporario;
			}
			return array;
		}

		$scope.gerarLista = function(listaAleatoria){
			$scope.lista = [];
			$scope.turnos = 10;
			if(listaAleatoria.length < $scope.turnos){
				$scope.resultCadastro = $scope.turnos - listaAleatoria.length;
				for( var i =0; i<$scope.resultCadastro; i++){	
					listaAleatoria.push(listaAleatoria[i]);
				}  
				for(var j = 0; j < listaAleatoria.length; j++ ){		
					$scope.semanas[j].nome = listaAleatoria[j].nome ;
					$scope.lista.push($scope.semanas[j]);	
				}
				return $scope.lista;
			}else{
				for(var j = 0; j < 10; j++ ){
					$scope.semanas[j].nome = listaAleatoria[j].nome ;
					$scope.lista.push($scope.semanas[j]);
				}
				return $scope.lista;
			}				
		}

		function dataAtualFormatada(){
		    var data = new Date();
		    var dia = data.getDate();
		    if (dia.toString().length == 1)
		    	dia = "0" + dia;
		    	var mes = data.getMonth()+1;
		    if (mes.toString().length == 1)
		    	mes = "0"+mes;
		    	var ano = data.getFullYear();  
		    return dia+"/"+mes+"/"+ano;
		}

		// Gera um PDF com a lista aleatória, utilizando jsPDF com documentação em 
		// https://parall.ax/products/jspdf
		function listaGerada (){
			$scope.dados = service.getListaSemanal();
			var linha = 10;
			var doc = new jsPDF();
			var date = dataAtualFormatada();

			doc.text(70,20,'Encarregados do café na semana.');
			doc.setFontSize(10);
			doc.text(160,30,'Gerado em:'+ date)
			doc.line(10,32,200,32)
			doc.setLineWidth(1)
			doc.setFontSize(16);
			doc.setFontType('bolditalic')
			doc.setFont('courier')
			doc.text(30, 38, ("Dia"));
			doc.text(90, 38, ("Turno"));
			doc.text(140, 38, ("Nome"));
			doc.setFontSize(13);
			doc.setFontType('normal')
			$.each($scope.dados, function(index, dado){
				var dia    = dado.dia;
				var turno  = dado.turno;
				var nome   = dado.nome;

				doc.text(30, (linha+38), (dia));
				doc.text(90, (linha+38), (turno));
				doc.text(140, (linha+38), (nome));

				linha = linha + 10;
			});
			var string = doc.output('dataurlnewwindow');
		}
	};	
})();