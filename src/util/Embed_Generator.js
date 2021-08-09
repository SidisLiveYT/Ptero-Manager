const { MessageEmbed } = require('discord.js');

module.exports = {
    NormalEmbedGen : async function (bot,Values,message) {
        if(!Values.title) Values.title = ` `;
        if(!Values.des) Values.des = `** ** `;

        let Embed = new MessageEmbed()
            .setAuthor("G-Host Hosting Services","https://i.imgur.com/w4rp9MW.gif","https://discord.gg/WawsasenTk")
            .setTitle(`**${Values.title}**`)
            .setDescription(`${Values.des}`)
            .addField(`__**Supportive Links**__`,`[Support Server](https://discord.gg/WawsasenTk) 🔅 [Client Panel](https://client.g-host.xyz/) 🔅 [Servers Panel](https://panel.g-host.xyz/) 🔅 [HomePage](http://g-host.xyz/)`)
            .setFooter(`Data Published`,'https://cdn.discordapp.com/emojis/804669904153608212.gif?v=1')
            .setTimestamp()
            .setImage(`https://i.imgur.com/aArCq3x.gif`)
            .setThumbnail(message.author.avatarURL({ dynamic:true }))
            .setColor('#FFFF00');
        return await message.channel.send(Embed).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; });});
    },
    ErrorEmbedGen : async function (bot,Values,message) {
        if(!Values.title) Values.title = ` `;
        if(!Values.des) Values.des = `** ** `;

        let Embed = new MessageEmbed()
            .setAuthor("Error","https://i.imgur.com/w4rp9MW.gif","https://discord.gg/WawsasenTk")
            .setTitle(`**${Values.title}**`)
            .setDescription(`${Values.des}`)
            .addField(`__**Supportive Links**__`,`[Support Server](https://discord.gg/WawsasenTk) 🔅 [Client Panel](https://client.g-host.xyz/) 🔅 [Servers Panel](https://panel.g-host.xyz/) 🔅 [HomePage](http://g-host.xyz/)`)
            .setFooter(`Error Detected`,'https://cdn.discordapp.com/emojis/804669904153608212.gif?v=1')
            .setTimestamp()
            .setImage(`https://i.imgur.com/aArCq3x.gif`)
            .setThumbnail(message.author.avatarURL({ dynamic:true }))
            .setColor('#FF0000');
        return await message.channel.send(Embed).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; });});
    },
    DM_ErrorEmbedGen : async function (bot,Values,user) {
        if(!Values.title) Values.title = ` `;
        if(!Values.des) Values.des = `** ** `;

        let Embed = new MessageEmbed()
            .setAuthor("Error","https://i.imgur.com/w4rp9MW.gif","https://discord.gg/WawsasenTk")
            .setTitle(`**${Values.title}**`)
            .setDescription(`${Values.des}`)
            .addField(`__**Supportive Links**__`,`[Support Server](https://discord.gg/WawsasenTk) 🔅 [Client Panel](https://client.g-host.xyz/) 🔅 [Servers Panel](https://panel.g-host.xyz/) 🔅 [HomePage](http://g-host.xyz/)`)
            .setFooter(`Private Message`,'https://cdn.discordapp.com/emojis/804669904153608212.gif?v=1')
            .setTimestamp()
            .setImage(`https://i.imgur.com/aArCq3x.gif`)
            .setThumbnail(user.avatarURL({ dynamic:true }))
            .setColor('#FF0000');
            return await user.send(`** **`).then(msg => { msg.edit(Embed).catch(err => { return; }); }).catch(err => { return; });
    },
    DM_NormalEmbedGen : async function (bot,Values,user) {
        if(!Values.title) Values.title = ` `;
        if(!Values.des) Values.des = `** ** `;

        let Embed = new MessageEmbed()
        .setAuthor("G-Host Hosting Services","https://i.imgur.com/w4rp9MW.gif","https://discord.gg/WawsasenTk")
        .setTitle(`**${Values.title}**`)
        .setDescription(`${Values.des}`)
        .addField(`__**Supportive Links**__`,`[Support Server](https://discord.gg/WawsasenTk) 🔅 [Client Panel](https://client.g-host.xyz/) 🔅 [Servers Panel](https://panel.g-host.xyz/) 🔅 [HomePage](http://g-host.xyz/)`)
        .setFooter(`Private Message`,'https://cdn.discordapp.com/emojis/804669904153608212.gif?v=1')
        .setTimestamp()
        .setImage(`https://i.imgur.com/aArCq3x.gif`)
        .setThumbnail(user.avatarURL({ dynamic:true }))
        .setColor('#FFFF00');
        return await user.send(`** **`).then(msg => { msg.edit(Embed).catch(err => { return; }); }).catch(err => { return; });
    },
};