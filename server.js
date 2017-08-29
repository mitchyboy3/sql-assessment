const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const mainCtrl = require('./mainCtrl');
const config = require('./config');

const connectionString = config.connectionString;

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
// host: config.host, //host,
// port: config.port, //port,
// database: config.database, //database,
// user: config.user, //user,
// password: config.password //password

massive(connectionString).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============

app.get('/api/users', mainCtrl.getUsers);
app.get('/api/vehicles', mainCtrl.getVehicles);
app.get('/api/user/:userId/vehiclecount', mainCtrl.getVehicleCount);
app.get('/api/user/:userId/vehicle', mainCtrl.getUserVehicles);
app.get('/api/vehicle', mainCtrl.getUserVehiclesQuery);
app.get('/api/newervehiclesbyyear', mainCtrl.getNewerVehicles);

app.post('/api/users', mainCtrl.createUser);
app.post('/api/vehicles', mainCtrl.createVehicle);

app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.updateOwner);

app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.deleteOwner);
app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteVehicle);






// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
