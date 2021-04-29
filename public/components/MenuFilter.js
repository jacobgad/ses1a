app.component('menu-filter', {
	props: {
		menuItem: {
			type: Object,
		},
	},

    template: /*html*/ `
    <form> <!--action="/filter" method="POST"-->
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Name</label>
								<input type="text" class="form-control" id="name" placeholder="Burger">
							</div>

							<select class="mb-3 mw-50 form-select" aria-label="Select course type">
  								<option selected>Course Type</option>
								<option value="1">Entree</option>
								<option value="2">Main</option>
								<option value="3">Dessert</option>
							</select>

							<div class="mb-3 justify-content-end">
								<label class="form-label">Price:</label>
								<div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="inlineRadioOptions" id="lowHighRadio" value="option1">
									<label class="form-check-label" for="inlineRadio1">Low-High</label>
								  </div>
								  <div class="form-check form-check-inline">
									<input class="form-check-input" type="radio" name="inlineRadioOptions" id="highLowRadio" value="option2">
									<label class="form-check-label" for="inlineRadio2">High-Low</label>
								  </div>
							</div>
							<button class="btn btn-primary mx-auto" type="submit" v-on:click="filter">Search</button>
	</form> `,
    data() {
		return {
			name: '',
            courseType:{
                type: String,
                enum: ['Entree', 'Main', 'Dessert'],  
            },
            price: '',


		};
	},
    methods: {
		filter() {
			//If text element is typed - filter by text
			//If course type selected - filter again by course
			//If price radio is selected - Sort by price
			//Item not found - "Sorry no results matched your search"
		},
    },
});