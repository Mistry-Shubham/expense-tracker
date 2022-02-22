import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLEINT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (data, URL) => {
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: process.env.GMAIL_USER,
				clientId: CLIENT_ID,
				clientSecret: CLEINT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const mailOptions = {
			from: process.env.GMAIL_USER,
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

		const result = await transport.sendMail(mailOptions);
		return result;
	} catch (err) {
		return err;
	}
};

export default sendMail;
