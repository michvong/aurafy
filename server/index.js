const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const routes = require('./routes/index');
const store = require('./store');

const app = express();

app.use(express.json());
app.use(cors());

app.locals.store = store;

app.use('/', authRoutes, routes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('An error occurred');
});

app.listen(config.SERVER_PORT, () => console.log(`Server running on port ${config.SERVER_PORT}`));
