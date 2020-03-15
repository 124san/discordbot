module.exports = class CommandHandler {

  constructor(config) {
    if (!config.command) throw new Error("You are missing command property from config");
    this._cfg = config;
  }

  // Overwrite 
  // msg is the the message and args is the argumnet object
  run(msg, args) {
    throw new Error("run is not defined your handler");
  }

  // #region PROTECTED
  reply(msg, content) {
    msg.reply(content);
  }
  react(msg, emoji) {
    msg.react(emoji);
  }
  send(msg, content) {
    msg.channel.send(content);
  }
  // #endregion PROTECTED

  // #region HELPER
  getCommand() {
    return this._cfg.command;
  }
  // #endregion

  // #region PRIVATE
  processArgs(args) {
    const argObject = {};
    if (this._cfg.args) {
      this._cfg.args.forEach((arg, index) => {
        argObject[arg.name] = args[index];
      });
    }
    return argObject;
  }
  // #endregion PRIVATE



}
