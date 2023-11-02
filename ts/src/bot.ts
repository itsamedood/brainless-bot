import { Client, ClientOptions, Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import Command, { CommandData } from "./types/command";
import { glob } from "glob";

export default class Bot extends Client {
  public commands = new Collection<string, Command>();
  private _commandJSON: CommandData[] = [];

  constructor(options: ClientOptions) { super(options); }

  public async registerCommands(): Promise<void> {
    const cmdFiles = await glob(`${__dirname}/commands/**/*.ts`, { absolute: true });

    for (const file of cmdFiles) {
      const { default: Command } = await import(file);
      const command: Command = new Command();

      this.commands.set(command.data.name, command);
      this._commandJSON.push(command.data);

      console.log(`Loaded ${command.data.name} command!`);
    }

    const clientId = process.env["CLIENT_ID"] ?? '';
    const rest = new REST({ version: '9' }).setToken(process.env["TOKEN"] ?? '');

    (async (): Promise<void> => {
      try {
        console.log(`Refreshing ${cmdFiles.length} application commands.`);

        const data: any = await rest.put(
          Routes.applicationCommands(clientId), 
          { body: this._commandJSON }
        );

        return console.log(`Successfully reloaded ${data.length} application commands!`);
      } catch (err) {
        console.log("Failed to reload application commands.");
        return console.error(err);
      }
    })();
  }
}
