const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const prisma = require("../database/prisma-client");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("solicitações")
        .setDescription("Exibir solicitações dos clientes.")
        .addStringOption((option) =>
            option
                .setName("status")
                .setDescription("solicitações abertas ou fechadas")
                .addChoices(
                    { name: "abertas", value: "abertas" },
                    { name: "fechadas", value: "fechadas" }
                )
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("quantidade")
                .setDescription("número de solicitações a serem exibidas")
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const open =
            interaction.options.getString("status") === "abertas"
                ? true
                : false;

        const take = interaction.options.getInteger("quantidade");

        const solicitations = await prisma.solicitations.findMany({
            where: {
                open,
            },
            orderBy: {
                bot_start_at: "asc",
            },
            take,
        });

        if (solicitations.length > 0) {
            const embeds = [];
            let attendant;

            for (const solicitation of solicitations) {
                const user = await prisma.users.findFirst({
                    where: {
                        id: solicitation.user_id,
                    },
                });

                if (solicitation.attendant_id) {
                    attendant = await prisma.attendants.findFirst({
                        where: {
                            id: solicitation.attendant_id,
                        },
                    });
                }

                const nameAndSurname =
                    user.name.split(" ")[0] + " " + user.name.split(" ")[1];

                let embed = new EmbedBuilder()
                    .setColor(solicitation.open ? 4437377 : 7506394)
                    .setTitle(`Solicitação de ${nameAndSurname}`)
                    .setDescription(
                        `Protocolo: **${solicitation.id}**\nCelular: **${
                            user.phone_number
                        }**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\nAtendente: **${
                            solicitation.attendant_id ? attendant.name : "-"
                        }**\nStatus: ${
                            solicitation.open ? "**Em Aberta**" : "**Fechada**"
                        }\nServiço: **${solicitation.service}**\nInicio em: **${
                            solicitation.start_at
                        }**\nFechada em: **${
                            solicitation.end_at ? solicitation.end_at : "-"
                        }**\nSatisfação: **${
                            solicitation.satisfaction
                                ? solicitation.satisfaction
                                : "-"
                        }**`
                    );

                embeds.push(embed);
            }

            await interaction.editReply({
                embeds,
                content: `Exibindo **${solicitations.length}** ${
                    solicitations.length === 1 ? "solicitação" : "solicitações"
                }!`,
            });
        } else {
            let embed = new EmbedBuilder()
                .setColor("Orange")
                .setDescription("Nenhuma solicitação encontrada!");

            await interaction.editReply({
                embeds: [embed],
            });

            setTimeout(async () => await interaction.deleteReply(), 5000);
        }
    },
};
