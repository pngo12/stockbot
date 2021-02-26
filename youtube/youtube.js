require("dotenv").config();
const YOUTUBETOKEN = process.env.YOUTUBETOKEN;
const fetch = require("node-fetch");


const getYoutubeURL = async query => {
    const baseURL = "https://youtube.com/watch?v="; //assuming videoID is v= here

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search`
    );


}