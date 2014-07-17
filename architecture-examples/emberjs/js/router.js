/*global Ember, Todos */
(function () {
	'use strict';

	Todos.Router.map(function () {
		this.resource('todos', { path: '/' }, function () {
			this.route('active');
			this.route('completed');
			this.route('inbin');
		});
	});

	Todos.TodosRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('todo'); //1- Apparently the find method populates the store object with a promise array to be later provided by the LSAdapter
		}
	});

	Todos.TodosIndexRoute = Todos.TodosRoute.extend({
		templateName: 'todo-list',
		controllerName: 'todos-list',
		model: function () {
			return this.store.filter('todo', function (todo) { //So we cannot use the filter directly above, since the data in LS wouldn't be loaded yet.
				return !todo.get('inBin'); //items marked as being in the bin should not be visible unless we want to see the bin!
			});
		}
	});

	Todos.TodosActiveRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return !(todo.get('isCompleted') || todo.get('inBin'));
			});
		}
	});

	Todos.TodosCompletedRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return todo.get('isCompleted') && !todo.get('inBin');
			});
		}
	});	

	Todos.TodosInbinRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return todo.get('inBin');
			});
		}
	});
})();
