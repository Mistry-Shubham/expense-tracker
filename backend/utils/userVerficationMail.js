import nodemailer from 'nodemailer';

const sendMail = (data, URL) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
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
    <h4>Hello <b>${data.firstName} ${data.lastName}</b>, Thank you for choosing us.</h4>
    <br />
    <p><b>The link is valid only for 30mins</b></p>
    <br />
    <p>Click on the <a href=${URL}>Link</a> to Verify your account</p>`,
	};

	return transporter.sendMail(mailOptions);
};

export default sendMail;
