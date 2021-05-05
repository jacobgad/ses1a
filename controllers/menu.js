const Menu = require('../models/menuItems');
const { cloudinary } = require('../cloudinary');

module.exports.renderMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.render('menu/index', { menu });
};

module.exports.renderNew = (req, res) => {
	res.render('menu/new', { page: 'menu' });
};

module.exports.createMenuItem = async (req, res) => {
	try {
		const menuItem = new Menu(req.body.menuItem);
		if (req.file) menuItem.image = { url: req.file.path, filename: req.file.filename };
		await menuItem.save();
		res.redirect('/admin/menu');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('back');
	}
};

module.exports.deleteMenuItem = async (req, res) => {
	const { id } = req.body;
	const menuItem = await Menu.findByIdAndDelete(id);
	if (menuItem.image) await cloudinary.uploader.destroy(menuItem.image.filename);
	req.flash('success', 'Successfully deleted account');
	res.redirect('/admin/menu');
};

module.exports.jsonMenu = async (req, res) => {
	const menu = await Menu.find({});
	res.json(menu);
};
