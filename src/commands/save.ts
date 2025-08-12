import {
	ApplicationCommandOptionType,
	Client,
	CommandInteraction,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { satisfactoryClient } from "..";

@Discord()
class Sasve {
	@Slash({
		name: "save",
		description: "Create a new save file",
	})
	async status(
		@SlashOption({
			name: "name",
			description: "Save's name",
			required: true,
			type: ApplicationCommandOptionType.String,
		})
		name: string,
		interaction: CommandInteraction
	) {
		await interaction.deferReply();
		try {
			await satisfactoryClient.saveGame(name);
			await interaction.editReply({
				content: `✅ Save file '${name}' created successfully.`,
			});
		} catch (error) {
			console.error("Error creating save file:", error);
			await interaction.editReply({
				content: `❌ Failed to create save file. Please try again later.`,
			});
		}
	}
}
