require('dotenv').config();
const mysql = require('mysql');

const {
  db_Database, db_Username, db_Password, db_Host,
} = process.env;
const { DB_Register } = require('../events/Database_Managemnet/Database_Managers.js');

module.exports = {
  DB_Connection(bot) {
    const connection = mysql.createConnection({
      host: db_Host,
      user: db_Username,
      password: db_Password,
      database: db_Database,
    });
    connection.connect((err) => { if (err) return console.error(`Bot is having Error with Database Connection - ${err}`); });
    bot.Connection = connection;
    return DB_Register(bot);
  },
};
