/**
 * Minix for exposing various HTTP verbs for a Model based on input parameter
 * @param  {Object} Model - The Model object
 * @param  {Array} methods - List of HTTP verbs to expose
 */
module.exports = function(Model, { methods }) {
  let allMethods = [
    'find',
    'findById',
    'findOne',
    'confirm',
    'count',
    'exists',
    'create',
    'upsert',
    'deleteById',
    'updateAll',
    'prototype.updateAttributes',
    'createChangeStream',
    'replaceById',
    'replaceOrCreate',
    'upsertWithWhere'
  ];
  methods.forEach(value => {
    allMethods.splice(allMethods.indexOf(value), 1);
  });
  allMethods.forEach(methodName => {
    Model.disableRemoteMethodByName(methodName, true);
  });
};
