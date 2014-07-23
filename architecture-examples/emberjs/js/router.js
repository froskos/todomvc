/*global Ember, Todos */
(function () {
	'use strict';

	Todos.Router.map(function () {
		this.resource('lists',{ path: '/' });
		this.resource('todos.index', { path: '/list/:list_id/' });
		this.resource('todos.active', { path: '/list/:list_id/active' });
		this.resource('todos.completed', { path: '/list/:list_id/completed' });
		this.resource('todos.inbin', { path: '/list/:list_id/inbin' });
	});

	Todos.ListsRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('list');
		}
	});

	Todos.TodosRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('todos');
		}
	});

	Todos.TodosIndexRoute = Todos.TodosRoute.extend({
		templateName: 'todos',
		controllerName: 'todos-list',
		model: function (params) {
			var id = +params.list_id;
			return this.store.filter('todo', function(todo){
				return todo.get('listId') == id && !todo.get('inBin');
			});
		}
	});

	Todos.TodosActiveRoute = Todos.TodosIndexRoute.extend({
		model: function (params) {
			var id = +params.list_id;
			return this.store.filter('todo', function (todo) {
				return !(todo.get('isCompleted') || todo.get('inBin')) && todo.get('listId') == id;
			});
		}
	});

	Todos.TodosCompletedRoute = Todos.TodosIndexRoute.extend({
		model: function (params) {
			var id = +params.list_id;
			return this.store.filter('todo', function (todo) {
				return todo.get('isCompleted') && !todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});	

	Todos.TodosInbinRoute = Todos.TodosIndexRoute.extend({
		model: function (params) {
			var id = +params.list_id;
			return this.store.filter('todo', function (todo) {
				return todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});
})();
