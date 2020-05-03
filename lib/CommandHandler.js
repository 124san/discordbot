module.exports = class CommandHandler {
  constructor(config) {
    this.validateConfig(config);
    this._cfg = config;
  }

  // Overwrite 
  // msg is the the message and args is the argument object
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
  setPrefix(prefix) {
    this._prefix = prefix;
  }
  // #endregion

  // #region PRIVATE
  processArgs(args) {
    const processResult = { error: null, result: { args: [] } };
    for (let i = 0; i < this._cfg.args.length; ++i) {
      const arg = this._cfg.args[i];
      if (arg.required === true && args[i] === undefined) {
        processResult.error = `Missing required argument: "${arg.name}", example: \`\`\`${this.buildExample()}\`\`\``;
        break;
      }
      processResult.result[arg.name] = args[i];
    }
    if (args.length > this._cfg.args.length) {
      processResult.result.args = args.slice(this._cfg.args.length);
    }
    return processResult;
  }
  validateConfig(cfg) {
    if (!cfg.command) throw new Error("You are missing command property from config");
    if (cfg.args) {
      let nonRequired = false;
      cfg.args.forEach((arg, index) => {
        if (!arg.name) {
          throw new Error(`Name is required for an argument, in ${this.constructor.name} at args index ${index}`);
        }
        if (arg.name === "args") throw new Error(`"args" is a reserved argument name`);
        if (!arg.hasOwnProperty("required") || arg.required === false) { nonRequired = true; }
        if (nonRequired && arg.required === true) throw new Error(`Cannot have a required argument "${arg.name}" after an optional argument`);
      });
    } else {
      cfg.args = [];
    }
  }
  buildExample() {
    if (this._cfg.example) return `${this._prefix}${this._cfg.example}`;
    let result = `${this._prefix}${this._cfg.command}`;
    this._cfg.args.forEach((arg) => {
      let argExp = arg.example || arg.name;
      result = `${result} ${argExp}`
    });
    return result;
  }
  // #endregion PRIVATE



}
