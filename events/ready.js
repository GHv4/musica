const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    const { REST } = require('@discordjs/rest');
    const { Routes } = require('discord-api-types/v10');

    const rest = new REST({ version: '10' }).setToken("MTA5Njc5NzY1NTM3NzY2MjAxMg.GjiVvj.5bFuZp9H7uoblc_jgkE2ZZI3iCHXthj3m8u-_4");

    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), { body: client.commands });
        } catch (err) {
            console.log(err)
        }
    })();

    client.user.setPresence({
        activities: [{ name: `lol`, type: ActivityType.Streaming, url: "https://twitch.tv/musica" }],
    });

    console.log(`Connected as ${client.user.username}`)
}
