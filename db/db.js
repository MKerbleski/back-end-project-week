const knex = require('knex');

const dbConfig = require('../knexfile');



const db = knex(dbConfig.development);

module.exports = {
    getNotes,
    addNote,
    deleteNote,
    editNote,
    addUser,
    getUser,
}


function getNotes(id){
    if(id){
        return db('notes').where('id', id)
    } else {
        return db('notes')
    }
}

function addNote(note){
    return db('notes').insert(note)
}//returns in an array which may be interesting

function deleteNote(noteId){
    return db('notes').where('id', '=', noteId).del()
}

function editNote(editId, newNote){
    return db('notes').where('id', editId).update(newNote)
}

function addUser(newUser){
    return db('users').insert(newUser)
}

function getUser(id){
    return db('users').where({id})
}

function getToken(id){
    this.getUser(id).then(user => {
        console.log(user)
    })
}