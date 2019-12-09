global.elevar_gtm_errors = [];
global.DUMMY_DATALAYER = {
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
};

data = {
  dataLayerKey: "crazy",
  required: true,
  valueType: "value",
  validationTable: [
    {
      key: "",
      condition: "isType",
      conditionValue: "number",
    },
  ],
};

const vm = require("vm");
const fs = require("fs");

const content = fs.readFileSync("./templates/variable-validation.js");
const test = fs.readFileSync("./template-tests/isValid.js");

const sandbox = vm.createContext({ require, data, assert });

vm.runInContext(content, sandbox);
vm.runInContext(test, sandbox);
