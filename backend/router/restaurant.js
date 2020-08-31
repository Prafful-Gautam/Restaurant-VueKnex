const express = require('express')
const router = express.Router();
const fs = require('fs');
const knex = require('../db/knex');

//get City 
router.get('/city', (req, res) => {
    fs.readFile('./city.json', (err, data) => {
        if(err){
            console.log(err); 
            return
        }
        let rawData = JSON.parse(data);
        return res.send(rawData);
    });
})

//Add restaurant
router.post('/restaurant', (req, res) => {
    console.log('---------',req.body)
    let city  = {name: req.body.city};

    //Check if city exists
    knex('city').where('name', city.name)
        .then((result) => {
            if(result.length === 0){
                //insert city
                knex('city').insert({name: city.name}).then(() => {
                    //Again search req city
                    knex('city').where('name', city.name).then((result) => {
                    const rest = {name: req.body.name, type: req.body.type, city_id: result[0].id}
                    console.log(rest) 
                    //Add restaurant
                    knex('restaurants').insert({name: rest.name, type: rest.type, city_id: rest.city_id})
                        .then(() => res.send({message: 'restaurant added!'}));
                    })
                               
                }).catch((err) => console.log(err))
                
            }
            if(result.length === 0 || result.length !==0){
                knex('city').where('name', city.name).then((result) => {
                    if(result.length){
                        const rest = {name: req.body.name, type: req.body.type, city_id: result[0].id}
                        console.log(rest) 
                        knex('restaurants').insert({name: rest.name, type: rest.type, city_id: rest.city_id})
                            .then(() => res.send({message: 'restaurant added!'}));
                    }
                })
                .catch(err => console.log(err))
            }
            

        })
        .catch((err) => console.log(err))
});

//Get All restaurants
router.get('/get-restaurants', (req, res) => {
    knex('restaurants').then((result)=>{
        res.send(result);
    }).catch(err => console.log(err))
});

//Get restaurant by Id
router.get('/get-restaurant/:id', (req, res) => {
    knex('restaurants').where({id: req.params.id}).then((result) => {
        res.send(result);
    })
});

module.exports = router;