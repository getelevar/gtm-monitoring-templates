const isValidVariableKey = require("./isValidVariableKey");
const { allKeys } = require("./currentKeys");

describe("Valid GTM key", () => {
  test("Matches different basic keys", () => {
    allKeys.map((key) => {
      return expect(isValidVariableKey(key)).toBe(true);
    });
  });

  test("Doesn't match unsupported key", () => {
    return expect(isValidVariableKey("unsupported")).toBe(false);
  });

  test("Doesn't match keys with different end", () => {
    return expect(isValidVariableKey("ecommerceenddifferent")).toBe(false);
  });

  test("Matches after dot in wildcard keys", () => {
    return expect(isValidVariableKey("ecommerce.anything")).toBe(true);
  });

  test("Doesn't match after dot in non wildcards", () => {
    return expect(isValidVariableKey("VariantPrice.subitem")).toBe(false);
  });
});
