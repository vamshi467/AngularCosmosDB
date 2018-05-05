module.exports.start = start;

function start() {
  // const dotenv = require('dotenv');
  if (!process.env.NODE_ENV) {
    // if (dotenv.error) {
    console.error(
      'ENV variables are missing.',
      'Verify that you have set them directly or in a .env file.'
    );
    process.exit(1);
  }

  const express = require('express');
  const security = require('./security');
  const bodyParser = require('body-parser');
  const routes = require('./routes');

  const port = process.env.SERVER_PORT;
  const www = process.env.WWW || './';

  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(security());

  app.use(express.static(www));
  console.log(`serving ${www}`);
  app.use('/api', routes);
  app.get('*', (req, res) => {
    res.sendFile(`index.html`, { root: www });
  });

  app.listen(port, () =>
    console.log(`API running on http://localhost:${port}`)
  );
}