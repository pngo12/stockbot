const iex = require("../iex/iex")

const prepString = str => {
    return str.substring(1);
}

const tickerHandler = async symbol => {
  const getTickerInfo = await iex.getTickerInfo(symbol);
  return getTickerInfo;
};

exports.prepString = prepString;
exports.tickerHandler = tickerHandler;