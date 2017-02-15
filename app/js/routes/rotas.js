/*==========================================================
    Autor      : Diego Fernandes
    Data da criação : 11 Fev 2017
    Descrição : Modulo de rotas da aplicação
 ===========================================================*/
var app =  angular.module('myapp', ['ngRoute']);

app.config(function($routeProvider){

    $routeProvider
    .when('/home', {
        templateUrl : 'app/views/home/inicial.html'
    })

    .when('/listar_cadastro', {
        controller  : 'cadastroController',
        templateUrl : 'app/views/cadastros/lista.html'
    })

    .when('/adicionar_cadastro', {
        controller  : 'cadastroController',
        templateUrl : 'app/views/cadastros/adicionar.html'
    })


    .when('/lista_semanal', {
        controller  : 'listaSemanalController',
        templateUrl : 'app/views/semana/adicionar.html'
    })

    // caso não seja encontrada nenhuma rota, sera redirionada para essa rota '/'
    .otherwise ({ redirectTo: '/home' });
});