/**
 * @file File contains Methods related to sending of email.
 * @author Shubham Singh
 */

/**
 * Sends mail to Admin using mailGun service
 * @param  {string} message - Message object containing subject, html
 * @param  {Function} cb - Callback function
 */
function sendMailToAdmin(message, cb) {
  const emailConfig = {
    apiKey: process.env.apiKey,
    domain: process.env.domain
  };
  const email = require('mailgun-js')(emailConfig);
  new Promise((resolve, reject) => {
    const data = {
      from: `Mail Gun Task <${emailConfig.domain}>`,
      to: 'test@example.com',
      subject: message.subject,
      html: message.html
    };

    email.messages().send(data, (error, body) => {
      if (error) {
        return reject(error);
      }
      return resolve(cb());
    });
  });
}
/**
 * Generate E-mail template to be send to the Admin
 * @param  {string} email - Email of the new Customer
 * @param  {string} hostName - Machine Host name
 * @param  {string} dob - Date of birth of Customer | Optional
 */
function generateMessageToAdmin(email, hostName, dob = '') {
  return {
    subject: 'New User Joined the Network',
    html: `
             <h1>Hi Admin</h1>
             <h3>New User added to Network! Here’s new user profile informations</h3>
             <hr>
             <p>
               Email: ${email}<br>
               ${dob ? `Date of Birth:${dob}<br>` : ''}
               Machine: ${hostName}
             </p>
             <hr>
             <h6 style="font-size:5px">THIS IS AN AUTOMATED MESSAGE - PLEASE DO NOT REPLY DIRECTLY TO THIS EMAIL</h6>
             `
  };
}
module.exports = { sendMailToAdmin, generateMessageToAdmin };