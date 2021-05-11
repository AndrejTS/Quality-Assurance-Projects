class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
    for (let i = 0; i < 81; i++) {
      if (!['1','2','3','4','5','6','7','8','9','.',].includes(puzzleString[i])) {
        return false;
      }
    }
    return true;
  }

  fillTheCell(puzzleString, row, column, value) {
    let rowStart = (row.charCodeAt(0) - 65) * 9;
    let index = rowStart + parseInt(column) - 1;
    return puzzleString.substring(0,index) + value + puzzleString.substring(index+1);
  }

  checkRepetition(str) {
    for (let i = 0; i < 9; i++) {
      if (str[i] == '.') {
        continue;
      }
      let cell = new RegExp(str[i], 'g');
      if ((str.match(cell) || []).length > 1) {
        return false;
      }
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    puzzleString = this.fillTheCell(puzzleString, row, column, value);
    let rowStart = (row.charCodeAt(0) - 65) * 9;
    let rowToCheck = puzzleString.substring(rowStart, rowStart+9);
    if (this.checkRepetition(rowToCheck)) {
      return true;
    }
    return false;
  }

  checkColPlacement(puzzleString, row, column, value) {
    puzzleString = this.fillTheCell(puzzleString, row, column, value);
    let colToCheck = '';
    for (let i = 0; i < 9; i++) {
      colToCheck = colToCheck + puzzleString[9*i + parseInt(column) - 1];
    }
    if (this.checkRepetition(colToCheck)) {
      return true;
    }
    return false;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    puzzleString = this.fillTheCell(puzzleString, row, column, value);
    row = row.charCodeAt(0) - 65;
    column = parseInt(column) - 1;
    let region = '';
    let leftUpCorner = 
        (Math.floor(row/3) * 3 * 9) 
      + (Math.floor(column/3) * 3);
    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        region = region + puzzleString[leftUpCorner + i + k*9];
      }
    }
    if (this.checkRepetition(region)) {
      return true;
    }
    return false;
  }

  checkLocationIsSafe(puzzleString, row, column, value) {
    return (
      this.checkRowPlacement(puzzleString, row, column, value)
      && this.checkColPlacement(puzzleString, row, column, value)
      && this.checkRegionPlacement(puzzleString, row, column, value)
    )
  }

  findEmptyLocation(puzzleString) {
    for (let i = 0; i < 81; i++) {
      if (puzzleString[i] == '.') {
        return i;
      }
    }
    return null;
  }

  solve(puzzleString) {
    let emptyLocation = this.findEmptyLocation(puzzleString);
    if (emptyLocation == null) {
      if (this.validate(puzzleString)) {
        return puzzleString;
      }
    }
    let row = String.fromCharCode(Math.floor(emptyLocation/9) + 65);
    let col = emptyLocation % 9 + 1;
    for (let i = 9; i > 0; i--) {
      if (this.checkLocationIsSafe(puzzleString, row, col, i)) {
        puzzleString = this.fillTheCell(puzzleString, row, col, i);
        let solved = this.solve(puzzleString);
        if (solved) {
          return solved;
        }
      }
    }
    return false;
  }

}

module.exports = SudokuSolver;

