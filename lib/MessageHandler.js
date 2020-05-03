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
    handler.setPrefix(this._prefix);
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
      } catch (err) { throw new Error(`Error when registring ${file}, ${err}`); }
      this.register(instance);
      console.log(`Registered "${instance.constructor.name}" from "${file}"`);
    });
    console.log(`Registration Complete`);
  }

  handle(message) {
    // ignore non-prefix or bot message
    if (!message.content.startsWith(this._prefix) || message.author.bot) return;
    const [cmd, args] = this.buildCommand(message);
    if (this._handler.hasOwnProperty(cmd)) {
      const argResult = this._handler[cmd].processArgs(args);
      if (argResult.error) {
        message.reply(argResult.error);
        return;
      }
      this._handler[cmd].run(message, argResult.result);
    }
  }

  // #region PRIVATE
  buildCommand(message) {
    // const args = message.content.slice(this._prefix.length).split(' ');
    const args = this.buildArgument(message.content.slice(this._prefix.length));
    const command = args.shift().toLowerCase();
    return [command, args];
  }
  buildArgument(string) {
    const args = [];
    let temp = string;
    while (temp.length > 0) {
      const regex = temp.match(/"[^"]+"/);
      if (regex && regex.index == 0) {
        temp = temp.substring(regex[0].length);
        args.push(regex[0].slice(1, -1));
      } else {
        const spaceIndex = temp.indexOf(" ");
        if (spaceIndex == -1) {
          args.push(temp);
          temp = "";
        } else {
          args.push(temp.substring(0, spaceIndex));
          temp = temp.substring(spaceIndex);
        }
      }
      if (temp.startsWith(" ")) temp = temp.slice(1);
    }
    return args;
  }
  // #endregion PRIVATE
};
