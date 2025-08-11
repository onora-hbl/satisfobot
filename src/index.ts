import { SatisfactoryClient } from "satisfactory.ts";
import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { Client } from "discordx";

if (!process.env.BASE_URL) {
	throw new Error("BASE_URL is required to run the bot.");
}

if (!process.env.ACCESS_TOKEN) {
	throw new Error("ACCESS_TOKEN is required to run the bot.");
}

export const satisfactoryClient = new SatisfactoryClient({
	baseUrl: process.env.BASE_URL,
	accessToken: process.env.ACCESS_TOKEN,
	allowSelfSignedCertificates: true,
});

export const bot = new Client({
	intents: [],
	silent: false,
});

bot.once("ready", () => {
	void bot.initApplicationCommands();
	console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
	bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
	void bot.executeCommand(message);
});

async function run() {
	await importx(`${dirname(import.meta.url)}/commands/**/*.{ts,js}`);

	if (!process.env.BOT_TOKEN) {
		throw Error("Could not find BOT_TOKEN in your environment");
	}

	await bot.login(process.env.BOT_TOKEN);
}

void run();
