require("dotenv").config();
const fetch = require("node-fetch");
const APIToken = process.env.IEX_TOKEN;

const getTickerInfo = async ticker => {
  if (ticker.length > 0) {
    let response = await fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${APIToken}`
    );
    // const jsonResponse = await response.json().then(data => data);
    let jsonResponse = await response.json();
    return jsonResponse;
    // await fetchData(ticker)
  }
};

// const fetchData = async ticker => {
//     let response = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${APIToken}`);
//     // const jsonResponse = await response.json().then(data => data);
//     let jsonResponse = await response.json();
//     return jsonResponse;
// }

exports.getTickerInfo = getTickerInfo;