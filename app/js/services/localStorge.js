/*==========================================================
    Autor      : Diego Fernandes
    Data da Criação : 11 Fev 2017
    Description : services para salvar em localStorage 
 ===========================================================*/
(function(){
	'use strict';
	angular.module('myapp').factory('service', function($http) {
	    var service = {
	    	getDados: function() {
	    		var dados = JSON.parse(localStorage.getItem("jsonSalvar"));
	    		return dados;
	    	},
	    	postDados: function(dados) {
	    		var arrayString = JSON.stringify(dados);
		    	localStorage.setItem("jsonSalvar", arrayString);
		    	return arrayString;
	    	},
	    	postListaSemanal: function(dados) {
	    		var arrayString = JSON.stringify(dados);
		    	localStorage.setItem("jsonListaSemanal", arrayString);
		    	return arrayString;
	    	},
	    	getListaSemanal: function(){
	    		var dados = JSON.parse(localStorage.getItem("jsonListaSemanal"));
	    		return dados;	
	    	}
	    };
	    return service;
	});

})();