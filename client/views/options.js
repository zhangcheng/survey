Session.set('editingCompanyName', false);


////////// Options //////////
Template.options.editingCompanyName = function () {
	return Session.get('editingCompanyName');
};

Template.options.companyName = function() {
	return Options.findOne({key: "companyName"});
};


////////// Events //////////
Template.options.events({
	'dblclick #company-name': function (evt, tmpl) {
		Session.set('editingCompanyName', true);
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#update-company-name"));
	}
});

Template.options.events(okCancelEvents(
	'#set-company-name',
	{
		ok: function (text, evt) {
			Options.insert({key: "companyName", value: text});
			evt.target.value = "";
		},
		cancel: function (evt) {
			evt.target.value = "";
		}
	}));

Template.options.events(okCancelEvents(
	'#update-company-name',
	{
		ok: function (value) {
			Options.update({key: "companyName"}, {$set: {value: value}});
			Session.set('editingCompanyName', false);
		},
		cancel: function () {
			Session.set('editingCompanyName', false);
		}
	}));