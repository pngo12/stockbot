require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const cron = require("node-cron");
// const TOKEN = process.env.TOKEN;
// bot.login(TOKEN);

const util = require("./util/index");


const scheduleSPYSummaryOpen = async () => {
  cron.schedule("30 6 * * Monday-Friday", () => {
    const response = await util.tickerHandler("$SPY");
    const { latestPrice, previousClose, ytdChange } = response;

    bot.channels.cache.get(process.env.CHANNEL_ID).send(
      ` GOOD MORNING BULLS
        ***SPY***
        Open: ${latestPrice}
        Previous Close: ${previousClose}
        YTD Change: ${parseFloat(ytdChange * 100).toFixed(3)}
      `
    );
  });
};

const scheduleSPYSummaryClose = async () => {
  cron.schedule("0 13 * * Monday-Friday", () => {
      const response = await util.tickerHandler("$SPY");
      const { latestPrice, prevClose, ytdChange } = response;

      bot.channels.cache.get(process.env.CHANNEL_ID).send(
        `
          TRADING IS CLOSED FOR THE DAY
          ***SPY***
          Closing: ${latestPrice}
          Open: ${prevClose}
          YTD Change: ${parseFloat(ytdChange * 100).toFixed(3)}
        `
      );
  });
};

const cronTest = async () => {
  cron.schedule("45 8 * * Monday-Friday", () => {
    bot.channels.cache.get(process.env.CHANEL_ID).send("Sup guys");
  });
};


exports.scheduleSPYSummaryOpen = scheduleSPYSummaryOpen;
exports.scheduleSPYSummaryClose = scheduleSPYSummaryClose;
exports.cronTest = cronTest;