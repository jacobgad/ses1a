const nodemailer = require('nodemailer');

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
		text: `http://localhost:3000/reset/${token}`, // plain text body
		//html: '<b>Hello world?</b>', // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
