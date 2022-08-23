import { Client, GatewayIntentBits, REST, Routes } from "discord.js";

import "dotenv/config";

import { MuteCompetitorCommand } from "./commands/mute-competitor.js";
import { UnmuteCompetitorCommand } from "./commands/unmute-competitor.js";
import type { Command } from "./commands/type.js";
import { ifAdmin } from "./if-admin.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env["DISCORD_TOKEN"]!;
const applicationId = process.env["DISCORD_APPLICATION_ID"]!;
const guildId = process.env["DISCORD_GUILD_ID"]!;

async function register(client: Client, rest: REST) {
  const commands: Command[] = [
    new MuteCompetitorCommand(),
    new UnmuteCompetitorCommand(),
  ];
  const body = commands.map((command) => command.getBuilder().toJSON());
  await rest.put(Routes.applicationGuildCommands(applicationId, guildId), {
    body,
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!(await ifAdmin(interaction))) {
      await interaction.reply("コマンドを使えるのはぽよだけ");
      return;
    }

    for (const command of commands) {
      await command.onInteractionCreate(interaction);
    }
  });
}

async function main(): Promise<void> {
  const rest = new REST({ version: "10" }).setToken(token);

  client.once("ready", () => {
    console.log("Ready!");
  });

  client.login(token);

  await register(client, rest);
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
