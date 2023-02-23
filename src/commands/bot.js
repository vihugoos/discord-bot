const { SlashCommandBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot")
        .setDescription("Perguntar algo para o bot.")
        .addStringOption((option) =>
            option
                .setName("perguntar")
                .setDescription("digite sua pergunta")
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const question = interaction.options.getString("perguntar");

        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${question}`,
                temperature: 0,
                max_tokens: 2150,
                top_p: 1,
                frequency_penalty: 0.0,
                presence_penalty: 0.0,
            });

            await interaction.editReply(response.data.choices[0].text);
        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data);
            } else {
                console.error(
                    `Error with OpenAI API request: ${error.message}`
                );
            }

            await interaction.editReply(
                `Ops! Houve um erro ao processar sua solicitação! [temporariamente fora do ar]`
            );
        }
    },
};
