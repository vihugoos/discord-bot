const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

async function successfullyDeletedMessages(amountToDelete, interaction) {
    let embed = new EmbedBuilder()
        .setAuthor({
            name: `${interaction.guild.name} / ${interaction.channel.name}`,
            iconURL: interaction.guild.iconURL({ dynamic: true }),
        })
        .setDescription(
            `${amountToDelete} ${
                amountToDelete === 1 ? "mensagem" : "mensagens"
            } ${amountToDelete === 1 ? "deletada" : "deletadas"} por ${
                interaction.user.username
            }`
        );

    await interaction.reply({ embeds: [embed] });

    setTimeout(async () => await interaction.deleteReply(), 5000);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpar mensagens do canal.")
        .addIntegerOption((option) =>
            option
                .setName("quantidade")
                .setDescription("número de mensagens a serem apagadas")
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("usuário")
                .setDescription("selecione qual usuário deletar mensagens")
                .setRequired(false)
        ),

    async execute(interaction) {
        const amountToDelete = interaction.options.getInteger("quantidade");
        const selectedUser = interaction.options.getUser("usuário");

        if (
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageMessages
            )
        ) {
            let embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription(
                    "Você não tem permissão para utilizar esse comando."
                );

            await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } else {
            if (amountToDelete < 1 || amountToDelete > 100) {
                let embed = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(
                        "Ops! Por favor digite um número entre 1 - 100!"
                    );

                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                });
            } else {
                if (selectedUser) {
                    const messages = await interaction.channel.messages.fetch({
                        limit: amountToDelete,
                    });

                    let i = 0;
                    const filtered = [];

                    (await messages).filter((msg) => {
                        if (
                            msg.author.id === selectedUser.id &&
                            amountToDelete > i
                        ) {
                            filtered.push(msg);
                            i++;
                        }
                    });

                    await interaction.channel.bulkDelete(filtered);
                    await successfullyDeletedMessages(
                        amountToDelete,
                        interaction
                    );
                } else {
                    await interaction.channel.bulkDelete(amountToDelete);
                    await successfullyDeletedMessages(
                        amountToDelete,
                        interaction
                    );
                }
            }
        }
    },
};
