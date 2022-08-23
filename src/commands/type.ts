import type { CacheType, Interaction, SlashCommandBuilder } from "discord.js";

export interface Command {
  getName(): string;
  getBuilder(): SlashCommandBuilder;
  onInteractionCreate(interaction: Interaction<CacheType>): Promise<void>;
}
