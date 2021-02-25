require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const util = require("./util/index");
const cron = require("./cron/cron");

bot.login(TOKEN);

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
      extendedPrice,
      companyName,
    } = response;

    msg.reply(
      `
    ***${symbol}***
    ${companyName}
    Latest Price: ${latestPrice}
    Change Amount: $${change}
    Change Percent: ${parseFloat((changePercent) * 100).toFixed(3)}%
    52wk High: ${week52High}
    52wk Low: ${week52Low}
    After Hours Price: ${extendedPrice || "Not Available"}
    `
    );
  }

  if (msg.content.includes("-joke")) {
    msg.reply("Your portfolio.");
  }

});

// cron.scheduleSPYSummaryOpen();
// cron.scheduleSPYSummaryClose()