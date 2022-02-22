import nodemailer from 'nodemailer';

const sendMail = (data, URL) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		auth: {
			user: data.user,
			pass: data.pass,
		},
	});

	const mailOptions = {
		from: data.user,
		to: data.receiver,
		subject: 'Verify Your Email',
		html: `
    <h4>Hello <b>${data.firstName} ${data.lastName}</b>, ${
			data.purpose === 'password-reset' ? '' : 'Thank you for choosing us.'
		}</h4>
    <br />
    <p><b>The link is valid only for ${
			data.purpose === 'password-reset' ? '10' : '30'
		}mins</b></p>
    <br />
    <p>Click on the <a href=${URL}>Link</a> to ${
			data.purpose === 'password-reset'
				? 'Reset your password'
				: 'Verify your account'
		}</p>`,
	};

	return transporter.sendMail(mailOptions);
};

export default sendMail;
