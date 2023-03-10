const Sequelize = require("sequelize");

async function connectDB () {
    const sequelize = new Sequelize(
        '<DATABASE>',
        '<USER',
        '<PASSWORD>',
         {
           host: 'localhost',
           dialect: 'mysql'
         }
       );

       try {
          await sequelize.authenticate();
          console.log('Connection has been established successfully.');
       } catch (err) {
          console.error('Unable to connect to the database: ', err);
       }
}

module.exports = {
    connectDB
}