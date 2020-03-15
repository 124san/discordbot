// old message handler. DEPRECATED

// Imports
const hsAnagram = require('./hearthstone/hsAnagram')
console.log("Finish loading handler")

const PREFIX = process.env.PREFIX || "!"

const handler = {
    handleMessage: function(msg) {
        let args = msg.content.substring(PREFIX.length).split(" ");
        if (msg.content.startsWith(PREFIX)) {
            switch (args[0]) {
                case 'hello':
                    msg.channel.send('Oh hi mark')
                    break;
                case 'greet':
                    this.sayHi(msg)
                    break;
                case 'ninja':
                    msg.channel.send("https://www.youtube.com/watch?v=UpMpZqfA9EU");
                    break;
                case 'hsa':
                    if (args.length <= 1) {
                        msg.reply("Usage: !hsanagram <anagram card name>");
                    }
                    else {
                        const anagram = args.slice(1).join(" ");
                        console.log('hsanagram: You are searching with '+anagram);
                        msg.reply(hsAnagram(anagram));
                    }
                    break;
                default: msg.channel.send('Not a valid command');
            }
        }
    },
    sayHi: function(msg) {
        msg.reply('Hello madafaka')
    }
}
module.exports = handler