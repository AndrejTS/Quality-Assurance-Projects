'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.text === '') {
        res.json({ error: 'No text to translate' });
        return;
      }
      if (!req.body.text || !req.body.locale) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }
      if (req.body.locale != 'american-to-british' && req.body.locale != 'british-to-american') {
        res.json({ error: 'Invalid value for locale field' });
        return;
      }
      let text = req.body.text;
      let locale = req.body.locale;
      let translation = translator.translate(text, locale)[1];
      if (text === translation) {
        translation = "Everything looks good to me!";
      }
      res.json({text, translation});
    });
};
