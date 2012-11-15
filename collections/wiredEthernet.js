/*
Wired Ethernet: used for populating drop-down menus
	name: Should be unique
	position: The sorting order for the list (Since I'd like to use both Mb/s and Gb/s...a simple sort on name won't work.)
*/
WiredEthernets = new Meteor.Collection("wired_ethernets");