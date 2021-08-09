const hash = '`';
const { Add_Resources_J4R,Remove_Resources_J4R } = require('./Allocation_Manager.js');

module.exports = {
Checker_Add_User_J4R  : function (bot,member) {
    let Book_Details = {
        GuildID : `${member.guild.id}`,
        UserID : `${member.id}`,
        Username : `${member.username}`,
    };
    let count = 0;
    let Join_for_Resources_Datas = bot.j4r_DB;
    let Join_for_Resources_Journals = bot.j4r_Journals_DB;
    let Book_Journal = null;
    let Book_J4r_Servers = null;

    for(count = 0;count < Join_for_Resources_Datas.length;++count) {
        if(`${Book_Details.GuildID.trim()}` === `${Join_for_Resources_Datas[count].GuildID}`) { Book_J4r_Servers = Join_for_Resources_Datas[count]; break; };
    };

    for(count = 0;count < Join_for_Resources_Journals.length;++count) {
        if(`${Book_Details.UserID.trim()}` === `${Join_for_Resources_Journals[count].UserID}`) { if(`${Book_Details.GuildID.trim()}` === `${Join_for_Resources_Journals[count].GuildID}`) { Book_Journal = Join_for_Resources_Journals[count]; break; }; };
    };

    if(!Book_J4r_Servers) { return; }
    else if(Book_Journal) { return; };
    return bot.guilds.fetch(`806906773268332574`).then(G_Host_Guild => { return G_Host_Guild.members.fetch(`${Book_Details.UserID}`).then( () => {
    let Allocations_Resources = {
        UserID : Book_Details.UserID,
        Name : Book_Details.Username,
        GuildID : Book_Details.GuildID,
        Ram : Number(Book_J4r_Servers.Ram),
        Cpu : Number(Book_J4r_Servers.Cpu),
        Disk : Number(Book_J4r_Servers.Disk),
        Swap : Number(Book_J4r_Servers.Swap)
    };
    return Add_Resources_J4R(bot,member,Allocations_Resources);
}).catch(err => { return; }); }).catch(err => { return; });

},
Checker_Remove_User_J4R  : function (bot,member) {
    let Book_Details = {
        GuildID : `${member.guild.id}`,
        UserID : `${member.user.id}`,
        Username : `${member.user.username}`,
    };
    let count = 0;
    let Join_for_Resources_Datas = bot.j4r_DB;
    let Join_for_Resources_Journals = bot.j4r_Journals_DB;
    let Book_Journal = null;
    let Book_J4r_Servers = null;

    for(count = 0;count < Join_for_Resources_Datas.length;++count) {
        if(`${Book_Details.GuildID.trim()}` === `${Join_for_Resources_Datas[count].GuildID}`) { Book_J4r_Servers = Join_for_Resources_Datas[count]; break; };
    };

    for(count = 0;count < Join_for_Resources_Journals.length;++count) {
        if(`${Book_Details.UserID.trim()}` === `${Join_for_Resources_Journals[count].UserID}`) { if(`${Book_Details.GuildID.trim()}` === `${Join_for_Resources_Journals[count].GuildID}`) { Book_Journal = Join_for_Resources_Journals[count]; break; }; };
    };

    if(!Book_J4r_Servers) { return; }
    else if(!Book_Journal) { return; };
    return bot.guilds.fetch(`806906773268332574`).then(G_Host_Guild => { return G_Host_Guild.members.fetch(`${Book_Details.UserID}`).then( () => {
        let Allocations_Resources = {
            UserID : Book_Details.UserID,
            Name : Book_Details.Username,
            GuildID : Book_Details.GuildID,
            Ram : Number(Book_J4r_Servers.Ram),
            Cpu : Number(Book_J4r_Servers.Cpu),
            Disk : Number(Book_J4r_Servers.Disk),
            Swap : Number(Book_J4r_Servers.Swap)
        };
        return Remove_Resources_J4R(bot,member,Allocations_Resources);
    }).catch(err => { return; }); }).catch(err => { return; });
  },
};