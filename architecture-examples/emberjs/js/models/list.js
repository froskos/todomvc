/*global Todos, DS */
(function () {
	'use strict';

	Todos.List = DS.Model.extend({
		title: DS.attr('string'),
		listId: DS.attr('number'),
		todos: DS.hasMany('todo')
	});
})();


// (function (){
// 	'use strict';
// 	Todos.List = [
// 		{
// 			id:'1',
// 			title:'Dog'
// 		},
// 		{	
// 			id:'2',
// 			title:'Home'
// 		},
// 		{	
// 			id:'3',
// 			title:'Work'
// 		},
// 	];
// })();

