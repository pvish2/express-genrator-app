require('./card.js');


module.exports = function(){

/* Check limit should not be less than 0 */
  this.isValidLimit = function(value)  {
    if (value < 0) return false;
    return true;
  }
  
  /* Takes a credit card string value and returns true on valid number */
  this.isValidCreditCard  = function(value) {
    //Accept only 10 digits
    if (value.length != 10) return false;
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;
    // The Luhn Algorithm. 
    let nCheck = 0,
      bEven = false;
    value = value.replace(/\D/g, "");
    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);
      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;
      nCheck += nDigit;
      bEven = !bEven;
    }
    return nCheck % 10 == 0;
  }

};