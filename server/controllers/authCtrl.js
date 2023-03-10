const {User} = require('../models/User')
require('dotenv').config()
const {SECRET} = process.env
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (username, id) => {
    return jwt.sign({username, id},SECRET,{expiresIn: '2 days'})
}

module.exports = {
    register: async (req, res) => {
        try {
            const {username, password, penName} = req.body
            let foundUser = await User.findOne({where: {username}})

            if(foundUser){
                console.log(foundUser)
                res.status(400).send('That username is taken, please register with a different username or login')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({
                    username,
                    hashedPass: hash,
                    penName
                })
                const token = createToken(newUser.username, newUser.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.username,
                    userId: newUser.id,
                    penName: newUser.penName,
                    token,
                    exp
                })
            }
        } catch(err) {
            console.log(err)
            res.sendStatus(400)
        }
    },
    login: async (req, res) => {
        try {
            const {username, password} = req.body
            const foundUser = await User.findOne({where: {username}})
            console.log()
            if(foundUser){
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)

                if(isAuthenticated){
                    const token = createToken(foundUser.username, foundUser.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        username: foundUser.username,
                        userId: foundUser.id,
                        penName: foundUser.penName,
                        token,
                        exp
                    })
                }  else {
                    res.status(400).send('That password is incorrect.')
                }

            } else {
                res.status(400).send('There is no user with that username.')
            }

        } catch (err){
            console.log(err)
            res.sendStatus(400)
        }
        
    }
}