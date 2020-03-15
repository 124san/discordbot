const fs = require("fs")
const path = require("path");
const CommandHandler = require("./CommandHandler");

module.exports = class MessageHandler {
  constructor(client, { prefix = "!" }) {
    this._client = client;
    this._prefix = prefix;
    this._handler = {};
  }

  register(handler) {
    const newCmd = handler.getCommand();
    if (this._handler.hasOwnProperty(newCmd)) {
      throw new Error(`Command: ${newCmd} is already registered.`);
    }
    this._handler[newCmd] = handler;
  }

  registerFolder(folder) {
    const files = fs.readdirSync(folder);
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const handler = require(path.join(folder, file));
      let instance;
      try {
        instance = new handler();
      } catch { throw new Error(`${file} is not a valid handler class`); }
      this.register(instance);
      console.log(`Registered "${instance.constructor.name}" from "${file}"`);
    });
  }

  handle(message) {
    // ignore non-prefix or bot message
    if (!message.content.startsWith(this._prefix) || message.author.bot) return;
    const [cmd, args] = this.buildCommand(message);
    if (this._handler.hasOwnProperty(cmd)) {
      this._handler[cmd].run(message, this._handler[cmd].processArgs(args));
      return;
    }
  }

  // #region PRIVATE
  buildCommand(message) {
    const args = message.content.slice(this._prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    return [command, args];
  }
  // #endregion PRIVATE
};
