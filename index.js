const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");

let messageContent=[
  "Hello,Thank you for your message. Owner is currently unavailable, I am Athena virtual assistant of Manaf and am here to help with any questions or concerns you may have. Please let me know how I can assist you and I will do my best to help.",
  "Thank you for reaching out! Owner is currently unavailable, but I am happy to assist you in any way that I can. How may I help you today?",
  "Hello and thank you for reaching out! Owner is currently unavailable, but I am here to assist you in any way that I can. Please let me know if you have any questions or need assistance with anything. I will do my best to help or pass along your message to the owner as soon as possible. Thank you for your understanding.",
  "Hello and welcome! I am the Owner's virtual assistant - Athena, and I am here to help with any questions or needs you may have. The owner is currently unavailable, but I will do my best to assist you in the meantime. Please let me know if there is anything I can help with. Thank you for your message.",
  "Hello! Thank you for reaching out. It's great to meet you. I'm Athena, virtual assistant of Owner, and I'm here to help with any questions or concerns you may have. Is there anything specific you'd like to chat about today? I'm all ears!",
  "Hello and welcome! Thank you for your message. I am Athena, virtual assistant of Owner here to help with any questions or concerns you may have. Please let me know how I can assist you. I look forward to chatting with you.",
  "CHATGPT is Active",
  "Bot is on TEST...",
  "Jarvis Activated",
  "Web Console Ready for automatic bot reply"
]

const client = new Client({
  puppeteer: {
    executablePath: '/usr/bin/google-chrome-stable',
  },
  authStrategy: new LocalAuth()
});

client.initialize();
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("authenticated", () => {
  console.log("Auth Completed!");
});
client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("message",(message) => {
  let content = messageContent[Math.floor(Math.random() * messageContent.length)];
  if(message.body || message.hasMedia){
    message.reply(message.from,content)
  }

});