module.exports.renderGallery = async (req, res) => {
	const gallery = await Gallery.find({});
	res.render('gallery', { gallery });
};

module.exports.jsonGallery = async (req,res) => {
	const gallery = await Gallery.find({});
	res.json(gallery);
}