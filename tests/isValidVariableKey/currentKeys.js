const wildCardKeys = ["ecommerce.*"];
const normalKeys = [
  "VariantPrice",
  "VisitorType",
  "orderEmail",
  "CustomerPhone",
  "CustomerLastName",
  "CustomerFirstName",
  "SearchTerms",
  "CustomerEmail",
  "visitorId",
  "visitorType",
  "CustomerId",
  "CustomerOrdersCount",
  "CustomerTotalSpent",
  "pageType",
  "cartTotal",
  "shopifyProductId",
  "VariantCompareAtPrice",
  "cartItems",
  "event",
  "discountTotalAmount",
  "discountTotalSavings",
  "CustomerCity",
  "CustomerZip",
  "CustomerAddress1",
  "CustomerAddress2",
  "CustomerCountryCode",
  "CustomerProvince",
  "CustomerOrdersCount",
];

const allKeys = [...wildCardKeys, ...normalKeys];

module.exports = { allKeys, wildCardKeys, normalKeys };
