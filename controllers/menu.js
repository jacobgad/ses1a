const Menu = require('./../models/menu');

module.exports.renderMenu = async (req, res) => {
	const menu =  await Menu.find({});
    res.render('menu/index', {menu});
};
