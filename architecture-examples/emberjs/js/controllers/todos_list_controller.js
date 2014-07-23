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
		}.property('allTodos.length', '@each.isEditing'),

		actions: {
			createTodo: function () {
				var title, todo, listId;
				listId = +this.target.router.state.params['todos.index'].list_id; //UGLY! having this as the only way to retrieve routing data in the controller feels VERY hacky to me... Is there an elegant way or, let's say an Ember way? I do not want to fight AGAINST Ember! :)

				// Get the todo title set by the "New Todo" text field
				title = this.get('newTitle').trim();
				if (!title) {
					return;
				}
				// Create the new Todo model
				todo = this.store.createRecord('todo', {
					title: title,
					isCompleted: false,
					inBin: false,
					listId: listId
				});
				todo.save();

				// Clear the "New Todo" text field
				this.set('newTitle', '');
			}
		}
	});

	

})();
