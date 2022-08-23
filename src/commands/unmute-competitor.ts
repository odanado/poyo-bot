import { CacheType, Interaction, SlashCommandBuilder } from "discord.js";
import { muteCompetitor } from "../mute-competitor.js";

import type { Command } from "./type";

export class UnmuteCompetitorCommand implements Command {
  getName(): string {
    return "unmute-competitor";
  }
  getBuilder(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.getName())
      .setDescription("競技者のミュートを解除します");
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

    await muteCompetitor(false, interaction.guild);

    await interaction.reply("ミュート解除したよ");
  }
}
