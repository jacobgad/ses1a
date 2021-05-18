module.exports.renderGallery = async (req, res) => {
	//const gallery = await Gallery.find({});
	const gallery = {};
	res.render('gallery', { gallery });
};

module.exports.jsonGallery = async (req,res) => {
	//const gallery = await Gallery.find({});
	const gallery = {};
	res.json(gallery);
}