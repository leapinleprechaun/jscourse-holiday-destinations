var holidays, listing; // note: we're defining a bunch of global variables here, which isn't good as a rule, but for learning purposes we'll do it until we get to tooling and setting up a full project

holidays = new Holidays();
listing = new Listing({collection: holidays});

holidays
	.fetch()
	.then(function(){
		listing.render(); 
	});


