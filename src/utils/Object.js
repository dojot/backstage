/**
 * Transform object keys using a function
 *
 * @param {object} object Any object with any size
 * @param {Function} transformKeys Function to transform keys. (key: string) => key.toLowerCase()
 * @param {object} options Options
 * @param {object} options.recursive Transform keys of nested objects
 * @returns {object} The same object with transformed keys
 */
export const getObjectWithNewKeys = (object, transformKeys, options = { recursive: true }) => {
  const isNotObject = typeof object !== 'object';
  if (!object || isNotObject || !transformKeys) return object;

  const formattedObject = {};

  Object.entries(object).forEach(([key, value]) => {
    const isObject = typeof value === 'object';
    const canChangeKeysOfNestedObject = isObject && options.recursive;

    const newKey = transformKeys(key);
    const newValue = canChangeKeysOfNestedObject
      ? getObjectWithNewKeys(value, transformKeys, options)
      : value;

    formattedObject[newKey] = newValue;
  });

  return formattedObject;
};

