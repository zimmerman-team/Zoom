const dotenv = require('dotenv-extended');
const getenv = require('getenv');

dotenv.config({ path: '.env' });
dotenv.load();

const overrideEnvVars = config => {
  const baseUrl = getenv.string('REACT_APP_CYPRESS_baseUrl', '');
  const username = getenv.string('REACT_APP_CYPRESS_USER', '');
  const password = getenv.string('REACT_APP_CYPRESS_PASS', '');
  if (baseUrl !== '') config.baseUrl = baseUrl;
  if (username !== '') config.env.username = username;
  if (password !== '') config.env.password = password;
  return config;
};

module.exports = (on, config) => {
  return overrideEnvVars(config);
};
