const CommandHanlder = require("../CommandHandler");

module.exports = class Repeat extends CommandHanlder {
  constructor() {
    super({
      command: "repeat",
      args: [
        { name: "message" }
      ]
    });
  }
  run(msg, args) {
    this.reply(msg, args.message);
  }
};
