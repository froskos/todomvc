/*global Todos, Ember */
(function () {
	'use strict';

	Todos.TodosListController = Ember.ArrayController.extend({
		needs: ['todos'],
		allTodos: Ember.computed.alias('controllers.todos'),
		itemController: 'todo',
		sortProperties: ['title'], // sortAscending is true by default, if we wanted reverse alphabetical order then specify sortAscending:false
		canToggle: function () {
			var anyTodos = this.get('allTodos.length');
			var isEditing = this.isAny('isEditing');

			return anyTodos && !isEditing;
		}.property('allTodos.length', '@each.isEditing')
	});

	

})();
