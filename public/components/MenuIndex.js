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
			<form> <!--action="/filter" method="POST"-->
				<div class="mb-3">
					<label for="exampleFormControlInput1" class="form-label">Name</label>
					<input  v-model="menuItemName" type="text" class="form-control" id="name" placeholder="Burger">
				</div>

					<div id= "v-model-select">
						<select v-model="selectedCourseType" class="mb-3 mw-50 form-select" aria-label="Select course type">
							<option selected>Course Type</option>
							<option value="Entree">Entree</option>
							<option value="Main">Main</option>
							<option value="Dessert">Dessert</option>
						</select>
					</div>

					<div class="mb-3 justify-content-end">
						<label class="form-label">Price:</label>
						<div id="v-model-radiobutton" class="form-check form-check-inline">
							<input class="form-check-input" type="radio" v-model="priceFilter" name="inlineRadioOptions" id="lowHighRadio" value="lowHigh">
							<label class="form-check-label" for="inlineRadio1">Low-High</label>
						</div>
						<div id="v-model-radiobutton" class="form-check form-check-inline">
							<input class="form-check-input" type="radio" v-model="priceFilter" name="inlineRadioOptions" id="highLowRadio" value="highLow">
							<label class="form-check-label" for="inlineRadio2">High-Low</label>
						</div>
					</div>
					<button class="btn btn-primary mx-auto" type="submit" v-on:click="filter">Search</button>
			</form>
		</div>
	</div>
      <menu-item v-if="filteredItems" v-for="filteredItems in menuItems" :key="filteredItems.id" :menuItem="filteredItems" @add-to-cart='addToCart' @remove-from-cart='removeFromCart'></menu-item>
      <menu-item v-else v-for="menuItem in menuItems" :key="menuItem.id" :menuItem="menuItem" @add-to-cart='addToCart' @remove-from-cart='removeFromCart'></menu-item>
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
			filteredItems: [],
			cart: [],
			total: 0.0,
			menuItemName: '',
			selectedCourseType: '',
			priceFilter: '',
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
		filter() {
			//For each item in menuItems 
			//this.filteredItems = menuItems.filter(menuItem => (menuItem.name.localeCompare(this.menuItemName) === 0));
			//this.filteredItems = this.filteredItems.filter(filteredItem => (filteredItem.course.localeCompare(this.selectedCourseType) === 0));
			//this.filteredItems = this.menuItems;
			for (const item of menuItems) {
				filteredItems.push(copy(item));
			}

			if (priceFilter == 'lowHigh') { 
				this.filteredItems.sort(function (a, b) {
				return a.price - b.price;
				});
			} else if (priceFilter == 'Highlow') {
				this.filteredItems.sort(function (a, b) {
					return b.price - a.price;
					});	
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
