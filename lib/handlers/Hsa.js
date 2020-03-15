const CommandHanlder = require("../CommandHandler");
const hsAnagram = require('./../../hearthstone/hsAnagram')
module.exports = class HearthStoneAnagram extends CommandHanlder {
    constructor() {
        super({
            command: "hsa",
            args: [
                { name: "anagram" }
            ]
        });
    }
    run(msg, args) {
        if (!args.anagram) {
            msg.reply("Usage: !hsa <anagram card name>");
            return;
        }
        let anagram = args.anagram
        console.log('hsanagram: You are searching with '+anagram);
        msg.reply(hsAnagram(anagram));
    }
};