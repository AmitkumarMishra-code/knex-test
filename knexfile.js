// Update with your config settings.

module.exports = {

  development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './data/landerz.db3'
  //   },
  // useNullAsDefault: true
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  },

};

