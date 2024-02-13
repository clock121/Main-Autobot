const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports.config = {
    name: "aid",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "kenneth Panio",
    description: "Get a response from hercai",
    commandCategory: "ARTIFICIAL INTELLIGENCE",
    usePrefix: false,
    usages: "[prompt]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
         api.sendMessage("Please provide a prompt.", event.threadID, event.messageID);
         return;
    }

        try {
    api.setMessageReaction("🕣", event.messageID, () => {}, true);
    api.sendMessage("🕣 | 𝘈𝘯𝘴𝘸𝘦𝘳𝘪𝘯𝘨....", event.threadID, event.messageID);
        const role = `I want you to act as a virtual doctor. I will describe my symptoms and you will provide a diagnosis and treatment plan. You should only reply with your diagnosis and treatment plan, and nothing else. Do not write explanations. My first request is ""`;
        const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURI(prompt)}`);
        const hercai = response.data.reply;

        const message = {
            body: `🩺𝗔𝗜 𝗗𝗢𝗖𝗧𝗢𝗥🧑‍⚕️:\n\n--------------------------------------------------------------\n${hercai}\n--------------------------------------------------------------\n\n${global.config.DONATION}`,
        };

        api.sendMessage(message, event.threadID, event.messageID);
const beastUrl = 'https://www.api.vyturex.com/beast';
    const beastResponse = await axios.get(`${beastUrl}?query=${encodeURIComponent(hercai)}`);

    if (beastResponse.data && beastResponse.data.audio) {
      const audioURL = beastResponse.data.audio;
      const fileName = "mrbeast_voice.mp3"; 
      const filePath = path.resolve(__dirname, 'cache', fileName);

      await global.utils.downloadFile(audioURL, filePath);

      api.sendMessage({
        body: "💽 𝗩𝗼𝗶𝗰𝗲",
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath));
    } else {
      //api.sendMessage("Failed to fetch Beast API response.", event.threadID);
    }
  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};

























    





