require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const msgHandler = require('./messageHandler')

// Constants
const token = process.env.TOKEN;
const PREFIX = '!';
const TESTCHANNEL = '587337351408123906';
const TESTVOICE = '587383806923898880';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  msgHandler.handleMessage(msg)
});

client.login(token)