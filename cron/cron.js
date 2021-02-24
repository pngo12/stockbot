require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const cron = require("node-cron");
const TOKEN = process.env.TOKEN;

const iex = require("./iex/iex");
const util = require("./util/index");

bot.login(TOKEN);

const scheduleSPYSummaryOpen = async () => {
  cron.schedule("30 6 * * Monday-Friday", () => {
    bot.on("message", async () => {
      const response = await util.tickerHandler("$SPY");
      const { latestPrice, previousClose, ytdChange } = response;

      msg.channel.send(
        `
          GOOD MORNING BULLS
          ***SPY***
          Open: ${latestPrice}
          Previous Close: ${previousClose}
          YTD Change: ${parseFloat(ytdChange * 100).toFixed(3)}
        `
      );
    });
  });
};



const scheduleSPYSummaryClose = async () => {
  cron.schedule("0 13 * * Monday-Friday", () => {
    bot.on("message", async () => {
      const response = await util.tickerHandler("$SPY");
      const { latestPrice, prevClose, ytdChange } = response;

      msg.channel.send(
        `
          TRADING IS CLOSED FOR THE DAY
          ***SPY***
          Closing: ${latestPrice}
          Open: ${prevClose}
          YTD Change: ${parseFloat(ytdChange * 100).toFixed(3)}
        `
      );
    });
  });
};


exports.scheduleSPYSummaryOpen = scheduleSPYSummaryOpen;
exports.scheduleSPYSummaryClose = scheduleSPYSummaryClose;