import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendMail = async (data, URL) => {
	try {
		const { GMAIL_APP_PASS, GMAIL_USER } = process.env;

		const transport = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: GMAIL_USER,
				pass: GMAIL_APP_PASS,
			},
		});

		const mailOptions = {
			from: `Expense Tracker <${process.env.GMAIL_USER}>`,
			to: data.receiver,
			subject:
				data.purpose === 'password-reset'
					? 'Expense Tracker paassword reset'
					: 'Expense Tracker email verification',
			text:
				data.purpose === 'password-reset'
					? `Hello ${data.firstName} ${data.lastName},\n\nThis link is valid only for 10 mins.\n\nUse this url to verify your account - ${URL}`
					: `Hello ${data.firstName} ${data.lastName}, Thank you for choosing us.\n\nThis link is valid only for 30 mins.\n\nUse this url to verify your account for password reset - ${URL}`,
			html:
				data.purpose === 'password-reset'
					? `<html><h3>Hello ${data.firstName} ${data.lastName},</h3>
			<h4>This link is valid only for 10 mins.</h4>
			<p><a href=${URL} >Click here to verify your email for password reset.</a></p></html>`
					: `<html><h3>Hello ${data.firstName} ${data.lastName}, Thank you for choosing us.</h3>
			<h4>This link is valid only for 30 mins.</h4>
			<p><a href=${URL} >Click here to verify your email.</a></p></html>`,
		};

		const result = await new Promise((resolve, reject) => {
			transport.sendMail(mailOptions, (err, info) => {
				if (err) {
					console.error(err);
					reject(err);
				} else {
					resolve(info);
				}
			});
		});
		return result;
	} catch (err) {
		return err;
	}
};

export default sendMail;
