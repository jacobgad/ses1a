const nodemailer = require('nodemailer');
const { welcomeMsg, resetPasswordMsg } = require('../public/js/emailTemplates');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: 'smtp.migadu.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: 'restaurant@gadserver.com', // generated ethereal user
		pass: 'U&vbLZxjRN8^tbKK4mdc', // generated ethereal password
	},
});

module.exports.forgot = async function (email, token) {
	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'restaurant@gadserver.com', // sender address
		to: email, // list of receivers
		subject: 'Restaurant Password Reset', // Subject line
		html: resetPasswordMsg(token), // html body
	});
	console.log('Message sent: %s', info.messageId);
};

module.exports.welcome = async function (email, name) {
	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: 'restaurant@gadserver.com', // sender address
		to: email, // list of receivers
		subject: 'Welcome Restaurant', // Subject line
		html: welcomeTemplate(name), // html body
	});
	console.log('Message sent: %s', info.messageId);
};
