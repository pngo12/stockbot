require("dotenv").config();
const YOUTUBETOKEN = process.env.YOUTUBE_TOKEN;

const { google } = require("googleapis");
const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBETOKEN,
});




const getYoutubeURL = async query => {
  let baseURL = "https://youtube.com/watch?v=";

  const callYouTube = await youtube.search.list({
    part: "id, snippet",
    q: query,
  });


  if (callYouTube.status !== 200) {
    return "Error processing your request";
  } else {
    baseURL = baseURL + callYouTube.data.items[0].id.videoId;
    return baseURL
  }
};

exports.getYoutubeURL = getYoutubeURL;