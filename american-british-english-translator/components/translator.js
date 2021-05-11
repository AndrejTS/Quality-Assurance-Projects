const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishToAmericanTitles = require('./british-to-american-titles');
const britishOnly = require('./british-only.js');

const amerToBrit = {
  ...americanOnly,
  ...americanToBritishTitles,
  ...americanToBritishSpelling,
};

const britToAmer = {
  ...britishOnly,
  ...britishToAmericanTitles,
  ...inverse(americanToBritishSpelling),
};

function inverse(obj) {
  let retobj = {};
  for (let key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
}

class Translator {
  translate(text, locale) {
    let highlighted = text;
    let translationMap = [];
    let timeRegex;
    let dictionary;
    if (locale === 'american-to-british') {
      dictionary = amerToBrit;
      timeRegex = /\d{1,2}:\d{2}/gi;
    } else {
      dictionary = britToAmer;
      timeRegex = /\d{1,2}\.\d{2}/gi;
    }

    for (const item in dictionary) {
      if (RegExp(item, 'gi').test(text)) {
        translationMap.push([item, dictionary[item]]);
      }
    }

    const times = text.match(timeRegex);
    if (times) {
      let translatedTime;
      for (let time of times) {
        if (locale == 'american-to-british') {
          translatedTime = time.replace(':', '.');
        } else {
          translatedTime = time.replace('.', ':');
        }
        translationMap.push([time, translatedTime]);
      }
    }

    for (let elem of translationMap) {
      text = this.replace(text, elem[0], elem[1], false);
      highlighted = this.replace(highlighted, elem[0], elem[1], true);
    }

    return [text, highlighted];
  }

  replace(text, phrase, translation, highlight) {
    const regex = RegExp('\\b' + phrase + '(?![a-z])', 'gi');
    const textWithoutPhrases = text.split(regex);
    let phrases = text.match(regex);

    if (phrases) {
      phrases = phrases.map((phrase) => {
        let translated;
        if (this.checkIsUppercase(phrase)) {
          translated = translation.toUpperCase();
        } else if (this.checkIsCapitalized(phrase)) {
          translated = this.capitalize(translation);
        } else {
          translated = translation;
        }
        if (highlight) {
          return '<span class="highlight">' + translated + '</span>';
        } else {
          return translated;
        }
      });
    }

    return textWithoutPhrases.reduce(
      (acc, curr, index) => acc + phrases[index - 1] + curr
    );
  }

  checkIsUppercase(str) {
    return str == str.toUpperCase();
  }

  checkIsCapitalized(str) {
    return str.charAt(0) == str.charAt(0).toUpperCase();
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = Translator;
