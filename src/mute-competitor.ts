import type { Guild } from "discord.js";

export async function muteCompetitor(mute: boolean, guild: Guild) {
  const competitorRoles = guild.roles.cache.filter((value) => {
    return ["イカ", "タコ"].includes(value.name);
  });

  if (!competitorRoles) {
    console.error("competitorRoles が undefined");
    return;
  }

  for (const [_, role] of competitorRoles) {
    for (const [_, member] of role.members) {
      await member.voice.setMute(mute);
    }
  }
}
