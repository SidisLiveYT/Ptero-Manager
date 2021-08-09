module.exports = {
  async DB_Register(bot, checks) {
    const con = bot.Connection;
    con.query('CREATE TABLE IF NOT EXISTS J4R_Servers (GuildID VARCHAR(225) PRIMARY KEY,Name VARCHAR(225),Ram VARCHAR(225),Cpu VARCHAR(225),Disk VARCHAR(225),Swap VARCHAR(225))', (err) => { // Elements --> ID & Refers
      if (err) { console.error(`Error is found :${err}`); }
      con.query('CREATE TABLE IF NOT EXISTS J4R_Users_Journals (UserID VARCHAR(225),Username VARCHAR(225),GuildID VARCHAR(225),Guild_Name VARCHAR(225))', (err) => { // Elements --> ID & Refers
        if (err) { console.error(`Error is found :${err}`); }

        con.query('SELECT * FROM J4R_Servers', (err, result) => {
          if (err) { console.error(`Error is found :${err}`); }
          bot.j4r_DB = result;

          con.query('SELECT * FROM J4R_Users_Journals', (err, result) => {
            if (err) { console.error(`Error is found :${err}`); }
            bot.j4r_Journals_DB = result;
          });
        });
      });
    });
  },
};
