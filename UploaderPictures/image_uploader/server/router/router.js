const route=require('express').Router()
const controller=require('../controller/controller');
const store=require('../middleware/multer');

route.get('/',controller.home);
route.get('/uploads',controller.all);
route.post('/uploadmultiple',store.array('images',12),controller.uploads) ;//images stoji zato sto je u index.hbs input type images a 12 oznacaava broj kolko moze da se aploduje slika
module.exports=route;