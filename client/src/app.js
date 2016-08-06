angular.module('project-block', ['ui.router'])
  .config(Config);

function Config($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('dashboard', {
      url: '/',
      templateUrl: 'dashboard/dashboardV.html',
      controller: 'dashboardC as dashboardC'
    });

}