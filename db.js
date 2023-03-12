const Sequelize = require("sequelize");

// async function connectDB () {
    const sequelize = new Sequelize(
        'DB_NAME',
        'DB_USER',
        'DB_PASS',
         {
           host: 'localhost',
           dialect: 'mysql'
         }
       );

      //  try {
      //     await sequelize.authenticate();
      //     console.log('Connection has been established successfully.');
      //  } catch (err) {
      //     console.error('Unable to connect to the database: ', err);
      //  }
// }

module.exports = sequelize