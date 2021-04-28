app.component('menu-index', {
	props: {},
	template: /*html*/ `
  <div class="col-6 mid-opacity text-white vh-100 overflow-auto">
    <ul class="list-group list-group-flush">
      <li class="list-group-item bg-transparent border-white"><h1>MAIN COURSES</h1></li>
	  <p>
					<button class="btn btn-light mt-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
					  Filter Items
					</button>
				  </p>
				  <div class="collapse" id="collapseExample">
					<div class="card card-body text-dark lr-opacity">
						<form action="/filter" method="POST">
							<div class="mb-3">
								<label for="exampleFormControlInput1" class="form-label">Name</label>
								<input type="text" class="form-control" id="name" placeholder="Burger">
							</div>

							<div class="mb-3 dropdown">
								<!--label for="exampleFormControlInput1" class="form-label">Course Type</label-->
								<!--input type="text" class="form-control" id="description" placeholder="Entree"-->
								<button class="btn btn-secondary dropdown-toggle" type="button" id="coursetypeDropdown" data-bs-toggle="dropdown" aria-expanded="false">
									Course Type
								</button>
								<ul class="dropdown-menu" aria-labelledby="coursetypeDropdown">
									<li><a class="dropdown-item" href="#">Entree</a></li>
									<li><a class="dropdown-item" href="#">Main</a></li>
									<li><a class="dropdown-item" href="#">Dessert</a></li>
								  </ul>
							</div>

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
							<button class="btn btn-primary mx-auto" type="submit">Search</button>
						</form>
					</div>
				  </div>
      <menu-item v-for="menuItem in menuItems" :key="menuItem.id" :menuItem="menuItem" @add-to-cart='addToCart' @remove-from-cart='removeFromCart'></menu-item>
    </ul>
	</div>
  <div class="col d-flex flex-column lr-opacity pt-5">
    <h2 class="pb-5 border-bottom text-center border-dark">CHECKOUT</h2>
    <ul class="list-group">
		<li v-for="cartItem in cart" :key="cartItem.name" class="list-group-item d-flex bg-transparent border-0 justify-content-between">
			{{cartItem.name}} ( X{{cartItem.quant}} )
		</li>
      <li class="list-group-item d-flex bg-transparent border-0 justify-content-between">
      </li>
    </ul>
    <div class="pb-3 pt-3 d-grid gap-2 mt-auto border-top border-dark">
      <button type="button" class="btn btn-info text-white border-dark">PAY $ {{total}}</button>
    </div>
  </div>`,

	data() {
		return {
			menuItems: [],
			cart: [],
			total: 0.0,
		};
	},
	methods: {
		addToCart(cartItem) {
			for (let i in this.cart) {
				if (this.cart[i].name == cartItem.name) {
					this.cart[i].quant++;
					this.total += cartItem.price;
					return;
				}
			}
			this.cart.push(cartItem);
			this.total += cartItem.price;
		},
		removeFromCart(itemName) {
			for (let i in this.cart) {
				if (this.cart[i].name == itemName) {
					this.cart[i].quant--;
					this.total -= this.cart[i].price;
					if (this.cart[i].quant === 0) this.cart.splice(i, 1);
				}
			}
		},
	},
	created() {
		axios
			.get('/menu/json')
			.then((response) => {
				this.menuItems = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
});
