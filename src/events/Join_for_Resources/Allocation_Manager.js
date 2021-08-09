const hash = '`';
require('dotenv').config();
const { Ptero_Token, Ptero_Host_Url } = process.env;
const Ptero = require('@linux123123/jspteroapi');
const { DM_ErrorEmbedGen } = require('../../util/Embed_Generator.js');
const { Register_User_J4R, Remove_User_J4R } = require('../.././databases/db_j4r.js');

module.exports = {
  Add_Resources_J4R: function (bot, member, Book) {
    const Admin = new Ptero.Application(`${Ptero_Host_Url}`, `${Ptero_Token}`);
    let count = 0;
    let Old_Server_Details = null;
    Admin.getAllUsers({ servers: true }).then(Users_List => {
      for (count = 0; count < Users_List.length; ++count) {
        if (`${Users_List[count].attributes.username}` === `${Book.UserID}`) {
          if (Users_List[count].attributes.relationships.servers.data[0]) { Old_Server_Details = Users_List[count].attributes.relationships.servers.data[0]; break; }
          else {
            let Embede = {
              title: `No Server has been Detected in Panel`,
              des: `**Please Create Server in G-Host Hosting Client Panel**\n**Is this a Wrong Message ? Contact Bot Developer or Management Team to Consult**`
            };
            return DM_ErrorEmbedGen(bot, Embede, member.user);
          };
        };
      };
      if (!Old_Server_Details) {
        let Embede = {
          title: `No Registration has been Detected`,
          des: `**Please Create Account at G-Host Client Panel to get Resources from J.4.R**\n**Is this a Wrong Message ? Contact Bot Developer or Management Team to Consult**`
        };
        return DM_ErrorEmbedGen(bot, Embede, member.user);
      };
      let New_Resources = {
        ServerID: Old_Server_Details.attributes.id,
        Ram: Old_Server_Details.attributes.limits.memory + Book.Ram,
        Cpu: Old_Server_Details.attributes.limits.cpu + Book.Cpu,
        Disk: Old_Server_Details.attributes.limits.disk + Book.Disk,
        Swap: Old_Server_Details.attributes.limits.swap + Book.Swap,
      };
      Admin.editServerBuild(New_Resources.ServerID, {
        cpu: New_Resources.Cpu,
        memory: New_Resources.Ram,
        disk: New_Resources.Disk,
        swap: New_Resources.Swap
      }).then(() => {
        Book.Guild_Name = `${member.guild.name}`;
        return Register_User_J4R(bot, Book, member);
      }).catch(err => {
        let Embede = {
          title: `Join for Resources Error is Detected`,
          des: `**Please Contact Bot Developer or Management Team Right Now**\n**Something Bad happened to Node/Server of G-host**\n**Your Resources are not Credited on your Account/Server Till now**\n**Join the Support Server Right now to Report this Issue**`
        };
        return DM_ErrorEmbedGen(bot, Embede, member.user);
      });
    }).catch(err => {
      let Embede = {
        title: `Join for Resources Error is Detected`,
        des: `**Please Contact Bot Developer or Management Team Right Now**\n**Something Bad happened to Node/Server of G-host**\n**Your Resources are not Credited on your Account/Server Till now**\n**Join the Support Server Right now to Report this Issue**`
      };
      return DM_ErrorEmbedGen(bot, Embede, member.user);
    });
  },
  Remove_Resources_J4R: function (bot, member, Book) {
    const Admin = new Ptero.Application(`${Ptero_Host_Url}`, `${Ptero_Token}`);
    let count = 0;
    let Old_Server_Details = null;
    Admin.getAllUsers({ servers: true }).then(Users_List => {
      for (count = 0; count < Users_List.length; ++count) {
        if (`${Users_List[count].attributes.username}` === `${Book.UserID}`) {
          if (Users_List[count].attributes.relationships.servers.data[0]) { Old_Server_Details = Users_List[count].attributes.relationships.servers.data[0]; break; }
          else {
            let Embede = {
              title: `No Registration has been Detected`,
              des: `**Please Create Account at G-Host Client Panel to get Resources from J.4.R**\n**Is this a Wrong Message ? Contact Bot Developer or Management Team to Consult**`
            };
            return DM_ErrorEmbedGen(bot, Embede, member.user);
          };
        };
      };
      if (!Old_Server_Details) {
        let Embede = {
          title: `Join for Resources Error is Detected`,
          des: `**Please Contact Bot Developer or Management Team Right Now**\n**Something Bad happened to Node/Server of G-host**\n**Your Resources are not Credited on your Account/Server Till now**\n**Join the Support Server Right now to Report this Issue**`
        };
        return DM_ErrorEmbedGen(bot, Embede, member.user);
      };
      let New_Resources = {
        ServerID: Old_Server_Details.attributes.id,
        Ram: Old_Server_Details.attributes.limits.memory - Book.Ram,
        Cpu: Old_Server_Details.attributes.limits.cpu - Book.Cpu,
        Disk: Old_Server_Details.attributes.limits.disk - Book.Disk,
        Swap: Old_Server_Details.attributes.limits.swap - Book.Swap,
      };

      if (New_Resources.Ram < 0) New_Resources.Ram = 0;
      if (New_Resources.Cpu < 0) New_Resources.Cpu = 0;
      if (New_Resources.Disk < 0) New_Resources.Disk = 0;
      if (New_Resources.Swap < 0) New_Resources.Swap = 0;

      Admin.editServerBuild(New_Resources.ServerID, {
        cpu: New_Resources.Cpu,
        memory: New_Resources.Ram,
        disk: New_Resources.Disk,
        swap: New_Resources.Swap
      }).then(() => { return Remove_User_J4R(bot, Book, member); }).catch(err => {
        let Embede = {
          title: `Join for Resources Error is Detected`,
          des: `**Please Contact Bot Developer or Management Team Right Now**\n**Something Bad happened to Node/Server of G-host**\n**Your Resources are not Credited on your Account/Server Till now**\n**Join the Support Server Right now to Report this Issue**`
        };
        return DM_ErrorEmbedGen(bot, Embede, member.user);
      });
    }).catch(err => {
      let Embede = {
        title: `Join for Resources Error is Detected`,
        des: `**Please Contact Bot Developer or Management Team Right Now**\n**Something Bad happened to Node/Server of G-host**\n**Your Resources are not Credited on your Account/Server Till now**\n**Join the Support Server Right now to Report this Issue**`
      };
      return DM_ErrorEmbedGen(bot, Embede, member.user);
    });
  },
};