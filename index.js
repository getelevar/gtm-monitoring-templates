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

global.data = {
  dataLayerKey: "crazy.item.0.ok",
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

require("./templates/variable-validation");
