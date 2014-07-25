/*global Todos, Ember */
(function () {
	'use strict';

	Todos.TodosController = Ember.ArrayController.extend({
		needs:['todos'],
		actions: {
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
		}.property('length', 'completed.length'),

		allTodos: Ember.computed.alias('controllers.todos'),
		itemController: 'todo',
		sortProperties: ['title'],
		canToggle: function () {
			var anyTodos = this.get('allTodos.length');
			var isEditing = this.isAny('isEditing');

			return anyTodos && !isEditing;
		}.property('allTodos.length', '@each.isEditing')

	});
})();
