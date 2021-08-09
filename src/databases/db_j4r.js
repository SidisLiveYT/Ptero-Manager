const { NormalEmbedGen,ErrorEmbedGen,DM_ErrorEmbedGen,DM_NormalEmbedGen } = require('.././util/Embed_Generator.js');
const hash = '`';
require('dotenv').config();

module.exports = {
Register_Server_J4R  : function (bot,Book,message) {

  const connection = bot.Connection;
  connection.query(`INSERT INTO J4R_Servers (GuildID,Name,Ram,Cpu,Disk,Swap) VALUES ('${Book[0]}','${Book[1]}','${Book[2]}','${Book[3]}','${Book[4]}','${Book[5]}')`, function (err) {
      if(err) {
          let Embed_Error = {
              title : `Error is Detcted in Database Gateway`,
              des : `**Please check for Database Issues or Database Conenction Issues**`
          };
          return ErrorEmbedGen(bot,Embed_Error,message);
      };
      connection.query(`SELECT * FROM J4R_Servers`, function (err,result) {
        if(err) {
            let Embed_Error = {
                title : `Error is Detcted in Database Gateway`,
                des : `**Please check for Database Issues or Database Conenction Issues**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        bot.j4r_DB = result;
        let Embeds = {
            title : `Server has been Saved for Join for Resources`,
            des : `**Server Name -** ${hash}${Book[1]}${hash} **has been Registered for Join for Resources**`
        };
        return NormalEmbedGen(bot,Embeds,message);
    });
  });
},
Delete_Server_J4R  : function (bot,Book,message) {

    const connection = bot.Connection;
    connection.query(`DELETE FROM J4R_Servers WHERE GuildID = '${Book}'`, function (err) {
        if(err) {
            let Embed_Error = {
                title : `Error is Detcted in Database Gateway`,
                des : `**Please check for Database Issues or Database Conenction Issues**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        connection.query(`SELECT * FROM J4R_Servers`, function (err,result) {
          if(err) {
              let Embed_Error = {
                  title : `Error is Detcted in Database Gateway`,
                  des : `**Please check for Database Issues or Database Conenction Issues**`
              };
              return ErrorEmbedGen(bot,Embed_Error,message);
          };
          bot.j4r_DB = result;
          let Embeds = {
              title : `Server has been Deleted from Join for Resources`,
              des : `**Server ID -** ${hash}${Book}${hash} **has been Removed for Join for Resources**`
          };
          return NormalEmbedGen(bot,Embeds,message);
      });
    });
  },
  Edit_Server_J4R  : function (bot,Book,message) {

    const connection = bot.Connection;
    connection.query(`UPDATE J4R_Servers SET ${Book.Type} = '${Book.Value}' WHERE GuildID = '${Book.GuildID}'`, function (err) {
        if(err) {
            let Embed_Error = {
                title : `Error is Detcted in Database Gateway`,
                des : `**Please check for Database Issues or Database Conenction Issues**`
            };
            return ErrorEmbedGen(bot,Embed_Error,message);
        };
        connection.query(`SELECT * FROM J4R_Servers`, function (err,result) {
          if(err) {
              let Embed_Error = {
                  title : `Error is Detcted in Database Gateway`,
                  des : `**Please check for Database Issues or Database Conenction Issues**`
              };
              return ErrorEmbedGen(bot,Embed_Error,message);
          };
          bot.j4r_DB = result;
          let Embeds = {
              title : `Server has been Edited from Join for Resources`,
              des : `**Server ID -** ${hash}${Book.GuildID}${hash} **has been Editted for Join for Resources**`
          };
          return NormalEmbedGen(bot,Embeds,message);
      });
    });
  },
  Register_User_J4R  : function (bot,Book,member) {
    const connection = bot.Connection;
    connection.query(`INSERT INTO J4R_Users_Journals (UserID,Username,GuildID,Guild_Name) VALUES ('${Book.UserID}','${Book.Name}','${Book.GuildID}','${Book.Guild_Name}')`, function (err) {
        if(err) { console.error(`Error is found :`+ err); };
        connection.query(`SELECT * FROM J4R_Users_Journals`, function (err,result) {
            if(err) { console.error(`Error is found :`+ err); };
          bot.j4r_Journals_DB = result;
          let Embeds = {
            title : `Resources has been Credited`,
            des : `**Your Resource has been Credited to your Server in G-Host Hosting Panel**\n__**Some Information**__\n**Added Ram -** ${hash}${Book.Ram}${hash}\n**Added Cpu -** ${hash}${Book.Cpu}${hash}\n**Added Disk -** ${hash}${Book.Disk}${hash}\n**Added Swap -** ${hash}${Book.Swap}${hash}\n\n**Fact :** *Your Resources will be Removed automatically from the Server if you leave the Server -* ${hash}${member.guild.name}${hash}`
          };
          return DM_NormalEmbedGen(bot,Embeds,member.user);
      });
    });
  },
  Remove_User_J4R  : function (bot,Book,member) {
    const connection = bot.Connection;
    connection.query(`DELETE FROM J4R_Users_Journals WHERE UserID = '${Book.UserID}'`, function (err) {
        if(err) { console.error(`Error is found :`+ err); };
        connection.query(`SELECT * FROM J4R_Users_Journals`, function (err,result) {
            if(err) { console.error(`Error is found :`+ err); };
          bot.j4r_Journals_DB = result;
          let Embeds = {
            title : `Resources has been Debited`,
            des : `**Your Resource has been Debited from your Server in G-Host Hosting Panel**\n__**Some Information**__\n**Removed Ram -** ${hash}${Book.Ram}${hash}\n**Removed Cpu -** ${hash}${Book.Cpu}${hash}\n**Removed Disk -** ${hash}${Book.Disk}${hash}\n**Removed Swap -** ${hash}${Book.Swap}${hash}\n\n**Fact :** *Your Resources have been Removed automatically from the Server because you left the join for Resource Server -* ${hash}${member.guild.name}${hash}`
          };
          return DM_NormalEmbedGen(bot,Embeds,member.user);
      });
    });
  },
}