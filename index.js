require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const iex = require("./iex/iex");
const util = require("./util/index");

bot.login(TOKEN);

bot.on('message', async msg => {
  if (msg.content[0].includes("$")) {
    const ticker = util.prepString(msg.content);
    const response = await tickerHandler(ticker);
    msg.reply(`The Symbol you requested is: ${response.symbol}, Last price is ${response.latestPrice}`);
  } else { // Error handling

  }
});

const tickerHandler = async symbol => {
  const getTickerInfo = await iex.getTickerInfo(symbol);
  return getTickerInfo;
};


