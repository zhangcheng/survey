/*
Programs: Available software that can be associated with the computers
		name: name of the software, does not need to be unique
		manufacturerId: the id of the associated manufacturer
		version: the version number (duh!)
		position: I believe this would benefit greatly from a position field, since certain software will be used most.
*/
Programs = new Meteor.Collection("programs");