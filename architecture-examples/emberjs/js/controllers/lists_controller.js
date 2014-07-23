/*global Todos, Ember */
(function () {
	'use strict';

	Todos.ListsController = Ember.ArrayController.extend({
		actions: {
			createList: function () {
				var list, title, id;
				debugger;
				
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
			}
		},

		todosList: Ember.computed.alias('controllers.todos') //
	});

})();
