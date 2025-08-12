import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { satisfactoryClient } from "..";

@Discord()
class Restart {
	@Slash({
		name: "restart",
		description:
			"/!\\ Use with caution! /!\\ Perform a restart ath the server level",
	})
	async restart(interaction: CommandInteraction) {
		try {
			await satisfactoryClient.shutdown();

			await interaction.reply({
				content:
					"✅ Satisfactory doesn't have a proper restart mechanism, so the server has been shut down. It should restart automatically. If the server is not available in 5 minutes, you are fucked.",
			});
		} catch (error) {
			console.error("Error restarting the server:", error);
			await interaction.reply({
				content: "❌ An error occurred while restarting the server.",
			});
		}
	}
}
