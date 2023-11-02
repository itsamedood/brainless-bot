import Event from "../types/event";
import Bot from "../bot";

export default class ReadyEvent extends Event {
  constructor() {
    super({
      name: "ready",
      once: true
    });
  }

  public async execute(client: Bot) {
    return console.log(`Logged in as ${client.user?.tag}!`);
  }
}
