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
class quote {
  constructor(
    symbol,
    latestPrice,
    change,
    changePercent,
    week52High,
    week52Low,
    latestVolume,
    avgTotalVolume,
    companyName
  ) {
    this.symbol = symbol;
    this.latestPrice = latestPrice;
    this.change = change;
    this.changePercent = parseFloat(changePercent * 100).toFixed(3);
    this.week52High = week52High;
    this.week52Low = week52Low;
    this.latestVolume = latestVolume;
    this.avgTotalVolume = avgTotalVolume;
    this.companyName = companyName;
    this.isError = false;
    this.errorMessage = "Error processing your request, please try again";
  }
}

const randomHype = () => {
  randomHypeList = [
    "You're a gift to those around you",
    "You're strong",
    "On a scale from 1 to 10, you're an 11",
    "Your portfolio screams BDE",
    "You make all the women in the room ovulate",
    "I Googled handsome and it was all images of you",
  ];

  randomHype = randomHypeList[Math.floor(Math.random()*randomHypeList.length)];

  return randomHype;
}

exports.prepString = prepString;
exports.tickerHandler = tickerHandler;
exports.prepareYoutubeQueryString = prepareYoutubeQueryString;
exports.quote = quote;
exports.randomHype = randomHype;