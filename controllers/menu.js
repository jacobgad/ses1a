const Menu = require('../models/menuItems');

module.exports.renderMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.render('menu/index', { menu });
};

module.exports.jsonMenu = async (req,res) => {
	const menu = await Menu.find({});
	res.json(menu);
}