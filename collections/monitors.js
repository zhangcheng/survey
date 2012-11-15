/*
Monitors: Monitors that will be associated with the various Stations
	serialNumber: the serial number as assigned by manufacturer
	manufacturerId: the id of the associated manufacturer
	model: model number as assigned by manufacturer
	poNumber: text field for PO
	cost: currency amount
	size: The monitor's screen size
*/
Monitors = new Meteor.Collection("monitors");