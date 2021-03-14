const nodemailer = require('nodemailer');
const { welcomeMsg, resetPasswordMsg } = require('../public/js/emailTemplates');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: 'smtp.migadu.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS, 
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
		html: welcomeMsg(name), // html body
	});
	console.log('Message sent: %s', info.messageId);
};
