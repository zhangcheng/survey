Session.set('editingEthernet', null);
Session.set('editingComponent', null);

////////// Wireless Ethernet Protocols //////////
Template.wirelessEthernet.wirelessEthernets = function() {
	return WirelessEthernets.find({}, {sort: {position: 1}});
};

Template.wirelessEthernet.editingName = function() {
	return (Session.equals('editingEthernet', this._id) && Session.equals('editingComponent', 'name'));
};

Template.wirelessEthernet.editingPosition = function() {
	return (Session.equals('editingEthernet', this._id) && Session.equals('editingComponent', 'position'));
};


////////// Events //////////
Template.wirelessEthernet.events({
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
				WirelessEthernets.remove(bootbox.ethernet_id);
			}
		});
	},

	'click #new-submit' : function (event) {
		event.preventDefault();
		WirelessEthernets.insert({
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

Template.wirelessEthernet.events(okCancelEvents(
	'.edit',
	{
		ok: function (value) {
			switch(Session.get('editingComponent')) {
				case 'name': 
					WirelessEthernets.update(this._id, {$set: {name: value}});
					break;
				case 'position':
					WirelessEthernets.update(this._id, {$set: {position: parseFloat(value)}});
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