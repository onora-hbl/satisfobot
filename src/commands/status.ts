import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Client, Discord, Slash } from "discordx";
import { satisfactoryClient } from "..";

@Discord()
class Status {
	@Slash({
		name: "status",
		description: "Get the status of the server",
	})
	async status(interaction: CommandInteraction, client: Client) {
		const embed = new EmbedBuilder();
		embed
			.setAuthor({
				name: "SastisfoBot",
				iconURL: client.user?.avatarURL() || undefined,
			})
			.setTitle("**Server Status**");

		let healthy = false;

		try {
			const healthCheck = await satisfactoryClient.healthCheck();
			healthy = healthCheck.health === "healthy";
		} catch (error) {
			console.error("Error fetching server status:", error);
			embed.setDescription("❌ Impossible to fetch server status.");
			return await interaction.reply({ embeds: [embed] });
		}

		try {
			const serverOptions = await satisfactoryClient.getServerOptions();
			embed.addFields([
				{
					name: "**Server Options**",
					value: `Auto Pause ${
						serverOptions.serverOptions["FG.DSAutoPause"]
							? "✅"
							: "❌"
					}\nAuto Save Interval: ${parseInt(
						serverOptions.serverOptions["FG.AutosaveInterval"]
					)}s\nSeasonal events: ${
						serverOptions.serverOptions[
							"FG.DisableSeasonalEvents"
						] === "True"
							? "❌"
							: "✅"
					}`,
					inline: false,
				},
			]);
		} catch (error) {
			console.error("Error fetching server options:", error);
			embed.setDescription("❌ Impossible to fetch server status.");
			return await interaction.reply({ embeds: [embed] });
		}

		if (healthy) {
			embed.setDescription(
				"✅ The server is running and healthy (>10 tick/s)."
			);
		} else {
			embed.setDescription(
				"⚠️ The server is running but not healthy (<10 tick/s)."
			);
		}

		await interaction.reply({ embeds: [embed] });
	}
}
