//Session.set('editingComputer', null);
//Session.set('editingComponent', null);

////////// Computers //////////
Template.computers.computers = function() {
	return Computers.find({}, {sort: {serialNumber: 1}});
};

Template.computers.manufacturers = function() {
	return Manufacturers.find({}, {sort: {name: 1}});
};

Template.computers.manufacturerName = function () {
	if(this.manufacturerId) {
		var m = Manufacturers.findOne({_id : this.manufacturerId});
		return m.name;
	}
};

Template.computers.processors = function() {
	return Processors.find({}, {sort: {name: 1}});
};

Template.computers.processorName = function () {
	if(this.processorId) {
		var p = Processors.findOne({_id : this.processorId});
		var m = Manufacturers.findOne({_id : p.manufacturerId});
		return m.name + " " + p.name;
	}
};

Template.computers.opticalDrives = function() {
	return OpticalDrives.find({}, {sort: {name: 1}});
};

Template.computers.wiredEthernets = function() {
	return WiredEthernets.find({}, {sort: {position: 1}});
};

Template.computers.wirelessEthernets = function() {
	return WirelessEthernets.find({}, {sort: {position: 1}});
};

Template.computers.rendered = function () {
	$.each($(".otherHardware"), function() {
		var p = $(this);
		p.html(p.text().replace(/\n/g, "<br/>"));
	});
};
/*
Template.computers.editingSerialNumber = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'serialNumber'));
};

Template.computers.editingManufacturerName = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'manufacturerName'));
};

Template.computers.editingModel = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'model'));
};

Template.computers.editingPONumber = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'poNumber'));
};

Template.computers.editingCost = function() {
	return (Session.equals('editingPrinter', this._id) && Session.equals('editingComponent', 'cost'));
};
*/

////////// Events //////////
Template.computers.events({
	/*
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
	*/

	'click .remove-computer' : function () {
		bootbox.computer_id = this._id;
		bootbox.confirm("Are you sure?", function(confirmed) {
			if(confirmed) {
				Computers.remove(bootbox.computer_id);
			}
		});
	},

	'click .additional-details' : function(evt, tmpl) {
		if($(evt.target).hasClass('icon-plus')) {
			$(evt.target).removeClass('icon-plus');
			$(evt.target).addClass('icon-minus');
		} else {
			$(evt.target).removeClass('icon-minus');
			$(evt.target).addClass('icon-plus');
		}
	},

	'click .edit-computer' : function(evt, tmpl) {
		$("#"+this._id+"_edit .editManufacturerSelect").val(this.manufacturerId);
		$("#"+this._id+"_edit .editProcessorSelect").val(this.processorId);
		$("#"+this._id+"_edit .editWiredEthernetSelect").val(this.wiredEthernetSpeed);
		$("#"+this._id+"_edit .editWirelessEthernetSelect").val(this.wirelessEthernetProtocol);
		$("#"+this._id+"_edit .editOpticalSelect").val(this.opticalDrive);
	},

	'click #new-submit' : function (event) {
		event.preventDefault();
		Computers.insert({
			serialNumber: $("#newSerial").val(),
			manufacturerId: $("#newManufacturerSelect").val(),
			model: $("#newModel").val(),
			poNumber: $("#newPONumber").val(),
			cost: $("#newCost").val(),
			processorId: $("#newProcessorSelect").val(),
			clockSpeed: $("#newClockSpeed").val(),
			memorySize: $("#newMemorySize").val(),
			primaryDriveSize: $("#newPrimaryDriveSize").val(),
			wiredEthernetSpeed: $("#newWiredEthernetSelect").val(),
			wirelessEthernetProtocol: $("#newWirelessEthernetSelect").val(),
			ipAddress: $("#newIPAddress").val(),
			opticalDrive: $("#newOpticalSelect").val(),
			otherHardware: $("#newOtherHardware").val()
		});

		$("#newSerial").val("");
		$("#newIPAddress").val("");
		$("#newOtherHardware").val("");
	},

	'click #new-cancel' : function (event) {
		event.preventDefault();
		$("#newSerial").val("");
		$("#newManufacturerSelect").prop('selectedIndex',0);
		$("#newModel").val("");
		$("#newPONumber").val("");
		$("#newCost").val("");
		$("#newProcessorSelect").prop('selectedIndex',0);
		$("#newClockSpeed").val("");
		$("#newMemorySize").val("");
		$("#newPrimaryDriveSize").val("");
		$("#newWiredEthernetSelect").prop('selectedIndex',0);
		$("#newWirelessEthernetSelect").prop('selectedIndex',0);
		$("#newIPAddress").val("");
		$("#newOpticalSelect").prop('selectedIndex',0);
		$("#newOtherHardware").val("");
	},

	'click .editSave' : function(evt, tmpl) {
		Computers.update(this._id, {$set: {
			serialNumber: $("#"+this._id+"_edit .editSerial").val(),
			manufacturerId: $("#"+this._id+"_edit .editManufacturerSelect").val(),
			model: $("#"+this._id+"_edit .editModel").val(),
			poNumber: $("#"+this._id+"_edit .editPONumber").val(),
			cost: $("#"+this._id+"_edit .editCost").val(),
			processorId: $("#"+this._id+"_edit .editProcessorSelect").val(),
			clockSpeed: $("#"+this._id+"_edit .editClockSpeed").val(),
			memorySize: $("#"+this._id+"_edit .editMemorySize").val(),
			primaryDriveSize: $("#"+this._id+"_edit .editPrimaryDriveSize").val(),
			wiredEthernetSpeed: $("#"+this._id+"_edit .editWiredEthernetSelect").val(),
			wirelessEthernetProtocol: $("#"+this._id+"_edit .editWirelessEthernetSelect").val(),
			ipAddress: $("#"+this._id+"_edit .editIPAddress").val(),
			opticalDrive: $("#"+this._id+"_edit .editOpticalSelect").val(),
			otherHardware: $("#"+this._id+"_edit .editOtherHardware").val()
		}});
		// as long as there are no errors, close the modal (need to add that error checking stuff)
		$("#"+this._id+"_edit").modal('hide');
	}
});
/*
Template.computers.events(okCancelEvents(
	'.edit',
	{
		ok: function (value) {
			switch(Session.get('editingComponent')) {
				case 'serialNumber': 
					Computers.update(this._id, {$set: {serialNumber: value}});
					break;
				case 'manufacturerName':
					Computers.update(this._id, {$set: {manufacturerId: value}});
					break;
				case 'model':
					Computers.update(this._id, {$set: {model: value}});
					break;
				case 'poNumber':
					Computers.update(this._id, {$set: {poNumber: value}});
					break;
				case 'cost':
					Computers.update(this._id, {$set: {cost: value}});
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
*/