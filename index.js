const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const fs = require('fs');
const client = new Client({
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true
    },
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
    ]
});
client.player = new DisTube(client, {
    leaveOnEmpty: false, // Don't set this to "true" for 247 Commands working!
    emptyCooldown: 60,
    leaveOnFinish: false, // Don't set this to "true" for 247 Commands working!
    leaveOnStop: true,
    plugins: [
        new SoundCloudPlugin(),
        new SpotifyPlugin({
            parallel: true,
            emitEventsAfterFetching: false,
            api: {
                clientId: "069cc074a84545c8828c78f9623c1c76",
                clientSecret: "653eaee4828040ffbf1ed1161bc1b726"
            },
        })
    ],
});

const player = client.player;

fs.readdir('./events/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
    })
})

fs.readdir('./events/player/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith('.js')) return;
        const event = require(`./events/player/${file}`);
        let eventName = file.split('.')[0];
        player.on(eventName, event.bind(null, client));
    })
})

client.commands = []
fs.readdir('./commands/', (err, files) => {
    if (err) throw err;
    files.forEach((f) => {
        try {
            if (f.endsWith('.js')) {
                let props = require(`./commands/${f}`);
                client.commands.push({
                    name: props.name,
                    description: props.description,
                    options: props.options,
                });
            }
        } catch (err) {
            console.log(err)
        }
    })
})

client.login("MTA5Njc5NzY1NTM3NzY2MjAxMg.GjiVvj.5bFuZp9H7uoblc_jgkE2ZZI3iCHXthj3m8u-_4");

// God, please forgive us, this is just to keep the bot online at all cost
process.on("unhandledRejection", (reason, p) => {
    console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [Error_Handling] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});