var appcontactlist = angular.module('contactapp', []);

appcontactlist.controller('app', function($scope, $http,testFactory){
     $scope.contact = {};
  init();

      function init(){
          testFactory.getContactlist().then(function(data, status){
             // console.log(data);
              $scope.contactlist = data.data;
			  $scope.contact = {};
          });
     };
 /*   $scope.getContactlist = function(){
    $http.get('/contactlist').then(function(responce){
        $scope.contactlist = responce.data;
      $scope.contact = "";
    });
}*/

  // $scope.getContactlist();

    $scope.saveContactlist = function(){
        $http.post('/savecontactlist', $scope.contact).then(function(responce){
            console.log(responce);
           //  $scope.getContactlist();
            init();
        });
}
    $scope.editContactlist = function(id){
       $http.get('/editcontactlist/' + id).then(function(responce){
           console.log(responce)
           $scope.contact = responce.data;
       })
    };
    $scope.upateContactlist = function(){
        $http.put('/updatecontactlist/' + $scope.contact._id, $scope.contact).then(function(responce){
           // $scope.contactlist = responce.data;
          //  $scope.getContactlist();
           init();
        })
    }
    $scope.deleteContactlist = function(id){
      $http.delete('/deletecontactlist/' + id).then(function(responce){
          console.log(responce);
       //  $scope.getContactlist();
        init();
      });   
    };


})
appcontactlist.factory('testFactory', function($http){
 var factory1 = {};

    factory1.getContactlist = function(){
        return $http.get('/contactlist');
    };

    return factory1;
});
