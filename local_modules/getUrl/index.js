const getUrl = type => {
  switch (type) {
    case "path":
      return "/product/shoes";
    default:
      return "https://www.shop.com/product/shoes";
  }
};

module.exports = getUrl;
