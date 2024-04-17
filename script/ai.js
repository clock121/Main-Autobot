const {get} = require('axios');
const url = "https://combined-api-a2153f3cf0b5.herokuapp.com";
module.exports = {
    config: {
        name: "ai",
        aliases: ["gpt4","Gpt-4","gpt"],
        version: "1.0.0",
        role: 0,
        credits: "Mark Hitsuraan",
        info: "Chat with GPT4 Continues Conversation",
        usage: "Gpt4 [text] to clear conversation type [Gpt4 Clear]",
        cd: 0,
    },
    run: async function({api, event, args}){
            let prompt = args.join(' '), id = event.senderID;
           async function r(msg){
                 api.sendMessage(msg, event.threadID, event.messageID)
             }
            if(!prompt) return r("Please provide a question first.");
            r("Please bear with me while I ponder your request...");
            try {
                const res = await get(url+"/gpt4?prompt="+prompt+"&uid="+id);
                const answer = res.data.gpt4;
                return r(`📦𝗚𝗣𝗧4+ 𝗖𝗢𝗡𝗧𝗜𝗡𝗨𝗘𝗦 𝗔𝗜\n━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${prompt}\n━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\ncredits: www.facebook.com/mark.dev69`);
            } catch (e){
                return r(e.message)
            }
    }
}
