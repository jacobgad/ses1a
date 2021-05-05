const Menu = require('../models/menuItems');

module.exports.renderMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.render('menu/index', { menu });
};

module.exports.renderNew = (req, res) => {
	res.render('menu/new');
};

module.exports.createMenuItem = async (req, res) => {
	const menuItem = new Menu(req.body.menuItem);
	await menuItem.save();
	res.redirect('/admin')
};

module.exports.jsonMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.json(menu);
};
