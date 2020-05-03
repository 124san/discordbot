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
    const message = `${args.message} ${args.args.join(" ")}`
    this.reply(msg, message);
  }
};
