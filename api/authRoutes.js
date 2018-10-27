const express = require('express');
const axios = require('axios')

const auth = express.Router();

const dbFunc = require('../db/db.js')

auth.use(express.json());

auth.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN api/auth/ is running."})
})

auth.get('/twitter', (req, res) => {
    console.log(req)
    // dbFunc.saveTwitterToken().then(res => {
    //     console.log('resend to get teh real token')
    // })
    res.status(200).json({message: "twitter auth token recieved"})
})

auth.get('/slack/:id', (req, res) => {
    console.log(req.params.id)//should be username
    if(req.query.code){
        console.log(req.query.code, '3')
        console.log(req.query.state, '4')
        // dbFunc.saveTwitterToken().then(res => {
        //     console.log('resend to get teh real token')
        // })
        let code = req.query.code
        let username = req.params.id
        let client_id = '465374768868.465546770546'//should be var
        let client_secret = '1324d3625083c4b5a834b58b5c1a9e3c' //should be var
        let redirect_uri = `http://localhost:3333/api/auth/slack/${username}` //should be self
        let tokenRequest = `client_id=${client_id}&code=${code}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`
        console.log(tokenRequest, 'tokenRequest')
        axios.post('https://slack.com/api/oauth.access', tokenRequest).then(foo => {
            // console.log(res, 'res')
            console.log(foo, 'foo')
            let token = foo.data.access_token
            console.log(token)
            dbFunc.addAccessToken(req.params.id, token).then(foobar => {
                res.status(200).json(foobar)
            }).catch(err => {
                res.status(400).send(err)
            })
        }).catch(err => {
            console.log(err.message, "there was an error processing your request")
        })
    } else {
        res.send(500).send('unable to process request. failed at redirect_uri')
    }
})

module.exports = auth
