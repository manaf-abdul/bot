let messageContent = [
  "Hello,Thank you for your message. Owner is currently unavailable, I am Athena(AI using CHATGPT) virtual assistant and am here to help with any questions or concerns you may have. Please let me know how I can assist you and I will do my best to help.",
  "Thank you for reaching out! Owner is currently unavailable, but I am happy to assist you in any way that I can. How may I help you today?",
  "Hello and thank you for reaching out! Owner is currently unavailable, but I am here to assist you in any way that I can. Please let me know if you have any questions or need assistance with anything. I will do my best to help or pass along your message to the owner as soon as possible. Thank you for your understanding.",
  "Hello and welcome! I am the Owner's virtual assistant - Athena(AI using CHATGPT), and I am here to help with any questions or needs you may have. The owner is currently unavailable, but I will do my best to assist you in the meantime. Please let me know if there is anything I can help with. Thank you for your message.",
  "Hello! Thank you for reaching out. It's great to meet you. I'm Athena(AI using CHATGPT), virtual assistant of Owner, and I'm here to help with any questions or concerns you may have. Is there anything specific you'd like to chat about today? I'm all ears!",
  "Hello and welcome! Thank you for your message. I am Athena(AI using CHATGPT), virtual assistant of Owner here to help with any questions or concerns you may have. Please let me know how I can assist you. I look forward to chatting with you.",
  "CHAT BOT is Active",
  "Bot is on TEST...",
  "BOT Activated",
  "Web Console Ready for automatic bot reply"
]

let recentContacts = []

// appikey="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"

const qrcode = require('qrcode-terminal');
const axios = require("axios")

const { Client } = require('whatsapp-web.js');
const client = new Client();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  console.log("message", message.author);
  // let content = `Hi ${message._data.notifyName}, Manaf is currently busy please leave a message`

  // let {data}=await axios.get(`http://api.brainshop.ai/get?bid=171235&key=nAosRWktWiU5Hon1&uid=[uid]&msg=[${message.body}]`)

  if ((message.body || message.hasMedia) && message.author === undefined && message._data.notifyName) {
    const { data } = await openai.createCompletion({
      model: "text-ada-001",
      prompt:message.body,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    console.log("response", data)

    client.sendMessage(message.from, data.choices[0].text);
    // recentContacts.push(message._data.notifyName)
  }
});

// setInterval(()=> {
//   recentContacts = [];
// },900000)

client.initialize();
