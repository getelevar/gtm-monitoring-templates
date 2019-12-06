// Required Modules
const log = require("logToConsole");
const getType = require("getType");
const readFromDataLayer = require("copyFromDataLayer");
const createQueue = require("createQueue");

/* ------------------- CUSTOM SETUP --------------------- */

const deepValue = (obj, path) => path.split(".").reduce((a, v) => a[v], obj);

/* ------------------------------------------------------ */

const addValidationError = createQueue("elevar_gtm_errors");

/**
Function to add new error to validation_errors

@params
message - error message
error_id - id that can be used to identify errors
*/
const addError = (eventId, dataLayerKey) => (value, condition, expected) => {
  log({
    dataLayerKey: dataLayerKey,
    error: {
      value: value,
      condition: condition,
      conditionValue: expected,
    },
  });

  addValidationError({
    eventId: eventId,
    dataLayerKey: dataLayerKey,
    error: {
      message: dataLayerKey + "=" + value + " " + condition + " " + expected,
      value: value,
      condition: condition,
      conditionValue: expected,
    },
  });
};

const newError = addError(data.gtmEventId, data.dataLayerKey);

const isValid = (value, condition, expectedValue) => {
  switch (condition) {
    case "equals":
      if (value !== expectedValue) {
        return false;
      }
      return true;

    case "contains":
      if (value.indexOf(expectedValue) === -1) {
        return false;
      }
      return true;

    case "startsWith":
      if (!value.startsWith(expectedValue)) {
        return false;
      }
      return true;

    case "endsWith":
      if (!value.endsWith(expectedValue)) {
        return false;
      }
      return true;

    case "notEqual":
      if (expectedValue === "undefined") {
        if (value === undefined) {
          return false;
        }
      } else if (value === expectedValue) {
        return false;
      }
      return true;

    case "notContain":
      if (value.indexOf(expectedValue) > -1) {
        return false;
      }
      return true;

    case "notStartWith":
      if (value.startsWith(expectedValue)) {
        return false;
      }
      return true;

    case "notEndWith":
      if (value.endsWith(expectedValue)) {
        return false;
      }
      return true;

    case "hasLengthOf":
      if (value.length !== expectedValue) {
        return false;
      }
      return true;

    case "isType":
      if (getType(value) !== expectedValue) {
        return false;
      }
      return true;

    case "notType":
      if (getType(value) === expectedValue) {
        return false;
      }
      return true;

    default:
      return false;
  }
};

// value type === value
// whole table is about one value (ignore keys)
const validateValue = (value, table) => {
  for (let i = 0; i < table.length; i++) {
    if (!isValid(value, table[i].condition, table[i].conditionValue)) {
      newError(value, table[i].condition, table[i].conditionValue);
    }
  }
};

const getDataLayerValue = key => {
  if (key.indexOf(".0") !== -1) {
    const split = key.split(".0");

    const initialValue = readFromDataLayer(split[0]);
    if (!initialValue) return initialValue;

    const value = split.slice(1).reduce((a, v) => {
      if (getType(a) !== "array") return undefined;
      if (!v) return a[0];
      return deepValue(a[0], v.slice(1));
    }, initialValue);
    return value;
  }
  return readFromDataLayer(key);
};

log(getDataLayerValue("crazy.item.0.wow.0.no.0"));

// value type === object
// for each row in table look for key and validate
const validateObject = (item, table) => {
  for (let i = 0; i < table.length; i++) {
    if (
      !isValid(item[table[i].key], table[i].condition, table[i].conditionValue)
    ) {
      newError(item[table[i].key], table[i].condition, table[i].conditionValue);
    }
  }
};

// value type === array
// for each item in array run validation
const validateArray = (arr, table) => {
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") {
      validateObject(arr[i], table);
    } else {
      validateValue(arr[i], table);
    }
  }
};

const validationTable = data.validationTable;
const valueType = data.valueType;
const dataLayerValue = readFromDataLayer(data.dataLayerKey);

// Don't validate if item is undefined
// But add error if item is required
if (typeof dataLayerValue === "undefined") {
  if (data.required === true) {
    newError(dataLayerValue, "required", "true");
  }
} else {
  switch (valueType) {
    case "value":
      validateValue(dataLayerValue, validationTable);
      break;

    case "object":
      if (getType(dataLayerValue) !== "object") {
        newError(dataLayerValue, "typeOf", "object");
      }
      validateObject(dataLayerValue, validationTable);
      break;

    case "array":
      if (getType(dataLayerValue) !== "array") {
        newError(dataLayerValue, "typeOf", "array");
      }
      validateArray(dataLayerValue, validationTable);
      break;

    default:
      break;
  }
}

log(dataLayerValue);
return dataLayerValue;
