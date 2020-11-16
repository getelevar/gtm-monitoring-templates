const isValidVariableKey = require("./isValidVariableKey");
const { allKeys } = require("./currentKeys");

describe("Valid GTM key", () => {
  test("Matches different basic keys", () => {
    allKeys.map((key) => {
      expect(isValidVariableKey(key)).toBe(true);
    });
  });

  test("Doesn't match unsupported key", () => {
    expect(isValidVariableKey("unsupported")).toBe(false);
  });

  test("Doesn't match keys with different end", () => {
    expect(isValidVariableKey("ecommerceenddifferent")).toBe(false);
  });

  test("Matches after dot in wildcard keys", () => {
    expect(isValidVariableKey("ecommerce.anything")).toBe(true);
    expect(isValidVariableKey("user_properties.anything")).toBe(true);
  });
  

  test("Doesn't match after dot in non wildcards", () => {
    expect(isValidVariableKey("VariantPrice.subitem")).toBe(false);
  });
});
