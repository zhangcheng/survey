/*
Wireless Ethernet: used for populating drop-down menus
	name: Should be unique
	position: The sorting order for the list (Since we're using protocol names, they're certainly not going to end up sorted in alphabetically.)
*/
WirelessEthernets = new Meteor.Collection("wireless_ethernets");