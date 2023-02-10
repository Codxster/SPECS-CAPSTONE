const { Song } = require('../models/Song')
const { User } = require('../models/User')
const { savedSong } = require('../models/SavedSong')

module.exports = {
    getAllTracks: async (req, res) => {
        try {
            const { userId } = req.params
            const tracks = await Song.findAll({
                where: {userId},
                include: [
                    {
                        model: User,
                        required: true,
                        attributes: ['username']
                    }
                ]
            })
            res.status(200).send(tracks)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addTrack: async (req, res) => {
        try {
            const {
                track,
                artist,
                albumCover
            } = req.body
            const { userId } = req.params

            await Song.create({
                track,
                artist,
                albumCover,
                userId
            })

            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getTrack: async (req, res) => {
        try {
            const {userId} = req.params
            const savedSongs = await SavedSong.findAll({
                where: {userId},
                include: [{
                    model: Song,
                    require: true,
                    include: {
                        model: User,
                        required: true,
                        attributes: ["username"]
                    }
                }]
            })
            res.status(200).send(savedSongs)
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }

}