import type { CacheType, Interaction } from "discord.js";

export async function ifAdmin(interaction: Interaction<CacheType>) {
  if (!interaction.isChatInputCommand()) false;

  return interaction.user.username === "odan";
}
