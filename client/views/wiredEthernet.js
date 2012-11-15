Session.set('editingEthernet', null);
Session.set('editingComponent', null);

////////// Wired Ethernet Speeds //////////
Template.wiredEthernet.wiredEthernets = function() {
	return WiredEthernets.find({}, {sort: {position: 1}});
};

Template.wiredEthernet.editingName = function() {
	return (Session.equals('editingEthernet', this._id) && Session.equals('editingComponent', 'name'));
};

Template.wiredEthernet.editingPosition = function() {
	return (Session.equals('editingEthernet', this._id) && Session.equals('editingComponent', 'position'));
};


////////// Events //////////
Template.wiredEthernet.events({
	'dblclick .name' : function(evt, tmpl) {
		Session.set('editingEthernet', this._id);
		Session.set('editingComponent', 'name');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateName"));
	},

	'dblclick .position' : function(evt, tmpl) {
		Session.set('editingEthernet', this._id);
		Session.set('editingComponent', 'position');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updatePosition"));
	},

	'click .remove-ethernet' : function () {
		bootbox.ethernet_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				WiredEthernets.remove(bootbox.ethernet_id);
			}
		});
	},

	'click #new-submit' : function (event) {
		event.preventDefault();
		WiredEthernets.insert({
			name: $("#newName").val(),
			position: parseFloat($("#newPosition").val())
		});
		$("#newName").val("");
		$("#newPosition").val("");
	},

	'click #new-cancel' : function (event) {
		event.preventDefault();
		$("#newName").val("");
		$("#newPosition").val("");
	}
});

Template.wiredEthernet.events(okCancelEvents(
	'.edit',
	{
		ok: function (value) {
			switch(Session.get('editingComponent')) {
				case 'name': 
					WiredEthernets.update(this._id, {$set: {name: value}});
					break;
				case 'position':
					WiredEthernets.update(this._id, {$set: {position: parseFloat(value)}});
					break;
			}
			Session.set('editingEthernet', null);
			Session.set('editingComponent', null);
		},
		
		cancel: function () {
			Session.set('editingEthernet', null);
			Session.set('editingComponent', null);
		}
	}));