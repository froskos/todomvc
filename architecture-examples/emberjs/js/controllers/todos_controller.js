/*global Todos, Ember */
(function () {
	'use strict';

	Todos.TodosController = Ember.ArrayController.extend({
		actions: {
			createTodo: function () {
				var title, todo;

				// Get the todo title set by the "New Todo" text field
				title = this.get('newTitle').trim();
				if (!title) {
					return;
				}
				// Create the new Todo model
				todo = this.store.createRecord('todo', {
					title: title,
					isCompleted: false,
					inBin: false
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
		//the following two filters do the right calculation in the initial rendering (e.g. when refreshing), but do not get recalculated automatically when an item is deleted or marked as completed, why?
		remaining: Ember.computed.filter('model', function(todo){
			return !(todo.get('isCompleted') || todo.get('inBin'));
		}), 
		completed: Ember.computed.filter('model', function(todo){
			return todo.get('isCompleted') && !todo.get('inBin');
		}),
		inbin: Ember.computed.filterBy('model', 'inBin', true),

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
