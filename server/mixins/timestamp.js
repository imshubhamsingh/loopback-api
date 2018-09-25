/**
 * Minix for adding timestamp to model instance.
 */
module.exports = function(Model, options) {
  // Model is the model class
  // options is an object containing the config properties from model definition
  Model.defineProperty('createdAt', { type: Date, default: '$now' });
};
