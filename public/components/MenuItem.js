app.component('menu-item', {
	props: {
		menuItem: {
			type: Object,
		},
	},

	template: /*html*/ `
	<li class="list-group-item bg-transparent border-white">
		<div class="card mb-3 bg-transparent border-0" style="max-width: 540px">
			<div class="row g-0">
				<div class="col-md-4 align-middle">
					<img :src="menuItem.image.url" class="pt-3 img-fluid rounded-3"/>
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<h5 class="card-title">{{menuItem.name}}</h5>
							<h6 class="card-text">{{menuItem.price}}</h6>
						</div>
						<p class="card-text">{{menuItem.description}}</p>
						<div class="d-flex justify-content-end gap-2">
							<button type="button" class="btn btn-sm btn-circle bg-white" v-on:click="incQuant"><h5>+</h5></button>
							<button type="button" class="btn btn-sm btn-circle bg-white" v-on:click="decQuant"><h5>-</h5></button>
							<input
								type="text"
								class="form-control w-auto max-width-2"
								size="1"
								width="1"
								maxlength="3"
								:value="quant"
								aria-label="Quantity"
								disabled
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>`,

	data() {
		return {
			quant: 0,
		};
	},
	methods: {
		incQuant() {
			this.quant++;
			const cartItem = {
				name: this.menuItem.name,
				quant: this.quant,
				price: this.menuItem.price,
			};
			this.$emit('add-to-cart', cartItem);
		},
		decQuant() {
			if (this.quant > 0) this.quant--;
			this.$emit('remove-from-cart', this.menuItem.name)
		},
	},
});
