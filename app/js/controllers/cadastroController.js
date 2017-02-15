/*==========================================================
    Autor      : Diego Fernandes
    Data da Criação : 10 Fev 2017
    Description : Controller para fazer o cadastro, 
    recebendo e enviando dados através do service
 ============================================================*/
(function(){
	'use strict';
	angular.module('myapp').controller('cadastroController',cadastroController);

	cadastroController.$inject =['$scope','$rootScope','$location','service'];
	
	function cadastroController($scope,$rootScope,$location,service){
		
		$scope.cadastro = {};

		$scope.listar = function(){
			$scope.dados = service.getDados();
		}

		$scope.validaNome = function(cadastro){	
			$scope.dados = service.getDados();
			$scope.nome = cadastro.toUpperCase();
			for (var i = 0; i < $scope.dados.length; i++) {
                if ($scope.dados[i].nome == $scope.nome){
                	$scope.existeNome = true;
                	break;
                }else{
                	$scope.existeNome = false;
                }
            }
		}

		$scope.salvar = function(cadastro){
			if ($scope.existeNome == true) {
				toastr.error('Esse nome já está salvo, por favor insira outro nome');
			}else{
				$scope.nome = cadastro.nome.toUpperCase();
	    		if($scope.nome.length < 3){
	    			toastr.error('O nome deve conter no mínino 3 caracteres');	
	    		}else{
	    			$scope.dados = service.getDados();
	    			if ($scope.dados == null) {
	                	$scope.codigo = 1;
	                    $scope.dados = [{nome: $scope.nome,codigo:$scope.codigo}];
	                } else {
	                	for (var i = 0; i < $scope.dados.length; i++) {
	    					$scope.codigo = $scope.dados[i].codigo + 1;
	                	}
	                    $scope.dados.push({nome: $scope.nome,codigo: $scope.codigo});
	                }
	                $scope.salvar = service.postDados($scope.dados);
	    			toastr.success($scope.nome + ' salvo com sucesso' );
	    			$location.path('/listar_cadastro'); 
	    		}
			}
		}

		$scope.deletar = function(row){
	   		if(typeof(Storage)!=="undefined") {
				$scope.dados = service.getDados();
    			for (var i = 0; i < $scope.dados.length; i++){
    				if ($scope.dados[i].nome === row.nome) { 
        				$scope.dados.splice(i, 1);
       	 				break;
    				}
    			}
    			toastr.warning(row.nome + ' apagado com sucesso' );	
    			$scope.salvar = service.postDados($scope.dados);
	   		}
		}
	};	
})();