/*
Computers: Computers that will be associated with the various Stations
	serialNumber: the serial number as assigned by manufacturer
	manufacturerId: the id of the associated manufacturer
	model: model number as assigned by manufacturer
	poNumber: text field for PO
	cost: currency amount
	processorId: the id of the associtead Processor
	clockSpeed: number in GHz
	memorySize: number in GB
	primaryDriveSize: number in GB
	wiredEthernetSpeed: number in Mb/s
	wirelessEthernetProtocol: the protocol in use (maybe should also have a corresponding drop-down table?)
	ipAddress: the static/assigned-DHCP IP of the computer (maybe just type DHCP if using a random DHCP?)
	opticalDrive: the name of the associated OpticalDrive (no need to store the ID on this one)
	otherHardware: general text area for additional hardware information

	installedPrograms: (Array) Used to keep track of Programs that are installed, and their associated serial numbers
		programId: the id of the associated program
		serialNumber: license key or serial number
*/
Computers = new Meteor.Collection("computers");