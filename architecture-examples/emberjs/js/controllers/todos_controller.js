/*global Todos, Ember */
(function () {
	'use strict';

	Todos.TodosController = Ember.ArrayController.extend({
		actions: {
			createTodo: function () {
				var title, todo, listId;
				listId = this.target.router.state.params.todos.list_id; //UGLY! having this as the only way to retrieve routing data in the controller feels VERY hacky to me... Is there an elegant way or, let's say an Ember way? I do not want to fight AGAINST Ember! :)

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
			},

			clearCompleted: function () {
				var completed = this.get('completed');
				completed.invoke('sendToBin');
				completed.invoke('save');
			},

			clearBin: function () {
				var inbin = this.get('inbin');
				inbin.invoke('deleteRecord');
				inbin.invoke('save');
			},

			restoreBin: function () {
				var inbin = this.get('inbin');
				inbin.invoke('restoreFromBin');
			}
		},

		/* properties */
		// now the filters obviously take into the consideration all todo records, as I cannot find how to match them against the current list id
		remaining: Ember.computed.filter('model', function(todo){
			return !(todo.get('isCompleted') || todo.get('inBin')); // We should filter also by Id, but before further hacking I want to know how to properly get and reflect routing state in the controller 
		}), 
		completed: Ember.computed.filter('model', function(todo){
			return todo.get('isCompleted') && !todo.get('inBin');
		}),
		inbin: Ember.computed.filterBy('model', 'inBin', true), //TODO: replace globally inbin for inBin...

		allAreDone: function (key, value) {
			if (value !== undefined) {
				this.setEach('isCompleted', value);
				return value;
			} else {
				var length = this.get('length');
				var completedLength = this.get('completed.length');

				return length > 0 && length === completedLength;
			}
		}.property('length', 'completed.length')
	});
})();
