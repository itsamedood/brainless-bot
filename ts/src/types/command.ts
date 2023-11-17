import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../bot";

export declare type Category = "FUN" | "MISC" | "MODERATION";

export enum OptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11,
}

export interface OptionData {
  name: string;
  description: string;
  type: OptionType;
}

export interface CommandData {
  name: string;
  description: string;
  options?: OptionData[] | undefined;
}

export interface CommandArgs {
  data: CommandData;
  category: Category;
  userPermissions?: bigint[] | undefined;
  myPermissions?: bigint[] | undefined;
}

export default abstract class Command {
  private _data: CommandData;
  private _category: Category;
  private _userPermissions?: bigint[] | undefined;
  private _myPermissions?: bigint[] | undefined;

  constructor(args: CommandArgs) {
    this._data = args.data;
    this._category = args.category;
    this._userPermissions = args.userPermissions;
    this._myPermissions = args.myPermissions;
  }

  get data(): CommandData { return this._data; }
  get category(): Category { return this._category; }
  get userPermissions(): bigint[] { return this._userPermissions ?? []; }
  get myPermissions(): bigint[] { return this._myPermissions ?? []; }

  public abstract execute(interaction: ChatInputCommandInteraction, client: Bot): any;
}
