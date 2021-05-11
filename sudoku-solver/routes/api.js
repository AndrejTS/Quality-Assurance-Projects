'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
        return res.json({ error: 'Required field(s) missing' })
      }
      let puzzle = req.body.puzzle;
      let row = req.body.coordinate[0];
      let col = req.body.coordinate[1];
      let val = req.body.value;
      if (
          !['A','B','C','D','E','F','G','H','I'].includes(row) || 
          !['1','2','3','4','5','6','7','8','9'].includes(col)
          ) {
        return res.json({ error: 'Invalid coordinate'});
      }
      if (!['1','2','3','4','5','6','7','8','9','.'].includes(val)) {
        return res.json({ error: 'Invalid value' });
      }
      if (puzzle.length != 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }
      if (!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      if (!solver.checkLocationIsSafe(puzzle, row, col, val)) {
        let conflictList = [];
        if (!solver.checkRowPlacement(puzzle, row, col, val)) {
          conflictList.push('row');
        }
        if (!solver.checkColPlacement(puzzle, row, col, val)) {
          conflictList.push('column');
        }
        if (!solver.checkRegionPlacement(puzzle, row, col, val)) {
          conflictList.push('region');
        }
        return res.json({ valid: false, conflict: conflictList});
      }
      res.json({ valid: true });
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle; 
      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }
      if (puzzle.length != 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }
      if (!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }
      let solvedPuzzle = solver.solve(puzzle);
      if (!solvedPuzzle) {
        return res.json({ error: 'Puzzle cannot be solved' });
      }
      res.json({ solution: solvedPuzzle});
    });
    
};
