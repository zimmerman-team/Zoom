const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const postmark = require('postmark');

/* general */
const general = require('./generalResponse');

dotenv.config();

const client = new postmark.ServerClient(
  process.env.REACT_APP_POSTMARK_CLIENT_ID
);

const EmailController = {
  sendMail: (req, res) => {
    const { name, surname, email, link } = req.query;
    return client
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
      .then(response => res.json(response))
      .catch(error => {
        general.handleError(res, error);
      });
  }
};

module.exports = EmailController;
