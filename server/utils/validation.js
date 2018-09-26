/**
 * @file File contains Validation Helper Methods.
 * @author Shubham Singh
 */

/**
 * Check the age of Customer whether it is more than 16 years old
 * and less than 120 years old.
 * @param  {Function} err - LoopBack error function
 */
function ageCheck(err) {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = Math.abs(today.getFullYear() - birthDate.getFullYear());
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 10 && age > 120) {
    err();
  }
}
/**
 * To get regular expression for various validations
 * @param  {String} option - Options can be email, dob, name, etc.
 * @returns {regexp} regular expression based on option
 */
function regexp(option) {
  switch (option) {
    case 'email':
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    case 'dob':
      return /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    case 'name':
      return /^[a-zA-Z\s]+$/;
    default:
  }
}

module.exports = {
  ageCheck,
  regexp
};
