angular.module('app', [
	'btford.socket-io', 'bindtable'
])

.factory('socket', function (socketFactory) {
  return socketFactory({
    prefix: '',
    ioSocket: io.connect('http://localhost:3000')
  });
})

.controller('test', function ($scope, socket) {

	$scope.activities = [];

	socket.emit('activity:changes:start', function() {});

	socket.on('activity:changes', function (change) {
		if(change.new_val === null) console.log(change.old_val.id); // remove using change.old_val.id
		else $scope.activities.push(change.new_val);
	});

});


// .factory('socket', function(socketFactory){
//   return socketFactory({
//     prefix: '',
//     ioSocket: io.connect('http://localhost:3000')
//   });
// })

// .factory('bindTable', function(bindTableFactory, socket){
//   return bindTableFactory({socket: socket});
// })


// .controller('test', questionsCtrl);

// function questionsCtrl($scope, bindTable){

//   var data = bindTable('activity');
//   // calling bind(filter, limit, offset) creates a rows
//   // property that is synchronized with changes on the server side
//   data.bind(null, 100);

//   $scope.activities = data.rows;
//   $scope.delete = data.delete;
//   $scope.$on('$destroy', function(){

//     data.unBind();

//   });

// }