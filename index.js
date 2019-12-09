global.elevar_gtm_errors = [];
global.cookies = {};
global.eventCallbacks = [];
global.dataLayer = [
  {
    test_string: "random",
    test_number: 90,
    test_object: { value: 10, name: "bob" },
    test_null: null,
    ecommerce: {
      detail: {
        product: [{ id: "cool" }],
      },
    },
    crazy: {
      item: [
        {
          ok: "cool",
          wow: [
            {
              yo: "ok",
              no: ["hey"],
            },
          ],
          arr: [[{ cool: "item" }]],
        },
      ],
    },
  },
];

data = {
  dataLayerKey: "crazy",
  required: true,
  valueType: "value",
  validationTable: [
    {
      key: "",
      condition: "isType",
      conditionValue: "array",
    },
  ],
  gtmOnSuccess: () => {
    eventCallbacks.forEach(callback => callback("container-id-1"));
  },
};

const vm = require("vm");
const fs = require("fs");
const assert = require("assert");

const validation = fs.readFileSync("./templates/variable-validation.js");
const testIsValid = fs.readFileSync("./template-tests/isValid.js");

const sandbox = vm.createContext({ require, data, assert });

vm.runInContext(validation, sandbox);
vm.runInContext(testIsValid, sandbox);

/* ---------------------------------------- */

const monitor = fs.readFileSync("./templates/validation-error-sending.js");

const sandbox2 = vm.createContext({ require, data, assert });

vm.runInContext(monitor, sandbox2);
