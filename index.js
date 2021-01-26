require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const iex = require("./iex/iex");
const util = require("./util/index");

bot.login(TOKEN);

bot.on("message", async (msg) => {
  if (msg.content[0].includes("$")) {
    const ticker = util.prepString(msg.content);
    const response = await tickerHandler(ticker);

    const {
      latestPrice,
      change,
      changePercent,
      week52High,
      week52Low,
      extendedPrice,
    } = response;

    msg.reply(
      `
    ***${symbol}***
    Latest Price: ${latestPrice}
    Change Amount: ${change}
    Change Percent: ${changePercent * 100}
    52wk High: ${week52High}
    52wk Low: ${week52Low}
    After Hours Price: ${extendedPrice || "Not Available"}
    `
    );
  }
});

// Uncomment to pull quote in terminal
// bot.on('ready', async () => {

//   const response = await tickerHandler('aapl');

//   const {
//     latestPrice,
//     change,
//     changePercent,
//     week52High,
//     week52Low,
//     extendedPrice,
//   } = response;

//     console.log(`
//     ***${symbol}***
//     Latest Price: ${latestPrice}
//     Change Amount: ${change || null}
//     Change Percent: ${changePercent * 100}
//     52wk High: ${week52High}
//     52wk Low: ${week52Low}
//     After Hours Price: ${extendedPrice || "Not Available"}
//     `);
// });

const tickerHandler = async (symbol) => {
  const getTickerInfo = await iex.getTickerInfo(symbol);
  return getTickerInfo;
};
