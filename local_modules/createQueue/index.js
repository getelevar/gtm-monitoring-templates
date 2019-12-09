const createQueue = obj => value => global[obj].push(value);

module.exports = createQueue;
