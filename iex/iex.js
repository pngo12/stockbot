require("dotenv").config();
const fetch = require("node-fetch");
const APIToken = process.env.IEX_TOKEN;

const getTickerInfo = async ticker => {
  if (ticker.length > 0) {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${APIToken}`
    );
    const isError = await Promise.resolve(handleErrors(response.ok));
    if (isError) {
      // Do something
    } else {
      let jsonResponse = await response.json();
      return jsonResponse;
    }
  }
};

const handleErrors = async response => {
  // ACTUALLY handle errors here
  // vs truthy falsy returns
  if (!response) {
    return true;
  } else {
    return false;
  } 
}

exports.getTickerInfo = getTickerInfo;