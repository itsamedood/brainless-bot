import Bot from "../bot";

export interface EventArgs {
  name: string;
  once?: boolean | undefined;
}

export default abstract class Event {
  private _name: string;
  private _once: boolean;

  constructor(args: EventArgs) {
    this._name = args.name;
    this._once = args.once ?? false;
  }

  get name(): string { return this._name; }
  get once(): boolean { return this._once; }

  public abstract execute(client: Bot, ...args: any[]): any;
}
