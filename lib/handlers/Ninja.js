const CommandHanlder = require("../CommandHandler");

module.exports = class Ninja extends CommandHanlder {
  constructor() {
    super({
      command: "ninja"
    });
  }
  run(msg, args) {
    msg.channel.send("https://www.youtube.com/watch?v=UpMpZqfA9EU");
  }
};