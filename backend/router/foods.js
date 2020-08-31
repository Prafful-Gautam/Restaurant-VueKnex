const express = require('express');
const foodRouter = express.Router();
const knex = require('../db/knex');

//Add food in restaurant
foodRouter.post('/restaurant-foods', (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  console.log('file--->',req.file);
  console.log('url--', url)
 
  const food = {name: req.body.name, imagePath: url + "/images/" + req.file.filename, restId: +req.body.restaurant_id};
  console.log('---', food);
  knex('foods').insert({name: food.name, imagePath: food.imagePath, restaurant_id: food.restId})
    .then(() => {res.status(201).json({msg:'food added successfully!'})})
    .catch(err => console.log(err))  
})

foodRouter.get('/restaurant-foods', (req, res) => {
    console.log(req.query)
    knex('foods').where('restaurant_id', req.query.restId).then((foods) => {
        res.status(201).json(foods);
    })
    .catch((err) => console.log(err))
});

foodRouter.delete('/restaurant-foods/:id', (req, res)=>{
    console.log(req.params.id);
  knex('foods').where('id', req.params.id).del()
    .then(()=> {
        res.send({message: `Food with id ${req.params.id} successfully deleted!`})
    })
    .catch(err => console.log(err))      
})

module.exports = foodRouter;
