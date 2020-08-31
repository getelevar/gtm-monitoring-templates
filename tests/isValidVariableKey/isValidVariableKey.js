const isValidVariableKey = (key) => {
  return new RegExp(
    /(^(ecommerce\..*)$|^(ecommerce|VariantPrice|VisitorType|orderEmail|CustomerPhone|CustomerLastName|CustomerFirstName|SearchTerms|CustomerEmail|visitorId|visitorType|CustomerId|CustomerOrdersCount|CustomerTotalSpent|pageType|cartTotal|shopifyProductId|VariantCompareAtPrice|cartItems|event|discountTotalAmount|discountTotalSavings|CustomerCity|CustomerZip|CustomerAddress1|CustomerAddress2|CustomerCountryCode|CustomerProvince|CustomerOrdersCount)$)/
  ).test(key);
};

module.exports = isValidVariableKey;
