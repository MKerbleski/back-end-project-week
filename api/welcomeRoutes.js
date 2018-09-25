const express = require('express');
const bcrypt = require('bcryptjs');

const welcome = express.Router();

const dbFunc = require('../db/db.js')

const knex = require('knex');
const uniqid = require('uniqid')
const dbConfig = require('../knexfile');

const { jwtKey } = require('../_secrets/keys.js')

const jwt = require('jsonwebtoken')

const db = knex(dbConfig.development);

function generateToken(user){
    const payload = {
      username: user.username,
      firstname: user.firstname,
      lastame: user.lastname,
    }

    const options = {
      expiresIn: '2w',
      jwtid: uniqid(),
    }

    return jwt.sign(payload, jwtKey, options)
}


welcome.use(express.json());

welcome.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN /welcome is running."})
})

welcome.post('/register', (req, res) => {
    const newUser = req.body; 
    const hash = bcrypt.hashSync(newUser.password, 3);
    newUser.password = hash

    dbFunc.addUser(newUser).then(id => {
        db('users').where({id}).then(user => {
            const token = generateToken(user);
            res.status(200).json(token)
        }).catch({message: "user added but token not generated"})
    }).catch(err => {
        res.status(500).json({message: "there was a problem creating a new user", error: err})
    })
})


module.exports = welcome