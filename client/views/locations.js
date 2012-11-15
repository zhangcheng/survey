Session.set('editing_location', null);

////////// Locations //////////
Template.locations.locations = function() {
	return Locations.find({}, {sort: {name: 1}});
};

Template.locations.editing = function () {
	return Session.equals('editing_location', this._id);
};

////////// Events //////////
Template.locations.events({
	'dblclick .location-name': function (evt, tmpl) {
		Session.set('editing_location', this._id);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#location-name-input"));
	},
	'click .remove-location' : function () {
		bootbox.location_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Locations.remove(bootbox.location_id);
			}
		});
	}
});

Template.locations.events(okCancelEvents(
	'#new-location',
	{
		ok: function (text, evt) {
			Locations.insert({name: text});
			evt.target.value = "";
		},
		cancel: function (evt) {
			evt.target.value = "";
		}
	}));

Template.locations.events(okCancelEvents(
	'#location-name-input',
	{
		ok: function (value) {
			Locations.update(this._id, {$set: {name: value}});
			Session.set('editing_location', null);
		},
		cancel: function () {
			Session.set('editing_location', null);
		}
	}));