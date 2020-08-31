const ERRORS_KEY = "elevar_gtm_errors";
const TAG_INFO = "elevar_gtm_tag_info";

/* --- Test setup --- */

window[ERRORS_KEY] = [];
window[TAG_INFO] = [];

/** Hijack console log and push each item into logs array. */
const logs = [];
const hijackLog = () => {
  const customConsoleLog = function () {
    console.logOld(...arguments);
    logs.push(arguments);
  };

  console.logOld = console.log;
  console.log = customConsoleLog;
};
hijackLog();

/* --- Test utils --- */

const assert = (condition, message) => {
  if (condition && condition.length > 1) {
    condition = condition.every((cond) => cond === true);
  }
  if (condition) {
    console.logOld("--- PIXEL SUCCESS ---");
  } else {
    console.error("--- PIXEL ERROR ---");
    console.assert(condition, message);
  }
};

const findPixel = (params) => {
  const pixels = logs.filter((log) => log[0] === "pixel url = ");
  if (pixels.length) {
    return pixels.some((pixel) => {
      const mySearchParams = new URLSearchParams(new URL(pixel[1]).search);

      for (const [key, value] of Object.entries(params)) {
        if (mySearchParams.get(key) !== value) return false;
      }
      return true;
    });
  }
};

const triggerPixel = () => {
  window["dataLayer"].push({ event: "gtm.timer", ["gtm.uniqueEventId"]: 5000 });
};

/* --- */

let testsRun = 0;
const tests = [];
const checks = [];

const runCurrentTest = () => {
  tests[testsRun]();
};
const runCurrentCheck = () => {
  checks[testsRun]();
  testsRun++;
  return runTests();
};
const runTests = () => {
  if (testsRun > tests.length - 1) return;
  runCurrentTest();
  triggerPixel();
  setTimeout(runCurrentCheck, 2000);
};

const addTest = (test_name, test, check) => {
  tests.push(test);
  checks.push(() => {
    assert(check(), test_name);
  });
};

/* --- */

const rerunTests = () => {
  testsRun = 0;
  runTests();
};

/* --- */

addTest(
  "Has error only",
  () =>
    window[ERRORS_KEY].push({
      eventId: 5000,
      dataLayerKey: "test.dl.key",
      variableName: "VariableName",
      error: {
        message: "dataLayerKey=value condition expected",
        value: "value",
        condition: "condition",
        conditionValue: "expected",
      },
    }),
  () =>
    findPixel({
      vc: "1.0",
      dlKey: "test.dl.key",
      dlValue: "value",
      variable_name: "VariableName",
      cond: "condition",
      condValue: "expected",
    })
);

addTest(
  "Error value is undefined",
  () =>
    window[ERRORS_KEY].push({
      eventId: 5000,
      dataLayerKey: "test.dl.key",
      variableName: "VariableName",
      error: {
        message: "dataLayerKey=value condition expected",
        condition: "condition",
        conditionValue: "expected",
      },
    }),
  () =>
    findPixel({
      vc: "1.0",
      dlKey: "test.dl.key",
      dlValue: "undefined",
      variable_name: "VariableName",
      cond: "condition",
      condValue: "expected",
    })
);

addTest(
  "Multiple tags = multiple pixels",
  () => {
    window[ERRORS_KEY] = [
      {
        eventId: 5000,
        dataLayerKey: "first.variable",
        variableName: "VariableName",
        error: {
          message: "dataLayerKey=value condition expected",
          condition: "condition",
          conditionValue: "expected",
        },
      },
    ];

    window[TAG_INFO] = [
      {
        eventId: 5000,
        channel: "facebook",
        tagName: "tag 1",
        variables: ["VariableName"],
      },
      {
        eventId: 5000,
        channel: "snapchat",
        tagName: "tag 2",
        variables: ["VariableName"],
      },
    ];
  },
  () => [
    findPixel({
      dlKey: "first.variable",
      variable_name: "VariableName",
      tag_names: "tag 1",
      channels: "facebook",
    }),
    findPixel({
      dlKey: "first.variable",
      variable_name: "VariableName",
      tag_names: "tag 2",
      channels: "snapchat",
    }),
  ]
);

/* --- */

runTests();
