import { Client, ClientOptions, Collection } from "discord.js";
import Command, { CommandData } from "./types/command";

export default class Bot extends Client {
  public commands = new Collection<string, Command>();
  private _commandJSON: CommandData[] = [];

  constructor(options: ClientOptions) { super(options); }

  public async registerCommands(): Promise<void> { }
}
