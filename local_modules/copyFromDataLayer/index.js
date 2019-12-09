const deepValue = (obj, path) => path.split(".").reduce((a, v) => a[v], obj);

const copyFromDataLayer = key => {
  try {
    return deepValue(dataLayer[0], key);
  } catch {
    return undefined;
  }
};

module.exports = copyFromDataLayer;
