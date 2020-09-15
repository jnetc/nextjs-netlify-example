const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async function sendgrid(event, context) {
  const data = JSON.parse(event.body);
  const { email, message } = data;

  const content = {
    to: process.env.SEND_TO,
    from: email,
    subject: `New Message From - ${email}`,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(content);
    return {
      statusCode: 200,
      body: 'Message sent successfully.',
    };
  } catch (error) {
    console.log('ERROR', error);
    return { statusCode: 400, body: 'Message not sent.' };
  }
};
