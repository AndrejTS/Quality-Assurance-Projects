const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

  test('Logic handles a valid puzzle string of 81 characters', function (done) {
    let sudokuStr = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isTrue(solver.validate(sudokuStr));
    done();
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function (done) {
    let sudokuStr = '1.5..2.84..63.12.7.2..5..n..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    assert.isNotTrue(solver.validate(sudokuStr));
    done();
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function (done) {
    let sudokuStr = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....9914.37.';
    assert.isNotTrue(solver.validate(sudokuStr));
    done();
  });

  test('Logic handles a valid row placement', function (done) {
    let sudokuStr = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    assert.isTrue(solver.checkRowPlacement(sudokuStr, 'E', '5', 8));
    done();
  });

  test('Logic handles an invalid row placement', function (done) {
    let sudokuStr = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    assert.isNotTrue(solver.checkRowPlacement(sudokuStr, 'A', '1', 7));
    done();
  });

  test('Logic handles a valid column placement', function (done) {
    let sudokuStr = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    assert.isTrue(solver.checkColPlacement(sudokuStr, 'H', '9', 2));
    done();
  });

  test('Logic handles an invalid column placement', function (done) {
    let sudokuStr = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    assert.isNotTrue(solver.checkColPlacement(sudokuStr, 'H', '9', 1));
    done();
  });

  test('Logic handles a valid region (3x3 grid) placement', function (done) {
    let sudokuStr = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    assert.isTrue(solver.checkRegionPlacement(sudokuStr, 'H', '9', 9));
    done();
  });

  test('Logic handles an invalid region (3x3 grid) placement', function (done) {
    let sudokuStr = '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51';
    assert.isNotTrue(solver.checkRegionPlacement(sudokuStr, 'C', '8', 8));
    done();
  });

  test('Valid puzzle strings pass the solver', function (done) {
    let sudokuStr = '218396745753284196496157832531672984649831257827549613962415378185763429374928561';
    let sudokuSolution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561';
    assert.equal(solver.solve(sudokuStr), sudokuSolution);
    done();
  });

  test('Invalid puzzle strings fail the solver', function (done) {
    let sudokuStr = '5689137aaa42687519197254386685479231219538467734162895926345178473891652851726943';
    let sudokuSolution = '568913724342687519197254386685479231219538467734162895926345178473891652851726943';
    assert.equal(solver.solve(sudokuStr), false);
    done();
  });

  test('Solver returns the the expected solution for an incomplete puzzle', function (done) {
    let sudokuStr = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6';
    let sudokuSolution = '473891265851726394926345817568913472342687951197254638734162589685479123219538746';
    assert.equal(solver.solve(sudokuStr), sudokuSolution);
    done();
  });

});
