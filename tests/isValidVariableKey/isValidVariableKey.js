const isValidVariableKey = (key) => {
  return new RegExp(
    /(^(ecommerce\..*)$|^(user_properties\..*)$|^(ecommerce|VariantPrice|VisitorType|orderEmail|CustomerPhone|CustomerLastName|CustomerFirstName|SearchTerms|CustomerEmail|visitorId|visitorType|CustomerId|CustomerOrdersCount|CustomerTotalSpent|pageType|cartTotal|shopifyProductId|VariantCompareAtPrice|cartItems|event|discountTotalAmount|discountTotalSavings|CustomerCity|CustomerZip|CustomerAddress1|CustomerAddress2|CustomerCountryCode|CustomerProvince|CustomerOrdersCount|cart_total|event_id)$)/
  ).test(key);
};

module.exports = isValidVariableKey;
