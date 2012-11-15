Session.set('editing_manufacturer', null);

////////// Manufacturers //////////
Template.manufacturers.manufacturers = function() {
	return Manufacturers.find({}, {sort: {name: 1}});
};

Template.manufacturers.editing = function () {
	return Session.equals('editing_manufacturer', this._id);
};

//////// Events
Template.manufacturers.events({
	'dblclick .manufacturer-name': function (evt, tmpl) { // start editing manufacturer name
		Session.set('editing_manufacturer', this._id);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#manufacturer-name-input"));
	},
	'click .remove-manufacturer' : function () {
		bootbox.manufacturer_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Manufacturers.remove(bootbox.manufacturer_id);
			}
		});
	}
});

Template.manufacturers.events(okCancelEvents(
	'#new-manufacturer',
	{
		ok: function (text, evt) {
			Manufacturers.insert({name: text});
			evt.target.value = "";
		},
		cancel: function (evt) {
			evt.target.value = "";
		}
	}));

Template.manufacturers.events(okCancelEvents(
	'#manufacturer-name-input',
	{
		ok: function (value) {
			Manufacturers.update(this._id, {$set: {name: value}});
			Session.set('editing_manufacturer', null);
		},
		cancel: function () {
			Session.set('editing_manufacturer', null);
		}
	}));