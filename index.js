require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);

const util = require("./util/index");
const cron = require("./cron/cron");
const youtube = require("./youtube/youtube");

bot.on("message", async msg => {
  if (msg.content[0].includes("$")) {
    const ticker = util.prepString(msg.content);
    const response = await util.tickerHandler(ticker);

    const {
      symbol,
      latestPrice,
      change,
      changePercent,
      week52High,
      week52Low,
      latestVolume,
      avgTotalVolume,
      companyName,
    } = response;

    msg.reply(
    `
    ***${symbol}***
    ${companyName}
    Latest Price: $${latestPrice}
    Change Amount: $${change}
    Change Percent: ${parseFloat(changePercent * 100).toFixed(3)}%
    Volume: ${latestVolume}
    AvgTotalVolume: ${avgTotalVolume}
    52wk High: $${week52High}
    52wk Low: $${week52Low}
    `
    );
  }

  if (msg.content.includes("-youtube")) {
    const query = util.prepareYoutubeQueryString(msg.content);

    const youtubeURL = youtube.getYoutubeURL(query);

    msg.reply(youtubeURL);
  }

  if (msg.content.includes("-joke")) {
    msg.reply("Your portfolio.");
  }
});

bot.on("ready", async () => {
  cron.scheduleSPYSummaryOpen();
  cron.scheduleSPYSummaryClose()
});