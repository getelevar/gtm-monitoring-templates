const test = (value, condition, expected, bool) => {
  assert(
    isValid(value, condition, expected) === bool,
    `ERROR: ${value} ${condition} ${expected} = ${bool}`,
  );
};

test("ok", "isType", "string", true);
test("ok", "isType", "number", false);
test("ok", "isType", "array", false);
test("ok", "isType", "object", false);

test(50, "isType", "string", false);
test(50, "isType", "number", true);
test(50, "isType", "array", false);
test(50, "isType", "object", false);

test({}, "isType", "string", false);
test({}, "isType", "number", false);
test({}, "isType", "array", false);
test({}, "isType", "object", true);

test([], "isType", "string", false);
test([], "isType", "number", false);
test([], "isType", "array", true);
test([], "isType", "object", false);

test("hellojello", "contains", "loje", true);
test("hello jello", "contains", "loje", false);
