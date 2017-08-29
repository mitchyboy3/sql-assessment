module.exports = {
  getUsers:(req, res)=>{
    const db = req.app.get('db');
    db.allUsers()
    .then( users => res.status(200).send(users))
    .catch( err => res.status(500).send(err))
  },
  getVehicles:(req, res)=>{
    const db = req.app.get('db');
    db.allVehicles()
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  createUser:(req, res)=>{
    const db = req.app.get('db');
    db.newUser([req.body.name, req.body.email])
    .then( users => res.status(200).send(users))
    .catch( err => res.status(500).send(err))
  },
  createVehicle:(req, res)=>{
    const db = req.app.get('db');
    db.newVehicle([req.body.make, req.body.model, req.body.year, req.body.owner_id])
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  getVehicleCount:(req, res)=>{
    const db = req.app.get('db');
    db.vehicleCount([req.params.userId])
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  getUserVehicles:(req, res)=>{
    const db = req.app.get('db');
    db.userVehicles([req.params.userId])
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  getUserVehiclesQuery:(req, res)=>{
    const db = req.app.get('db');
    sqlReady = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1) + '%';
    }
    if(req.query.userFirstStart){
      const name = sqlReady(req.query.userFirstStart)
      db.userVehiclesName([name])
      .then( vehicles => res.status(200).send(vehicles))
      .catch( err => res.status(500).send(err))
    } else {
        db.userVehiclesEmail([req.query.userEmail])
          .then( vehicles => res.status(200).send(vehicles))
          .catch( err => res.status(500).send(err))
      }
  },
  getNewerVehicles:(req, res)=>{
    const db = req.app.get('db');
    db.year2000()
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  updateOwner:(req, res)=>{
    const db = req.app.get('db');
    db.changeOwner([req.params.userId, req.params.vehicleId])
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  deleteOwner:(req, res)=>{
    const db = req.app.get('db');
    db.removeOwner([req.params.vehicleId])
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  deleteVehicle:(req, res)=>{
    const db = req.app.get('db');
    db.deleteVehicleById([req.params.vehicleId])
    .then( vehicles => res.status(200).send(vehicles))
    .catch( err => res.status(500).send(err))
  },
  






}
