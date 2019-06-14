const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const postmark = require('postmark');

dotenv.config();

const client = new postmark.ServerClient(
  process.env.REACT_APP_POSTMARK_CLIENT_ID
);

module.exports = {
  sendMail: (name, surname, email, link) => {
    client
      .sendEmailWithTemplate({
        TemplateId: 10981638,
        From: 'zoom@zimmermanzimmerman.nl',
        To: email,
        TemplateModel: { name, surname, link },
        Attachments: [
          {
            Content: fs
              .readFileSync(
                path.resolve(
                  __dirname,
                  '../../src/app/assets/images/zoom_logo.png'
                )
              )
              .toString('base64'),
            Name: 'zoom_logo.png',
            ContentType: 'image/png',
            ContentID: 'cid:zoom_logo.png'
          }
        ]
      })
      .then(response => response)
      .catch(error => {
        return error;
      });
  }
};
