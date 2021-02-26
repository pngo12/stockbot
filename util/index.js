const iex = require("../iex/iex")

const prepString = str => {
    return str.substring(1);
}

const tickerHandler = async symbol => {
  const getTickerInfo = await iex.getTickerInfo(symbol);
  return getTickerInfo;
};

const prepareYoutubeQueryString = str => {
  const queryString =  str.slice(9).replace(/ /g, "+");

  return queryString;
}

exports.prepString = prepString;
exports.tickerHandler = tickerHandler;
exports.prepareYoutubeQueryString = prepareYoutubeQueryString;