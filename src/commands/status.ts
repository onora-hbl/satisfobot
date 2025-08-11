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
		let description = "";

		try {
			const healthCheck = (
				(await satisfactoryClient.healthCheck()) as any
			).data;
			console.log("Health Check:", healthCheck);
			if (healthCheck.health === "healthy") {
				description = "The server is running smoothly (>10 tick/s)! ✅";
			} else {
				description =
					"The server is experiencing latency issues (<=10 tick/s). ⚠️";
			}
		} catch (error) {
			console.error("Error fetching server status:", error);
			description = "The server is currently unreachable. ❌";
		}

		let embed = new EmbedBuilder();
		embed
			.setAuthor({
				name: "SastisfoBot",
				iconURL: client.user?.avatarURL() || undefined,
			})
			.setTitle("**Server Status**")
			.setDescription(description);
		interaction.reply({ embeds: [embed] });
	}
}
