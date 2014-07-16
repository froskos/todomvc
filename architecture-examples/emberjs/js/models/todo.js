/*global Todos, DS */
(function () {
	'use strict';

	Todos.Todo = DS.Model.extend({
		title: DS.attr('string'),
		isCompleted: DS.attr('boolean'),
		inBin: DS.attr('boolean'),
		sendToBin: function() {
			this.set('inBin',true);
			return this;
		},
		restoreFromBin: function() {
			var model = this;
			Ember.run.later(function(){model.set('inBin',false).save();});
			return this;
		},
	});
})();
