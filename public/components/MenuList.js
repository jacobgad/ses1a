app.component('menu-list', {
	props: {},
	template: /*html*/ `
  <ul class="list-group list-group-flush">
    <li class="list-group-item bg-transparent border-white"><h1>MAIN COURSES</h1></li>
    <menu-item></menu-item>
    <p>{{listTest}}</p>
  </ul>`,

  data() {
    return {
      listTest: 'This is a test from the list component'
    }
  },

});
