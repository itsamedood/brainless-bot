import { Client, ClientOptions, Collection } from "discord.js";

export default class Bot extends Client {
  public commands = new Collection<string, Command>();
  private commandJSON: CommandData[] = [];

  constructor(options: ClientOptions) {
    super(options);
  }
}
