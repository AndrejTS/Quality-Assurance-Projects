const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
  suite('Translate to British English', function () {
    test('Mangoes are my favorite fruit.', function (done) {
      let actual = translator.translate('Mangoes are my favorite fruit.', 'american-to-british')[0];
      let expected = 'Mangoes are my favourite fruit.';
      assert.equal(actual, expected);
      done();
    });
    test('I ate yogurt for breakfast.', function (done) {
      let actual = translator.translate('I ate yogurt for breakfast.', 'american-to-british')[0];
      let expected = 'I ate yoghurt for breakfast.';
      assert.equal(actual, expected);
      done();
    });
    test("We had a party at my friend's condo.", function (done) {
      let actual = translator.translate("We had a party at my friend's condo.", 'american-to-british')[0];
      let expected = "We had a party at my friend's flat.";
      assert.equal(actual, expected);
      done();
    });
    test('Can you toss this in the trashcan for me?', function (done) {
      let actual = translator.translate('Can you toss this in the trashcan for me?', 'american-to-british')[0];
      let expected = 'Can you toss this in the bin for me?';
      assert.equal(actual, expected);
      done();
    });
    test('The parking lot was full.', function (done) {
      let actual = translator.translate('The parking lot was full.', 'american-to-british')[0];
      let expected = 'The car park was full.';
      assert.equal(actual, expected);
      done();
    });
    test('Like a high tech Rube Goldberg machine.', function (done) {
      let actual = translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british')[0];
      let expected = 'Like a high tech Heath Robinson device.';
      assert.equal(actual, expected);
      done();
    });
    test('To play hooky means to skip class or work.', function (done) {
      let actual = translator.translate('To play hooky means to skip class or work.', 'american-to-british')[0];
      let expected = 'To bunk off means to skip class or work.';
      assert.equal(actual, expected);
      done();
    });
    test('No Mr. Bond, I expect you to die.', function (done) {
      let actual = translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british')[0];
      let expected = 'No Mr Bond, I expect you to die.';
      assert.equal(actual, expected);
      done();
    });
    test('Dr. Grosh will see you now.', function (done) {
      let actual = translator.translate('Dr. Grosh will see you now.', 'american-to-british')[0];
      let expected = 'Dr Grosh will see you now.';
      assert.equal(actual, expected);
      done();
    });
    test('Lunch is at 12:15 today.', function (done) {
      let actual = translator.translate('Lunch is at 12:15 today.', 'american-to-british')[0];
      let expected = 'Lunch is at 12.15 today.';
      assert.equal(actual, expected);
      done();
    });
  });

  suite('Translate to American English', function () {
    test('We watched the footie match for a while.', function (done) {
      let actual = translator.translate('We watched the footie match for a while.', 'british-to-american')[0];
      let expected = 'We watched the soccer match for a while.';
      assert.equal(actual, expected);
      done();
    });
    test('Paracetamol takes up to an hour to work.', function (done) {
      let actual = translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american')[0];
      let expected = 'Tylenol takes up to an hour to work.';
      assert.equal(actual, expected);
      done();
    });
    test('First, caramelise the onions.', function (done) {
      let actual = translator.translate('First, caramelise the onions.', 'british-to-american')[0];
      let expected = 'First, caramelize the onions.';
      assert.equal(actual, expected);
      done();
    });
    test('I spent the bank holiday at the funfair.', function (done) {
      let actual = translator.translate('I spent the bank holiday at the funfair.', 'british-to-american')[0];
      let expected = 'I spent the public holiday at the carnival.';
      assert.equal(actual, expected);
      done();
    });
    test('I had a bicky then went to the chippy.', function (done) {
      let actual = translator.translate('I had a bicky then went to the chippy.', 'british-to-american')[0];
      let expected = 'I had a cookie then went to the fish-and-chip shop.';
      assert.equal(actual, expected);
      done();
    });
    test("I've just got bits and bobs in my bum bag.", function (done) {
      let actual = translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american')[0];
      let expected = "I've just got odds and ends in my fanny pack.";
      assert.equal(actual, expected);
      done();
    });
    test('The car boot sale at Boxted Airfield was called off.', function (done) {
      let actual = translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american')[0];
      let expected = 'The swap meet at Boxted Airfield was called off.';
      assert.equal(actual, expected);
      done();
    });
    test('Have you met Mrs Kalyani?', function (done) {
      let actual = translator.translate('Have you met Mrs Kalyani?', 'british-to-american')[0];
      let expected = 'Have you met Mrs. Kalyani?';
      assert.equal(actual, expected);
      done();
    });
    test("Prof Joyner of King's College, London.", function (done) {
      let actual = translator.translate("Prof Joyner of King's College, London.", 'british-to-american')[0];
      let expected = "Prof. Joyner of King's College, London.";
      assert.equal(actual, expected);
      done();
    });
    test('Tea time is usually around 4 or 4.30.', function (done) {
      let actual = translator.translate('Tea time is usually around 4 or 4.30.', 'british-to-american')[0];
      let expected = 'Tea time is usually around 4 or 4:30.';
      assert.equal(actual, expected);
      done();
    });
  });

  suite('Highlight translation', function () {
    test('Mangoes are my favorite fruit.', function (done) {
      let actual = translator.translate('Mangoes are my favorite fruit.', 'american-to-british')[1];
      let expected = "Mangoes are my <span class=\"highlight\">favourite</span> fruit.";
      assert.equal(actual, expected);
      done();
    });
    test('I ate yogurt for breakfast.', function (done) {
      let actual = translator.translate('I ate yogurt for breakfast.', 'american-to-british')[1];
      let expected = "I ate <span class=\"highlight\">yoghurt</span> for breakfast.";
      assert.equal(actual, expected);
      done();
    });
    test('We watched the footie match for a while.', function (done) {
      let actual = translator.translate('We watched the footie match for a while.', 'british-to-american')[1];
      let expected = "We watched the <span class=\"highlight\">soccer</span> match for a while.";
      assert.equal(actual, expected);
      done();
    });
    test('Paracetamol takes up to an hour to work.', function (done) {
      let actual = translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american')[1];
      let expected = "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.";
      assert.equal(actual, expected);
      done();
    });
  });
});
