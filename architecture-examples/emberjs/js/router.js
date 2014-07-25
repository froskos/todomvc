/*global Ember, Todos */
(function () {
	'use strict';

	Todos.Router.map(function () {
		this.resource('lists',{ path: '/' });
		this.resource('list', { path: '/list/:list_id'}, function() {
			this.route('index');
			this.route('active');
			this.route('completed');
			this.route('inbin');
		});
	});

	Todos.ListsRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('list');
		}
	});

	Todos.ListRoute = Ember.Route.extend({
		model: function (params, transition) {
			var id = +transition.params.list.list_id;
			return this.store.find('list', {listId:id}).then(function (obj) {
			    return obj.get('firstObject');
			});
		},
	});

	Todos.ListIndexRoute = Todos.ListRoute.extend({
		controllerName: 'todos',
		templateName: 'todo-list',
		model: function (params, transition) {
			var id = this.modelFor('list').get('listId');
			return this.store.filter('todo', function(todo) {
				return !todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});

	Todos.ListActiveRoute = Todos.ListIndexRoute.extend({
		model: function (params) {
			var id = this.modelFor('list').get('listId');
			return this.store.filter('todo', function (todo) {
				return !(todo.get('isCompleted') || todo.get('inBin')) && todo.get('listId') == id;
			});
		}
	});

	Todos.ListCompletedRoute = Todos.ListIndexRoute.extend({
		model: function (params) {
			var id = this.modelFor('list').get('listId');
			return this.store.filter('todo', function (todo) {
				return todo.get('isCompleted') && !todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});	

	Todos.ListInbinRoute = Todos.ListIndexRoute.extend({
		model: function (params) {
			var id = this.modelFor('list').get('listId');
			return this.store.filter('todo', function (todo) {
				return todo.get('inBin') && todo.get('listId') == id;
			});
		}
	});
})();
