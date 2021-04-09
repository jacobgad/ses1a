const mongoose = require('mongoose');

const MenuItem = require('../models/menuItems');
const seedMenuItems = require('./menuItems');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/restaurant';
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => console.error('Connected to Database'));

const seedDB = async () => {
	await MenuItem.deleteMany({});
	for (menuItem of seedMenuItems) {
		const newMenuItem = new MenuItem({
			name: menuItem.name,
			price: menuItem.price,
			description: menuItem.description,
			imageUrl: menuItem.imageUrl,
		});
		await newMenuItem.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
