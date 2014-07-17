/*global Ember, Todos */
(function () {
	'use strict';

	Todos.Router.map(function () {
		this.resource('lists',{ path: '/' });
		this.resource('todos', { path: '/list/:list_id' }, function () {
			this.route('active');
			this.route('completed');
			this.route('inbin');
		});
	});

	Todos.ListsRoute = Ember.Route.extend({
		model: function () {
			return Todos.List;
		}
	});

	Todos.ListIndexRoute = Todos.ListsRoute.extend({
		templateName: 'lists',
		controllerName: 'lists'
	});

	Todos.TodosRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('todo');
		}
	});

	Todos.TodosIndexRoute = Todos.TodosRoute.extend({
		templateName: 'todo-list',
		controllerName: 'todos-list',
		model: function (params, transition) {
			var id = transition.params.todos.list_id; //HACK: reading the documentation, I expected params.list_id to work, but it's actually empty. See http://emberjs.com/guides/routing/specifying-a-routes-model/
			return this.store.filter('todo', function (todo) { 
				return !todo.get('inBin') && todo.get('listId') == id; 
			});
		}
	});

	Todos.TodosActiveRoute = Todos.TodosIndexRoute.extend({
		model: function (params, transition) {
			var id = transition.params.todos.list_id;
			return this.store.filter('todo', function (todo) {
				return !(todo.get('isCompleted') || todo.get('inBin')) && todo.get('listId') == id;
			});
		}
	});

	Todos.TodosCompletedRoute = Todos.TodosIndexRoute.extend({
		model: function (params, transition) {
			var id = transition.params.todos.list_id;
			return this.store.filter('todo', function (todo) {
				return todo.get('isCompleted') && !todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});	

	Todos.TodosInbinRoute = Todos.TodosIndexRoute.extend({
		model: function (params, transition) {
			var id = transition.params.todos.list_id;
			return this.store.filter('todo', function (todo) {
				return todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});
})();
