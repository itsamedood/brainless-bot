import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../bot";

export declare type Category = "MISC" | "MODERATION";

export enum OptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
}
