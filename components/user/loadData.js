const mongoose = require('mongoose');

let loadUsers = async () =>{
    const adrianoObj = {name: 'adriano', pass: '123456', role: 'admin'};
    //const mortadeloObj = {id: null, name: 'mortadelo', pass: '654321', role: 'client'};
    const adriano = new um.User(adrianoObj);
    await adriano.save();
}

loadUsers().then();