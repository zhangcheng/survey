Session.set('editing_processor', null);

////////// Processors //////////
Template.processors.processors = function() {
	return Processors.find({}, {sort: {name: 1}});
};

Template.processors.manufacturers = function() {
	return Manufacturers.find({}, {sort: {name: 1}});
};

Template.processors.editing = function () {
	return Session.equals('editing_processor', this._id);
};

Template.processors.manufacturerName = function () {
	if(this.manufacturerId) {
		var m = Manufacturers.findOne({_id : this.manufacturerId});
		return m.name;
	}
};

////////// Events //////////
Template.processors.events({
	'dblclick .processor': function (evt, tmpl) {
		Session.set('editing_processor', this._id);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		$("#update-manufacturer-select").val(this.manufacturerId);
		activateInput(tmpl.find("#update-processor"));
	},

	'click .remove-processor' : function () {
		bootbox.processor_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Processors.remove(bootbox.processor_id);
			}
		});
	},

	'click #new-submit' : function (event) {
		event.preventDefault();
		Processors.insert({name: $("#new-processor").val(), manufacturerId: $("#new-manufacturer-select").val()});
		$("#new-processor").val("");
		$("#new-manufacturer-select").prop('selectedIndex',0);
	},

	'click #new-cancel' : function (event) {
		event.preventDefault();
		$("#new-processor").val("");
		$("#new-manufacturer-select").prop('selectedIndex',0);
	},

	'click #update-submit' : function (event, value) {
		event.preventDefault();
		Processors.update($("#update-id").val(), {$set: {name: $("#update-processor").val(), manufacturerId: $("#update-manufacturer-select").val()}});
		Session.set('editing_processor', null);
	},

	'click #update-cancel' : function (event) {
		event.preventDefault();
		Session.set('editing_processor', null);
	}
});