app.controller('answerController',['$scope', '$http', 'userFactory', '$routeParams', function($scope, $http, userFactory, $routeParams){
    function getQuestion(id){
      userFactory.getQuestion(id, function(question) {
        $scope.question = question;
      })
    };
    $scope.postAnswer = function(answer, qid){
      userFactory.postAnswer(answer, qid)
    }
    getQuestion($routeParams.id);
}]);
