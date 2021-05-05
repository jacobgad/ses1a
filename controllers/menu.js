const Menu = require('../models/menuItems');

module.exports.renderMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.render('menu/index', { menu });
};

module.exports.renderNew = (req, res) => {
	res.render('menu/new');
};

module.exports.createMenuItem = async (req, res) => {
	try {
	const menuItem = new Menu(req.body.menuItem);
	if (req.body.file) menuItem.image = { url: req.file.path, filename: req.file.filename };
	await menuItem.save();
	res.redirect('/admin');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('back');
	}
};

module.exports.jsonMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.json(menu);
};
