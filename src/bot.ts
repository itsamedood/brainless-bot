import { Client, ClientOptions, Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import { glob } from "glob";
import Command, { CommandData } from "./types/command";
import Event from "./types/event";
import Modal from "./types/modal";

export default class Bot extends Client {
  public commands = new Collection<string, Command>();
  public modals = new Collection<string, Modal>();

  private _commandJSON: CommandData[] = [];

  constructor(options: ClientOptions) { super(options); }

  public async registerCommands(): Promise<void> {
    const cmdFiles = await glob(`${import.meta.dir}/commands/**/*.ts`, { absolute: true });

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

  public async registerEvents(): Promise<void> {
    const eventFiles = await glob(`${import.meta.dir}/events/**/*.ts`, { absolute: true });

    for (const file of eventFiles) {
      const { default: Event } = await import(file);
      const event: Event = new Event();

      event.once ? this.once(event.name, async (...args) => event.execute(this, ...args))
      : this.on(event.name, async (...args) => event.execute(this, ...args));

      console.log(`Loaded ${event.name} event!`);
    }
  }

  public async registerModals(): Promise<void> {
    const modalFiles = await glob(`${import.meta.dir}/components/modals/*.ts`, { absolute: true });

    for (const file of modalFiles) {
      const { default: Modal } = await import(file);
      const modal: Modal = new Modal();

      this.modals.set(modal.customId, modal);
      console.log(`Loaded ${modal.customId} modal!`);
    }
  }
}
