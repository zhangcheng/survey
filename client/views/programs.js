Session.set('editingProgram', null);

////////// Programs //////////
Template.programs.programs = function() {
	return Programs.find({}, {sort: {position: 1}});
};

Template.programs.manufacturers = function() {
	return Manufacturers.find({}, {sort: {name: 1}});
};

Template.programs.editing = function () {
	return Session.equals('editingProgram', this._id);
};

Template.programs.manufacturerName = function () {
	if(this.manufacturerId) {
		var m = Manufacturers.findOne({_id : this.manufacturerId});
		return m.name;
	}
};

////////// Events //////////
Template.programs.events({
	'click #updateSubmit' : function (event, value) {
		event.preventDefault();
		Programs.update($("#updateId").val(), {$set: {
			name: $("#updateName").val(), 
			manufacturerId: $("#updateManufacturerSelect").val(), 
			version: $("#updateVersion").val(), 
			position: parseFloat($("#updatePosition").val())
		}});
		Session.set('editingProgram', null);
	},

	'click #updateCancel' : function (event) {
		event.preventDefault();
		Session.set('editingProgram', null);
	},

	'click .removeProgram' : function () {
		bootbox.program_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Programs.remove(bootbox.program_id);
			}
		});
	},

	'click .editProgram' : function(evt, tmpl) {
		Session.set('editingProgram', this._id);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		$("#updateManufacturerSelect").val(this.manufacturerId);
		activateInput(tmpl.find("#updateName"));
	},

	'click #newSubmit' : function (event) {
		event.preventDefault();
		Programs.insert({
			name: $("#newName").val(), 
			manufacturerId: $("#newManufacturerSelect").val(), 
			version: $("#newVersion").val(), 
			position: parseFloat($("#newPosition").val())
		});
		$("#newName").val("");
		$("#newManufacturerSelect").prop('selectedIndex',0);
		$("#newVersion").val("");
		$("#newPosition").val("");
	},

	'click #newCancel' : function (event) {
		event.preventDefault();
		$("#newName").val("");
		$("#newManufacturerSelect").prop('selectedIndex',0);
		$("#newVersion").val("");
		$("#newPosition").val("");
	}
});