/*
	Router code.
*/
MyRouter = ReactiveRouter.extend({
  routes: {
  	'': 'home',
  	'stations' : 'stations',
  	'computers' : 'computers',
  	'monitors' : 'monitors',
  	'printers' : 'printers',
  	'locations' : 'locations',
  	'manufacturers' : 'manufacturers',
  	'processors' : 'processors',
  	'opticalDrives' : 'opticalDrives',
  	'users' : 'users',
  	'options' : 'options',
    'screenSizes' : 'screenSizes',
    'wiredEthernet' : 'wiredEthernet',
    'wirelessEthernet' : 'wirelessEthernet',
    'programs' : 'programs'
  },
  home: function() { this.goto('home'); },
  stations: function() { this.goto('stations'); },
  computers: function() { this.goto('computers'); },
  monitors: function() { this.goto('monitors'); },
  printers: function() { this.goto('printers'); },
  locations: function() { this.goto('locations'); },
  manufacturers: function() { this.goto('manufacturers'); },
  processors: function() { this.goto('processors'); },
  opticalDrives: function() { this.goto('opticalDrives'); },
  users: function() { this.goto('users'); },
  options: function() { this.goto('options'); },
  screenSizes: function() { this.goto('screenSizes'); },
  wiredEthernet: function() { this.goto('wiredEthernet'); },
  wirelessEthernet: function() { this.goto('wirelessEthernet'); },
  programs: function() { this.goto('programs'); }
});

Router = new MyRouter();
Meteor.startup(function() {
  Backbone.history.start({pushState: true});
});


/*
	Code to add the 'active' class to the the navigation link of the current page.
*/
Template.menu.active_navlink = function() {
	var url = window.location;
	var anchor = $('ul.nav a').filter(function() {
		return this.href == url;
	});//.parent().addClass('active');
	var topMenu;
	if(anchor.attr("tabindex") == "-1")
		topMenu = anchor.parent().parent().parent();
	else
		topMenu = anchor.parent();
	topMenu.addClass('active');
};


/*
	Start the active_navlink function on completed load.
*/
Meteor.startup(function () {
	Template.menu.active_navlink();
});

/*
  Make the Company Name available to the main page.
*/
Template.main.companyName = function () {
  var o = Options.findOne({key: "companyName"});
  if(o && o.value)
    return o.value
};
