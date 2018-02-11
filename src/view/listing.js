var Listing = Backbone.View.extend({
	// Click events to respond to
	events: {
		'click .delete': 'deleteHoliday',
		'click .edit': 'editHoliday',
		'click .cancel': 'cancelUpdate',
		'click .save': 'saveHoliday',
		'click #add': 'addHoliday',
	},
	// Where the applications view will go - make sure this is on your index page
	el: '#app',

	// A template for listing the holidays
	template: _.template($('#listingTemplate').html()),

	// A template for editing a single holiday
	editTemplate: _.template($('#editTemplate').html()),

	/* 
	 * Remove the selected model
	 */
	deleteHoliday: function (e) {
		e.preventDefault();
		// Get the model ID from the DOM
		var myModelId = Number($(e.currentTarget).data('id'));
		// Getting a model from the collection
		this.collection.get(myModelId).destroy();
		// Now that the collection has changed you need to re-render to show only whats left
		this.render();
	},

	/*
	 * Edit an existing holiday
	 */
	editHoliday: function (e){
		e.preventDefault();
		// Getting a model from the collection
		var myModel = this.collection.get(Number($(e.currentTarget).data('id')));
		//Inserting the edit template after the closest row
		$(e.currentTarget).closest('tr').after(this.editTemplate(myModel.toJSON()))
	},

	/* 
	 * Save a holiday
	 * @param {Event} e click event
	 */	
	saveHoliday: function (e) {
		e.preventDefault();
		var myModel, existingModelId, newData;
		
		// Getting the data-id attribute from the DOM
		existingModelId = Number($(e.currentTarget).data('id'));

		// Deciding which model to work with, whether its an existing one or a new one
		if(existingModelId){
			myModel = this.collection.get(existingModelId);
		} else {
			myModel = this.collection.add(new Holiday());
		}

		// getting the information directly from the form
		newData = {
			destination: $('input.destination').val(),
			sites: $('input.sites').val(),
		}

		// Saving the updated information and cleaning up the view
		myModel.set(newData).save().then(function (){
			//Get rid of the edit view once it has been used
			$(e.currentTarget).closest('.editView').remove();
			// Re-render with the edit view gone
			this.render();
		}.bind(this));

	},

	cancelUpdate: function (e) {
		e.preventDefault();
		// Remove the edit view since it's not needed anymore
		$(e.currentTarget).closest('.editView').remove();
		// Re-render with the edit view gone
		this.render();
	},

	/* 
	 * Add a new holiday
	 * @param {Event} e click event
	 */
	addHoliday: function (e){
		e.preventDefault();
		// Insert the edit view with blank model information
		$(e.currentTarget).after('<table>'+ this.editTemplate({		
			'destination': 'Add new destination',
			'sites': 'Add new sites',
			'id': null
		})+ '</table>');
	},

	/* 
	 * Show it on the page
	 */
	render: function () {
		// Clean out the existing list first so you're not adding on top of previous data
		this.$el.find('#list').empty();
		// Loop through all of the models in the collection and display them in the view
 		_.each(this.collection.models, function(model){
      this.$el.find('#list').append(this.template(model.toJSON()))
    }, this);
    // $('.table-listing').DataTable();
	}
});

