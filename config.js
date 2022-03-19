// Author : Sai Rahul Kodumuru (B00875628)
require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  // Heroku
  PORT = process.env.PORT;
  ENV = 'PRODUCTION';
} else {
  // Local
  PORT = 3000;
  ENV = 'DEVELOPMENT';
}

NODE_JS_VERSION = process.version;
DB_URL = process.env.PROD_DB_URL;

console.log(
  `\n-> Time: ${new Date()}
-> Current Environment: ${ENV}
-> NodeJS Version: ${NODE_JS_VERSION}
-> Loading the env context with: ${Object.keys(process.env).length} keys`
);

module.exports = { PORT, ENV, DB_URL };
