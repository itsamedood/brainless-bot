import { ModalSubmitInteraction } from "discord.js";
import Bot from "../bot";

export interface ModalArgs {
  customId: string;
}

export default abstract class Modal {
  private _customId: string;

  constructor(args: ModalArgs) {
    this._customId = args.customId;
  }

  get customId(): string { return this._customId; }

  public abstract execute(interaction: ModalSubmitInteraction, client: Bot): any;
}
