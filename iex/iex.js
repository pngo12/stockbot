const fetch = require("node-fetch");
const APIToken = process.env.IEX_TOKEN;

const util = require("../util/index");

const getTickerInfo = async ticker => {
  if (ticker.length > 0) {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${APIToken}`
    );

    // let quote = new util.quote();
    const isError = await handleErrors(response.ok);

    if (!response.ok) {
      // Do something
    } else {
      let jsonResponse = await response.json();
      // const {
      //   symbol,
      //   latestPrice,
      //   change,
      //   changePercent,
      //   week52High,
      //   week52Low,
      //   latestVolume,
      //   avgTotalVolume,
      //   companyName,
      // } = jsonResponse;

      // let quote = new util.quote(
      //   symbol,
      //   latestPrice,
      //   change,
      //   changePercent,
      //   week52High,
      //   week52Low,
      //   latestVolume,
      //   avgTotalVolume,
      //   companyName
      // );

      return jsonResponse;
    }
  }
};

const handleErrors = async (response) => {

  if (!response) {
    // quote.isError = true;
    // quote.errorMessage = "Error processing your request, please try again"
  } else {
    return false;
  } 
}

exports.getTickerInfo = getTickerInfo;