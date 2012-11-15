Session.set('editingScreenSize', null);

////////// Optical Drives //////////
Template.screenSizes.screenSizes = function() {
	return ScreenSizes.find({}, {sort: {size: 1}});
};

Template.screenSizes.editing = function () {
	return Session.equals('editingScreenSize', this._id);
};

////////// Events //////////
Template.screenSizes.events({
	'dblclick .screenSize': function (evt, tmpl) { // start editing optical drive name
		Session.set('editingScreenSize', this._id);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateScreenSize"));
	},
	'click .removeScreenSize' : function () {
		bootbox.screenSize_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				ScreenSizes.remove(bootbox.screenSize_id);
			}
		});
	}
});

Template.screenSizes.events(okCancelEvents(
	'#newScreenSize',
	{
		ok: function (text, evt) {
			ScreenSizes.insert({size: parseFloat(text)});
			evt.target.value = "";
		},
		cancel: function (evt) {
			evt.target.value = "";
		}
	}));

Template.screenSizes.events(okCancelEvents(
	'#updateScreenSize',
	{
		ok: function (value) {
			ScreenSizes.update(this._id, {$set: {size: parseFloat(value)}});
			Session.set('editingScreenSize', null);
		},
		cancel: function () {
			Session.set('editingScreenSize', null);
		}
	}));