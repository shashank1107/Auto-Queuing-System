/**
 *  Custom Validator.
 *  @type {Object}
 *  @property {Object}  customValidators.
 */
var validators = {
  customValidators: {
    isString: function (value) {
      return typeof value === 'string';
    },
    isObject: function (value) {
      return value instanceof Object;
    },
    isArray: function (value) {
      return Array.isArray(value);
    },
    notNull: function (value) {
      return (value !== null);
    }
  }
};

/**
 *  Export validators Object to other modules.
 */
module.exports = validators;
