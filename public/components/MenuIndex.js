app.component('menu-index', {
	props: {},
	template: /*html*/ `
  <div class="col-6 mid-opacity text-white">
    <ul class="list-group list-group-flush">
      <li class="list-group-item bg-transparent border-white"><h1>MAIN COURSES</h1></li>
      <menu-item v-for="menuItem in menuItems" :key="menuItem.id" :menuItem="menuItem" @add-to-cart='addToCart'></menu-item>
    </ul>
	</div>
  <div class="col d-flex flex-column lr-opacity pt-5">
    <h2 class="pb-5 border-bottom text-center border-dark">CHECKOUT</h2>
    <ul class="list-group">
      <li class="list-group-item d-flex bg-transparent border-0 justify-content-between">
        <p>{{cart}}</p>
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
      if (!this.cart.some(obj => obj.hasOwnProperty(cartItem.name))) {
        this.cart.push(cartItem);
      } else {
        const index = this.cart.findIndex(cartItem);
        this.cart[index].quant += 1;
      }
		},
	},
	created() {
		axios
			.get('http://localhost:3000/menu/json')
			.then((response) => {
				this.menuItems = response.data;
			})
			.catch((error) => {
				console.log(error);
			});
	},
});
