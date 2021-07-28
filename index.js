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

  if (msg.content.toLowerCase().startsWith("-youtube", 0)) {
    const query = util.prepareYoutubeQueryString(msg.content);

    const youtubeURL = await youtube.getYoutubeURL(query);

    msg.reply(youtubeURL);
  }

  if (msg.content.startsWith("-joke", 0)) {
    msg.reply("Your portfolio.");
  }

  if (msg.author.id === "328613818831863808") {

    const randomNumber = Math.floor(Math.random() * 100);

    if (randomNumber <= 15) {
      msg.reply(util.randomHype());
      msg.react("❤️");
      msg.react("💪");
    }
  }

});

bot.on("guildMemberAdd", member => {
  const channelID = member.guild.channels.cache.find(channel => channel.name === "general").id;
  if(!channelID) return;

  channel.send(`Welcome ${member.tag} to infinite losses`);
    
})

bot.on("ready", async () => {
  cron.scheduleSPYSummaryOpen();
  cron.scheduleSPYSummaryClose()
});