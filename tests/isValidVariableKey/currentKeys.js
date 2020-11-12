const wildCardKeys = ["ecommerce.*", "user_properties.*"];
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
  "cart_total",
];

const allKeys = [...wildCardKeys, ...normalKeys];

module.exports = { allKeys, wildCardKeys, normalKeys };
