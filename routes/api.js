'use strict';
const StockModel = require("../models").Stock;
const fetch = require("node-fetch");

async function getStock(stock) {
  const response = await fetch(
    `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
  );
  const { symbol, latestPrice } = await response .json();
  return { symbol, latestPrice };
}

module.exports = function (app) {
  //https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote

  app.route('/api/stock-prices').get(function async(req, res){
    const { stock, like } = req.query;
    const { symbol, latestPrice } = await getStock(stock);
    if (!symbol) {
      res.json({ stockData: { likes: like ? 1 : 0 } });
      return;
    }    
  });
    
};
