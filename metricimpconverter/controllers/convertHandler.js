function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let i = 0;
    while (i < input.length) {
      let char = input[i];
      if (char.toLowerCase() != char.toUpperCase()) {
        result = input.slice(0, i);
        break;
      }
      i++;
    }
    if (result.includes('/')) {
      let values = result.split('/');
      if (values.length != 2) {
        return 'invalid number';
      }
      result = values[0] / values[1];
    }
    if (!result) {
      result = '1';
    }
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result;
    let i = 0;
    while (i < input.length) {
      let char = input[i];
      if (char.toLowerCase() != char.toUpperCase()) {
        result = input.slice(i);
        break;
      }
      i++;
    }
    if (result.toLowerCase() === 'l') {
      return result.toUpperCase();
    }
    if (!['gal','mi','km','lbs','kg'].includes(result.toLowerCase())) {
      return 'invalid unit';
    }
    return result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'L';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';
      case 'L':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }
    return (Math.round(result * 100000) / 100000)
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
