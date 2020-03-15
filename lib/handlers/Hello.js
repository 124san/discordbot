const CommandHanlder = require("../CommandHandler");

module.exports = class Hello extends CommandHanlder {
  constructor() {
    super({
      command: "hello"
    });
  }
  run(msg, args) {
    msg.reply('Oh hi mark')
  }
};
