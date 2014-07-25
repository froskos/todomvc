/*global Todos, Ember */
(function () {
	'use strict';

	Todos.ListsController = Ember.ArrayController.extend({
		itemController:'list',
		actions: {
			createList: function () {
				var list, title, id;

				// Get the list title from text field
				title = this.get('listTitle').trim();
				if (!title) {
					return;
				}
				// Create the new list record
				id = this.get('length');
				list = this.store.createRecord('list', {
					title: title,
					listId: id + 1

				});
				list.save();

				this.set('listTitle', '');
			},
			actions: {
				createTodo: function () {debugger;}
			}
		},

		//todosList: Ember.computed.alias('controllers.todos') //
	});

	Todos.ListController = Ember.ObjectController.extend({
		actions: {
			createTodo: function () {
				var title, todo, listId, list;
				list = this;
				listId = this.get('content.listId');

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
