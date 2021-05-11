const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('convertHandler should correctly read a whole number input', function (done) {
    assert.equal(convertHandler.getNum('5l'), 5);
    done();
  });

  test('convertHandler should correctly read a decimal number input', function (done) {
    assert.equal(convertHandler.getNum('5.2l'), 5.2);
    done();
  });

  test('convertHandler should correctly read a fractional input', function (done) {
    assert.equal(convertHandler.getNum('5/2l'), 2.5);
    done();
  });

  test('convertHandler should correctly read a fractional input with a decimal', function (done) {
    assert.equal(convertHandler.getNum('2.5/2l'), 1.25);
    done();
  });

  test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function (done) {
    assert.equal(convertHandler.getNum('3/2/3gal'), 'invalid number');
    done();
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function (done) {
    assert.equal(convertHandler.getNum('km'), 1);
    done();
  });

  test('convertHandler should correctly read each valid input unit', function (done) {
    let input = [
      'l',
      'gal',
      'km',
      'mi',
      'kg',
      'lbs',
      'L',
      'GAL',
      'KM',
      'MI',
      'KG',
      'LBS'
    ];

    let output = [
      'L',
      'gal',
      'km',
      'mi',
      'kg',
      'lbs',
      'L',
      'gal',
      'km',
      'mi',
      'kg',
      'lbs'
    ];

    input.forEach((ele, index) => {
      assert.equal(convertHandler.getUnit(ele), output[index])
    });
    done()
  });

  test('convertHandler should correctly return an error for an invalid input unit', function (done) {
    assert.equal(convertHandler.getUnit('5.2lfdsf'), 'invalid unit');
    done();
  });

  test('convertHandler should return the correct return unit for each valid input unit', function (done) {
    let input = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
    let expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

    input.forEach((ele, index) => {
      assert.equal(convertHandler.getReturnUnit(ele), expected[index]);
    });
    done();
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function (done) {
    let input = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    let expected = ['liters', 'gallons', 'kilometers', 'miles', 'kilograms', 'pounds'];

    input.forEach((ele, index) => {
      assert.equal(convertHandler.spellOutUnit(ele), expected[index]);
    });
    done();
  });

  test('convertHandler should correctly convert gal to L', function (done) {
    assert.equal(convertHandler.convert(4, 'gal'), 15.14164);
    done();
  });

  test('convertHandler should correctly convert L to gal', function (done) {
    assert.equal(convertHandler.convert(3, 'L'), 0.79252);
    done();
  });

  test('convertHandler should correctly convert mi to km', function (done) {
    assert.equal(convertHandler.convert(200, 'mi'), 321.86800);
    done();
  });

  test('convertHandler should correctly convert km to mi', function (done) {
    assert.equal(convertHandler.convert(2.6, 'km'), 1.61557);
    done();
  });

  test('convertHandler should correctly convert lbs to kg', function (done) {
    assert.equal(convertHandler.convert(42.7, 'lbs'), 19.36838);
    done();
  });

  test('convertHandler should correctly convert kg to lbs', function (done) {
    assert.equal(convertHandler.convert(20, 'kg'), 44.09249);
    done();
  });

});

