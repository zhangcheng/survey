Session.set('editingMonitor', null);
Session.set('editingComponent', null);

////////// Monitors //////////
Template.monitors.monitors = function() {
	return Monitors.find({}, {sort: {serialNumber: 1}});
};

Template.monitors.manufacturers = function() {
	return Manufacturers.find({}, {sort: {name: 1}});
};

Template.monitors.manufacturerName = function () {
	if(this.manufacturerId) {
		var m = Manufacturers.findOne({_id : this.manufacturerId});
		return m.name;
	}
};

Template.monitors.screenSizes = function() {
	return ScreenSizes.find({}, {sort: {size: 1}});
};

Template.monitors.editingSerialNumber = function() {
	return (Session.equals('editingMonitor', this._id) && Session.equals('editingComponent', 'serialNumber'));
};

Template.monitors.editingManufacturerName = function() {
	return (Session.equals('editingMonitor', this._id) && Session.equals('editingComponent', 'manufacturerName'));
};

Template.monitors.editingModel = function() {
	return (Session.equals('editingMonitor', this._id) && Session.equals('editingComponent', 'model'));
};

Template.monitors.editingSize = function() {
	return (Session.equals('editingMonitor', this._id) && Session.equals('editingComponent', 'size'));
};

Template.monitors.editingPONumber = function() {
	return (Session.equals('editingMonitor', this._id) && Session.equals('editingComponent', 'poNumber'));
};

Template.monitors.editingCost = function() {
	return (Session.equals('editingMonitor', this._id) && Session.equals('editingComponent', 'cost'));
};


////////// Events //////////
Template.monitors.events({
	'dblclick .serialNumber' : function(evt, tmpl) {
		Session.set('editingMonitor', this._id);
		Session.set('editingComponent', 'serialNumber');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateSerialNumber"));
	},

	'dblclick .manufacturerName' : function(evt, tmpl) {
		Session.set('editingMonitor', this._id);
		Session.set('editingComponent', 'manufacturerName');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		$("#updateManufacturerId").val(this.manufacturerId);
		activateSelect(tmpl.find("#updateManufacturerId"));
	},

	'dblclick .model' : function(evt, tmpl) {
		Session.set('editingMonitor', this._id);
		Session.set('editingComponent', 'model');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateModel"));
	},

	'dblclick .size' : function(evt, tmpl) {
		Session.set('editingMonitor', this._id);
		Session.set('editingComponent', 'size');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		$("#updateScreenSize").val(this.size);
		activateSelect(tmpl.find("#updateScreenSize"));
	},

	'dblclick .poNumber' : function(evt, tmpl) {
		Session.set('editingMonitor', this._id);
		Session.set('editingComponent', 'poNumber');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updatePONumber"));
	},

	'dblclick .cost' : function(evt, tmpl) {
		Session.set('editingMonitor', this._id);
		Session.set('editingComponent', 'cost');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateCost"));
	},

	'click .remove-monitor' : function () {
		bootbox.monitor_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Monitors.remove(bootbox.monitor_id);
			}
		});
	},

	'click #new-submit' : function (event) {
		event.preventDefault();
		Monitors.insert({
			serialNumber: $("#new-serial").val(),
			manufacturerId: $("#new-manufacturer-select").val(),
			model: $("#new-model").val(),
			size: $("#new-size-select").val(),
			poNumber: $("#new-poNumber").val(),
			cost: $("#new-cost").val()
		});
		$("#new-serial").val("");
	},

	'click #new-cancel' : function (event) {
		event.preventDefault();
		$("#new-serial").val("");
		$("#new-manufacturer-select").prop('selectedIndex',0);
		$("#new-model").val("");
		$("#new-size-select").prop('selectedIndex',0);
		$("#new-poNumber").val("");
		$("#new-cost").val("");
	}
});

Template.monitors.events(okCancelEvents(
	'.edit',
	{
		ok: function (value) {
			switch(Session.get('editingComponent')) {
				case 'serialNumber': 
					Monitors.update(this._id, {$set: {serialNumber: value}});
					break;
				case 'manufacturerName':
					Monitors.update(this._id, {$set: {manufacturerId: value}});
					break;
				case 'model':
					Monitors.update(this._id, {$set: {model: value}});
					break;
				case 'size':
					Monitors.update(this._id, {$set: {size: value}});
					break;
				case 'poNumber':
					Monitors.update(this._id, {$set: {poNumber: value}});
					break;
				case 'cost':
					Monitors.update(this._id, {$set: {cost: value}});
					break;
			}
			Session.set('editingMonitor', null);
			Session.set('editingComponent', null);
		},
		cancel: function () {
			Session.set('editingMonitor', null);
			Session.set('editingComponent', null);
		}
	}));