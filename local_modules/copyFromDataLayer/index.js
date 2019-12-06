const deepValue = (obj, path) => path.split(".").reduce((a, v) => a[v], obj);

const copyFromDataLayer = key => {
  try {
    return deepValue(DUMMY_DATALAYER, key);
  } catch {
    return undefined;
  }
};

module.exports = copyFromDataLayer;
