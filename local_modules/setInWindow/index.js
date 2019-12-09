const setInWindow = (item, value, override) => {
  if (global[item] !== undefined && !override) return false;
  global[item] = value;
  return true;
};

module.exports = setInWindow;
