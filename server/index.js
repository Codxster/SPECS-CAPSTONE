require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {sequelize} = require('./util/database')

const {SERVER_PORT} = process.env
const {User} = require('./models/User')
const {Song} = require('./models/Song')
const {Rating} = require('./models/SavedSong')

const {login, register} = require('./controllers/authCtrl')

const { getAllTracks, addTrack, getTrack} = require('./controllers/trackCtrl')

const app = express()

app.use(express.json())
app.use(cors())


User.hasMany(Song)
Song.belongsTo(User)

Song.hasMany(Rating)
Rating.belongsTo(Song)

app.post('/login', login)
app.post('/register', register)

app.get('/api/track/:userId', getTrack)
app.post('/api/track/:userId', addTrack)

app.get('/api/allOftracks/:userId', getAllTracks)

// sequelize.sync() 
sequelize.sync({force: true})
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`take us to warp ${SERVER_PORT}!`))
    })
    .catch(err => console.log(err))
