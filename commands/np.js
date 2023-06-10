const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'nowplaying',
  description: 'nowplaying the playlist',
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue) return interaction.reply({ content: 'There is nothing in the queue right now!', ephemeral: true })
    const song = queue.songs[0]
    const embed = new EmbedBuilder()
      .setDescription(`**playing:** [${song.name}] **time:** (${song.formattedDuration})`)
      .setImage(song.thumbnail)
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#483d8b')
      .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
    interaction.reply({ embeds: [embed] });
  }
}