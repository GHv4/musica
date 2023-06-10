const { EmbedBuilder } = require('discord.js');

module.exports = async (client, queue, song) => {
  if (queue) {
    if (queue.repeatMode !== 0) return;
    if (queue.textChannel) {
      const embed = new EmbedBuilder()
        .setDescription(`**playing:** \`[${song.name}]\`
          
          **requested by:** ${song.user}`)
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('#483d8b')
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
      queue.textChannel.send({ embeds: [embed] }).catch(console.error);
    }
  }
}
