require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

const cron = require("node-cron");
const util = require("../util/index");

const scheduleSPYSummaryOpen = async () => {
  cron.schedule("30 6 * * Monday-Friday", async () => {
    const response = await util.tickerHandler("SPY");
    const { latestPrice, previousClose, ytdChange } = response;

    const channel = await bot.channels.cache.get(process.env.CHANNEL_ID);

    channel.send(
      ` GOOD MORNING BULLS
        ***SPY***
        Open: ${latestPrice}
        Previous Close: ${previousClose}
        YTD Change: ${parseFloat(ytdChange * 100).toFixed(3)}%
      `
    );
  });
};

const scheduleSPYSummaryClose = async () => {
  cron.schedule("0 13 * * Monday-Friday", async () => {
      const response = await util.tickerHandler("SPY");
      const { latestPrice, open, ytdChange } = response;

      const channel = await bot.channels.cache.get(process.env.CHANNEL_ID);

      channel.send(
        `
          TRADING IS CLOSED FOR THE DAY
          ***SPY***
          Closing: ${latestPrice}
          Open: ${open}
          YTD Change: ${parseFloat(ytdChange * 100).toFixed(3)}%
        `
      );
  });
};

exports.scheduleSPYSummaryOpen = scheduleSPYSummaryOpen;
exports.scheduleSPYSummaryClose = scheduleSPYSummaryClose;