import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import { muteCompetitor } from "../mute-competitor.js";

import type { Command } from "./type";

export class MuteCompetitorCommand implements Command {
  getName(): string {
    return "mute-competitor";
  }
  getBuilder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.getName())
      .setDescription("競技者をミュートにします");
  }

  async onInteractionCreate(interaction: Interaction<CacheType>) {
    if (!interaction.isChatInputCommand()) return;
    if (!interaction.inGuild()) return;

    if (interaction.commandName !== this.getName()) {
      return;
    }

    if (!interaction.guild) {
      console.error("interaction.guild が undefined");
      return;
    }

    await muteCompetitor(true, interaction.guild);

    await interaction.reply("ミュートしたよ");
  }
}
