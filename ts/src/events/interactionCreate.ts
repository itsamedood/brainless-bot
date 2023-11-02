import {
  ChatInputCommandInteraction,
} from "discord.js";
import Command from "../types/command";
import Event from "../types/event";
import Bot from "../bot";

export default class InteractionCreateEvent extends Event {
  constructor() { super({ name: "interactionCreate" }); }

  public async execute(client: Bot) {}
}
