const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'stop',
  description: 'Stop the music',
  inVoiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue) return interaction.reply({ content: 'There is nothing in the queue right now!', ephemeral: true })
    queue.stop()
    const embed = new EmbedBuilder()
      .setDescription(`**stopped**`)
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#483d8b')
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
    interaction.reply({ embeds: [embed] });
  }
}