require('dotenv').config()
const Discord = require('discord.js');
const path = require("path");
const client = new Discord.Client();
const MessageHandler = require("./lib/MessageHandler");

// Constants
const token = process.env.TOKEN;

const messageHandler = new MessageHandler(client, { prefix: process.env.PREFIX });
messageHandler.registerFolder(path.join(__dirname, "lib", "handlers"))

client.once("ready", () => {
  console.log(`${client.user.tag} (${client.user.id}) is ready`);
  client.user.setActivity(`ur mom`);
});

client.once("error", console.error);

client.on('message', msg => {
  messageHandler.handle(msg)
});

client.login(token)