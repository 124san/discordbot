const CommandHanlder = require("../CommandHandler");

module.exports = class Emote extends CommandHanlder {
    constructor() {
        super({
            command: "emote"
        });
    }
    run(msg, args) {
        var emote = "😂"
        if (msg.guild) {
            emote = msg.guild.emojis.find(emoji => emoji.name === 'ozsmile');
        }
        msg.react(emote)
    }
};
