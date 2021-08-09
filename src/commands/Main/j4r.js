const hash = '`';
require('dotenv').config();
const { Host_Developer,Host_Owner } = process.env;
const { MessageEmbed } = require('discord.js');
const { NormalEmbedGen,ErrorEmbedGen } = require('../../util/Embed_Generator.js');
const { Register_Server_J4R,Delete_Server_J4R,Edit_Server_J4R } = require('../../../databases/db_j4r.js');

module.exports = {
name: 'j4r',
description: 'Join for Resources Command Section',
usage: 'g!j4r <Category> <Sub-Category>',
async execute(bot,message,args) {
    let miss_perms = [];
    if((!message.guild.me.permissions.has("ADMINISTRATOR"))) {
    if((!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'))) miss_perms.push("Send Messages");
    if((!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES'))) miss_perms.push("Manage Messages");
    if((!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS'))) miss_perms.push("Embed Links");
    if((!message.channel.permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS"))) miss_perms.push("Use External Emojis");
    if(!(`${miss_perms}` === ``)) {
        message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} ${miss_perms.join("\n")} ${hash}`).catch(err => { console.log("Blocked DM !"); });
        return console.log(`Missing Permissions in ${message.guild.name} !`);
        }; 
    };

    let Embed_Build = new MessageEmbed();
    const filter = response => { return response.author.id === message.author.id; };
    let Cache_List = [];
    let response = null;
    let Valuem = null;
    let Join_for_Resources_Datas = bot.j4r_DB;
    let Join_for_Resources_Journals = bot.j4r_Journals_DB;
    let Cache_Last_Customer = null;
    let count = 0;
    let Book = null;
    let option = null;

    if(!args[0]) {
        let Embed_Error = {
            title : `Invalid/Blank Value is Detected`,
            des : `**Please Give Some Valid Values or Sub-Command to Proceed**`
        };
        return ErrorEmbedGen(bot,Embed_Error,message);
    }
    else if(!Host_Owner.includes(`${message.author.id}`) && !Host_Developer.includes(`${message.author.id}`)) {
        let Embed_Error = {
            title : `Missing Permissions for Command`,
            des : `**Only Owner and Developer of the Host can Use these Commands**\n**Don't use Such Admin Commands**`
        };
        return ErrorEmbedGen(bot,Embed_Error,message);
    }
    else if(args[0].toLowerCase().trim() === `help`) {
        let Embedm = {
            title: "Help Command for Join for Resources",
            des : `**For** ${hash}Join for Resources${hash} **with G-Host Hosting Support Bot**\n\n__**Commands**__\n**1) Setup Server** - ${hash}g!j4r setup${hash}\n**2) Edit Server Data** - ${hash}g!j4r edit <Server ID>${hash}\n**3) Delete Server Data** - ${hash}g!j4r delete <Server ID>${hash}\n**4) Check Server Allocated Resources** - ${hash}g!j4r check <Server ID>${hash}\n**5) Users List  Allocated** - ${hash}g!j4r list <Server ID>${hash}\n\n**Important Tip** : *Please ignore < > symbols , You just need to Mention Respected Data like - 123... for Server ID*`
          };
          return NormalEmbedGen(bot,Embedm,message);
    }
    else if(args[0].toLowerCase().trim() === `setup`) {

        Embed_Build.setColor(`RANDOM`)
        .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
        .setDescription(`Write the **Server ID** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
    
        message.channel.send(Embed_Build).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
        message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                .then(collected => {
                response = collected.first();
                if(response === undefined) {
                    let Embed_Error = {
                        title : `Invalid/Blank Value is Detected`,
                        des : `**Please Give Some Valid Values for Server ID to Setup Join for Resources**`
                    };
                    return ErrorEmbedGen(bot,Embed_Error,message);
                };
                Valuem = response.content;
                bot.guilds.fetch(`${Valuem.trim()}`).then(guild => { Cache_List.push(Valuem); Cache_List.push(`${guild.name}`); }).catch(err => { 
                    let Embed_Error = {
                        title : `Invalid/Blank Server is Detected`,
                        des : `**Please Give Some Valid Values for Server ID to Setup Join for Resources**\n**Check weather the Bot is Setup on that Server , Otherwise it will not work**`
                    };
                    return ErrorEmbedGen(bot,Embed_Error,message);
                });
    Embed_Build.setColor(`RANDOM`)
        .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
        .setDescription(` Write the Allocated **R.A.M** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
                    
        message.channel.send(Embed_Build).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
             message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                    .then(collected => {
                    response = collected.first();
                    if(response === undefined) {
                        let Embed_Error = {
                            title : `Invalid/Blank is Detected on Ram Allocation`,
                            des : `**Please Give Valid Value for Ram Allocation for the User who will Join**`
                        };
                        return ErrorEmbedGen(bot,Embed_Error,message);
                    };
                    Valuem = response.content;
                    Cache_List.push(Valuem); 
                    Embed_Build.setColor(`RANDOM`)
                    .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
                    .setDescription(` Write the Allocated **C.P.U** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
                                
                    message.channel.send(Embed_Build).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                         message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                .then(collected => {
                                response = collected.first();
                                if(response === undefined) {
                                    let Embed_Error = {
                                        title : `Invalid/Blank is Detected on CPU Allocation`,
                                        des : `**Please Give Valid Value for CPU Allocation for the User who will Join**`
                                    };
                                    return ErrorEmbedGen(bot,Embed_Error,message);
                                };
                                Valuem = response.content;
                                Cache_List.push(Valuem); 

                        Embed_Build.setColor(`RANDOM`)
                                .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
                                .setDescription(` Write the Allocated **Disk/Storage** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
                                            
                                message.channel.send(Embed_Build).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                                message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                    .then(collected => {
                                            response = collected.first();
                                            if(response === undefined) {
                                                let Embed_Error = {
                                                    title : `Invalid/Blank is Detected on Disk/Storage Allocation`,
                                                    des : `**Please Give Valid Value for Disk/Storage Allocation for the User who will Join**`
                                                };
                                                return ErrorEmbedGen(bot,Embed_Error,message);
                                            };
                                            Valuem = response.content;
                                            Cache_List.push(Valuem);
                                    Embed_Build.setColor(`RANDOM`)
                                        .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
                                        .setDescription(` Write the Allocated **S.W.A.P** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
                                                       
                                        message.channel.send(Embed_Build).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                                        message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                            .then(collected => {
                                                    response = collected.first();
                                                        if(response === undefined) {
                                                            let Embed_Error = {
                                                                title : `Invalid/Blank is Detected on S.W.A.P Allocation`,
                                                                des : `**Please Give Valid Value for S.W.A.P Allocation for the User who will Join**`
                                                            };
                                                            return ErrorEmbedGen(bot,Embed_Error,message);
                                                        };
                                                        Valuem = response.content;
                                                        Cache_List.push(Valuem);
                                            return Register_Server_J4R(bot,Cache_List,message);
                            });
                        });
                    });
                });
            });

    }
    else if(args[0].toLowerCase().trim() === `delete`) {
        if(!args[1]) {
            let Embed_Error = {
                title : `Invalid/Blank Server ID is Detected`,
                des : `**Please Give Some Valid Server ID to Delete**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        for(count = 0;count < Join_for_Resources_Datas.length;++count) {
            if(`${args[1].trim()}` === `${Join_for_Resources_Datas[count].GuildID}`) { Book = Join_for_Resources_Datas[count]; };
        };
        if(!Book) { 
            let Embed_Error = {
                title : `Invalid/Blank Data is Detected`,
                des : `**No Server Related to Server ID " ${hash}${args[1]}${hash} " is present in Database to Delete**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        return Delete_Server_J4R(bot,Book.GuildID,message);
    }
    else if(args[0].toLowerCase().trim() === `edit`) {
        if(!args[1]) {
            let Embed_Error = {
                title : `Invalid/Blank Server ID is Detected`,
                des : `**Please Give Some Valid Server ID to Edit**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        for(count = 0;count < Join_for_Resources_Datas.length;++count) {
            if(`${args[1].trim()}` === `${Join_for_Resources_Datas[count].GuildID}`) { Book = Join_for_Resources_Datas[count]; };
        };
        if(!Book) { 
            let Embed_Error = {
                title : `Invalid/Blank Data is Detected`,
                des : `**No Server Related to Server ID " ${hash}${args[1]}${hash} " is present in Database to Edit**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        Embed_Build.setColor(`RANDOM`)
            .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
            .setDescription(` Write down The **Category** to Edit\n\n${hash}${hash}${hash}1. RAM [ Server Name ]\n2. CPU [Game Name]\n3. Disk\n4. Swap${hash}${hash}${hash}\n\nPlease Write within ${hash} 2 Minutes ${hash}`);

            message.channel.send(EmbedQuestions).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
            message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                    .then(collected => {
                response = collected.first();
                if(response === undefined) {
                    let Embed_Error = {
                               title : `Timedout from Category Editting`,
                               des : `**Please Write within 2 Minutes given time**`
                            };
                            return ErrorEmbedGen(bot,Embed_Error,message);
                     };
            option = response.content;
        if(option.toLowerCase().trim() === 'ram') {
            Embed_Build.setColor(`RANDOM`)
            .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
            .setDescription(` Write the Allocated **R.A.M** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
                    
                        message.channel.send(EmbedQuestions).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                        message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                .then(collected => {
                                response = collected.first();
                                if(response === undefined) {
                                    let Embed_Error = {
                                        title : `Timedout from Category Editting`,
                                        des : `**Please Write within 2 Minutes given time**`
                                     };
                                     return ErrorEmbedGen(bot,Embed_Error,message);
                                };
                                if(!NaN(`${response.content}`)) {
                                    let Embed_Error = {
                                        title : `Invalid/Blank Value is Detected`,
                                        des : `**Please Give the Allocation Amount as Number Format**`
                                    };
                                    return ErrorEmbedGen(bot,Embed_Error,message);
                                };
                                let Temp_Book = {
                                    Type : `Ram`,
                                    Value : `${response.content}`,
                                    GuildID : `${args[1]}`,
                                };
                                return Edit_Server_J4R(bot,Temp_Book,message);
                        });     
        }
        else if(option.toLowerCase().trim() === 'cpu') {
            Embed_Build.setColor(`RANDOM`)
            .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
            .setDescription(` Write the Allocated **C.P.U** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
                    
                        message.channel.send(EmbedQuestions).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                        message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                .then(collected => {
                                    response = collected.first();
                                if(response === undefined) {
                                    let Embed_Error = {
                                        title : `Timedout from Category Editting`,
                                        des : `**Please Write within 2 Minutes given time**`
                                     };
                                     return ErrorEmbedGen(bot,Embed_Error,message);
                                };
                                if(!NaN(`${response.content}`)) {
                                    let Embed_Error = {
                                        title : `Invalid/Blank Value is Detected`,
                                        des : `**Please Give the Allocation Amount as Number Format**`
                                    };
                                    return ErrorEmbedGen(bot,Embed_Error,message);
                                };
                                let Temp_Book = {
                                    Type : `Cpu`,
                                    Value : `${response.content}`,
                                    GuildID : `${args[1]}`,
                                };
                                return Edit_Server_J4R(bot,Temp_Book,message);
                            });
        }
        else if(option.toLowerCase().trim() === 'disk') {
            Embed_Build.setColor(`RANDOM`)
            .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
            .setDescription(` Write the Allocated **Disk/Storage** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
    
                                    message.channel.send(EmbedQuestions).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                                    message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                            .then(collected => {
                                            response = collected.first();
                                            if(response === undefined) {
                                                let Embed_Error = {
                                                    title : `Timedout from Category Editting`,
                                                    des : `**Please Write within 2 Minutes given time**`
                                                 };
                                                 return ErrorEmbedGen(bot,Embed_Error,message);
                                            };
                                            if(!NaN(`${response.content}`)) {
                                                let Embed_Error = {
                                                    title : `Invalid/Blank Value is Detected`,
                                                    des : `**Please Give the Allocation Amount as Number Format**`
                                                };
                                                return ErrorEmbedGen(bot,Embed_Error,message);
                                            };
                                            let Temp_Book = {
                                                Type : `Disk`,
                                                Value : `${response.content}`,
                                                GuildID : `${args[1]}`,
                                            };
                                            return Edit_Server_J4R(bot,Temp_Book,message);
                                    });
        }
        else if(option.toLowerCase().trim() === 'swap') {
            Embed_Build.setColor(`RANDOM`)
            .setAuthor('G-Host Hosting Services', 'https://i.imgur.com/w4rp9MW.gif', 'https://discord.gg/WawsasenTk')
            .setDescription(` Write the Allocated **S.W.A.P** for the Join for Resources\nPlease write within ${hash} 2 Minute ${hash}`);
    
                                    message.channel.send(EmbedQuestions).catch(err => { return message.author.send(`__**Missing Permissions in Server/Channels**__\n**${message.guild.name}**\n\n__**Missing Permissions**__\n${hash} Send Messages OR Manage Messages ${hash}`).catch(err => { return; }); });
                                    message.channel.awaitMessages(filter, { max: 1 , time: 2*60*1000,error: [`time`]})
                                            .then(collected => {
                                            response = collected.first();
                                            if(response === undefined) {
                                                let Embed_Error = {
                                                    title : `Timedout from Category Editting`,
                                                    des : `**Please Write within 2 Minutes given time**`
                                                 };
                                                 return ErrorEmbedGen(bot,Embed_Error,message);
                                            };
                                            if(!NaN(`${response.content}`)) {
                                                let Embed_Error = {
                                                    title : `Invalid/Blank Value is Detected`,
                                                    des : `**Please Give the Allocation Amount as Number Format**`
                                                };
                                                return ErrorEmbedGen(bot,Embed_Error,message);
                                            };
                                            let Temp_Book = {
                                                Type : `Swap`,
                                                Value : `${response.content}`,
                                                GuildID : `${args[1]}`,
                                            };
                                            return Edit_Server_J4R(bot,Temp_Book,message);
                                    });
        }
        else {
            let Embedm = {
                    title : 'Invalid Value or Blank Value Error',
                    des : `**Invalid Value is Detected**\n**Help Commands Panel :** ${hash}${prefix_guild}help${hash}\n**Game Server Status Help Command :** ${hash}${prefix_guild}status help${hash}`
                };
            return ErrorEmbed(bot,Embedm,message);
        };
    });
        
    }
    else if(args[0].toLowerCase().trim() === `check`) {
        if(!args[1]) {
            let Embed_Error = {
                title : `Invalid/Blank Server ID is Detected`,
                des : `**Please Give Some Valid Server ID to Check**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        for(count = 0;count < Join_for_Resources_Datas.length;++count) {
            if(`${args[1].trim()}` === `${Join_for_Resources_Datas[count].GuildID}`) { Book = Join_for_Resources_Datas[count]; };
        };
        if(!Book) { 
                let Embed_Error = {
                    title : `Invalid/Blank Data is Detected`,
                    des : `**No Server Related to Server ID " ${hash}${args[1]}${hash} " is present in Database to Check**`
                };
                return ErrorEmbedGen(bot,Embed_Error,message);
            };
            let Embeds = {
                title : `Server Data for Join for Resources`,
                des : `__**Information**__\n**Server Name -** ${hash}${Book.Name}${hash}\n**Allocated R.A.M -** ${hash}${Book.Ram}${hash}\n**Allocated C.P.U -** ${hash}${Book.Cpu}${hash}\n**Allocated Disk -** ${hash}${Book.Disk}${hash}\n**Allocated S.W.A.P -** ${hash}${Book.Swap}${hash}`
            };
            return NormalEmbedGen(bot,Embeds,message);
    }
    else if(args[0].toLowerCase().trim() === `list`) {
        if(!args[1]) {
            let Embed_Error = {
                title : `Invalid/Blank Server ID is Detected`,
                des : `**Please Give Some Valid Server ID to Check**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        for(count = 0;count < Join_for_Resources_Datas.length;++count) {
            if(`${args[1].trim()}` === `${Join_for_Resources_Datas[count].GuildID}`) { Book = Join_for_Resources_Datas[count]; };
        };
        if(!Book) { 
            let Embed_Error = {
                title : `Invalid/Blank Data is Detected`,
                des : `**No Server Related to Server ID " ${hash}${args[1]}${hash} " is present in Database to Check**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        for(count = 0;count < Join_for_Resources_Journals.length;++count) {
            if(`${args[1].trim()}` === `${Join_for_Resources_Journals[count].GuildID}`) { Cache_List.push(Join_for_Resources_Journals[count]); };
        };
        if(Cache_List.length > 0) Cache_Last_Customer = `${Cache_List[count - 1].Username}`;
        else { Cache_Last_Customer = `No Users Allocated`; };
        let Embeds = {
            title : `Users Info of Allocated Server`,
            des : `__**Information List**__\n**Total Users Allocated -** ${hash}${Cache_List.length}${hash}\n**Recent User Allocated -** ${hash}${Cache_Last_Customer}${hash}`
        };
        return NormalEmbedGen(bot,Embeds,message);
    }
    else {
        if(!args[1]) {
            let Embed_Error = {
                title : `Invalid/Blank Value is Detected`,
                des : `**Please Give Some Valid Values or Sub-Command to Proceed**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
    };

},
};