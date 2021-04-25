app.component('menu-item', {
	props: {},

	template: /*html*/ `
	<li class="list-group-item bg-transparent border-white">
		<div class="card mb-3 bg-transparent border-0" style="max-width: 540px">
			<div class="row g-0">
				<div class="col-md-4 align-middle">
					<img :src="image" class="pt-3 img-fluid rounded-3"/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<h5 class="card-title">{{name}}</h5>
							<h6 class="card-text">{{price}}</h6>
						</div>
						<p class="card-text">{{description}}</p>
						<div class="d-flex justify-content-end gap-2">
							<button type="button" class="btn btn-sm btn-circle bg-white"><h5>+</h5></button>
							<button type="button" class="btn btn-sm btn-circle bg-white"><h5>-</h5></button>
							
							<input
								type="text"
								class="form-control w-auto max-width-2"
								size="1"
								width="1"
								maxlength="3"
								value="0"
								aria-label="Quantity"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>`,

	data() {
		return {
			name: 'Big Mac',
			price: '$5.00',
			description: 'this is a sample descriotion',
			image: 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Big-Mac.jpg'
		}
	},
	methods: {
		
	}
});
