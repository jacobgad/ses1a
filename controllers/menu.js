const Menu = require('../models/menuItems');

module.exports.renderMenu = async (req, res) => {
	const menu =  await Menu.find({});
    res.render('menu/index', {menu});
};
