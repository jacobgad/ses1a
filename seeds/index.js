const mongoose = require('mongoose');

const MenuItem = require('../models/menuItems');
const seedMenuItems = require('./menuItems');
const Table = require('../models/Table')
const seedTables = require('./table');

const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/restaurant';
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
		const { name, description, image, price, course } = menuItem;
		const newMenuItem = new MenuItem({ name, description, image, price, course});
		await newMenuItem.save();
	}
	await Table.deleteMany({});
	for (table of seedTables ) {
		const { id, seating } = table;
		const newTable = new Table({id, seating});
		await newTable.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
