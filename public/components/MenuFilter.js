app.component('menu-filter', {
	props: {
		menuItem: {
			type: Object,
		},
	},

    template: /*html*/ ``,
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