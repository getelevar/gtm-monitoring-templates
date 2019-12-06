const errors = [];
const createQueue = key => value => errors.push(value);

module.exports = createQueue;
