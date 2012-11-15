Session.set('editing_optical_drive', null);

////////// Optical Drives //////////
Template.opticalDrives.opticalDrives = function() {
	return OpticalDrives.find({}, {sort: {name: 1}});
};

Template.opticalDrives.editing = function () {
	return Session.equals('editing_optical_drive', this._id);
};

////////// Events //////////
Template.opticalDrives.events({
	'dblclick .optical-drive-name': function (evt, tmpl) { // start editing optical drive name
		Session.set('editing_optical_drive', this._id);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#optical-drive-name-input"));
	},
	'click .remove-optical-drive' : function () {
		bootbox.opticalDrive_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				OpticalDrives.remove(bootbox.opticalDrive_id);
			}
		});
	}
});

Template.opticalDrives.events(okCancelEvents(
	'#new-optical-drive',
	{
		ok: function (text, evt) {
			OpticalDrives.insert({name: text});
			evt.target.value = "";
		},
		cancel: function (evt) {
			evt.target.value = "";
		}
	}));

Template.opticalDrives.events(okCancelEvents(
	'#optical-drive-name-input',
	{
		ok: function (value) {
			OpticalDrives.update(this._id, {$set: {name: value}});
			Session.set('editing_optical_drive', null);
		},
		cancel: function () {
			Session.set('editing_optical_drive', null);
		}
	}));