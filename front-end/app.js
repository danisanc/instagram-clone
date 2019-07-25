const express = require('express');
const execSQLQuery = require('./db')
const app = express();

// Middlewares
app.use(express.json())

// Routes
app.get('/', async function(req, res) {
  res.send('its working');
});

app.post('/customers/new', async function (req, res) {
  execSQLQuery(`INSERT INTO CUSTOMERS(ID, Event, Resource) VALUES ('${req.body.root.ResourceId}', '${req.body.root.Event}', '${req.body.root.Resource}')`, function(response) {
    res.send(response)
  });
});

app.post('/orders/new', async function(req, res) {
  execSQLQuery(`INSERT INTO ORDERS(ID, Event, Resource) VALUES ('${req.body.root.ResourceId}', '${req.body.root.Event}', '${req.body.root.Resource}')`, function(response) {
    res.send(response)
  });
});

// 4000
// '/srv/app110.c63a6ef8.configr.cloud/etc/nodejs/nodejs.sock'
app.listen('/srv/app110.c63a6ef8.configr.cloud/etc/nodejs/nodejs.sock', function() {
  console.log('App running!');
});