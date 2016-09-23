app.controller('questionController',['$scope', '$http', 'userFactory', function($scope, $http, userFactory){
    $scope.postQuestion = function(question) {
      userFactory.postQuestion(question)
    }
}]);
