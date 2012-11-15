Session.set('editingPrinter', null);
Session.set('editingComponent', null);

////////// Printers //////////
Template.printers.printers = function() {
	return Printers.find({}, {sort: {serialNumber: 1}});
};

Template.printers.manufacturers = function() {
	return Manufacturers.find({}, {sort: {name: 1}});
};

Template.printers.manufacturerName = function () {
	if(this.manufacturerId) {
		var m = Manufacturers.findOne({_id : this.manufacturerId});
		return m.name;
	}
};

Template.printers.editingSerialNumber = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'serialNumber'));
};

Template.printers.editingManufacturerName = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'manufacturerName'));
};

Template.printers.editingModel = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'model'));
};

Template.printers.editingPONumber = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'poNumber'));
};

Template.printers.editingCost = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'cost'));
};


////////// Events //////////
Template.printers.events({
	'dblclick .serialNumber' : function(evt, tmpl) {
		Session.set('editingPrinter', this._id);
		Session.set('editingComponent', 'serialNumber');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateSerialNumber"));
	},

	'dblclick .manufacturerName' : function(evt, tmpl) {
		Session.set('editingPrinter', this._id);
		Session.set('editingComponent', 'manufacturerName');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		$("#updateManufacturerId").val(this.manufacturerId);
		activateSelect(tmpl.find("#updateManufacturerId"));
	},

	'dblclick .model' : function(evt, tmpl) {
		Session.set('editingPrinter', this._id);
		Session.set('editingComponent', 'model');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateModel"));
	},

	'dblclick .poNumber' : function(evt, tmpl) {
		Session.set('editingPrinter', this._id);
		Session.set('editingComponent', 'poNumber');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updatePONumber"));
	},

	'dblclick .cost' : function(evt, tmpl) {
		Session.set('editingPrinter', this._id);
		Session.set('editingComponent', 'cost');
		Meteor.flush(); // force DOM redraw, so we can focus the edit field
		activateInput(tmpl.find("#updateCost"));
	},

	'click .remove-printer' : function () {
		bootbox.printer_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Printers.remove(bootbox.printer_id);
			}
		});
	},

	'click #new-submit' : function (event) {
		event.preventDefault();
		Printers.insert({
			serialNumber: $("#new-serial").val(),
			manufacturerId: $("#new-manufacturer-select").val(),
			model: $("#new-model").val(),
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
		$("#new-poNumber").val("");
		$("#new-cost").val("");
	}
});
Template.printers.events(okCancelEvents(
	'.edit',
	{
		ok: function (value) {
			switch(Session.get('editingComponent')) {
				case 'serialNumber': 
					Printers.update(this._id, {$set: {serialNumber: value}});
					break;
				case 'manufacturerName':
					Printers.update(this._id, {$set: {manufacturerId: value}});
					break;
				case 'model':
					Printers.update(this._id, {$set: {model: value}});
					break;
				case 'poNumber':
					Printers.update(this._id, {$set: {poNumber: value}});
					break;
				case 'cost':
					Printers.update(this._id, {$set: {cost: value}});
					break;
			}
			Session.set('editingPrinter', null);
			Session.set('editingComponent', null);
		},
		cancel: function () {
			Session.set('editingPrinter', null);
			Session.set('editingComponent', null);
		}
	}));