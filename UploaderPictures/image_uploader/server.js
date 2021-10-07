const express=require('express');
const app=express();

const hbs=require('express-handlebars');
const path=require('path');
//const route = require('./server/router/router');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
//connect mongodb database
require('./server/database/database')();
//setup view engine
app.set('view engine','hbs');
app.engine('hbs',hbs({
    extname:'hbs',
    defaultView:'default',
    layoutsDir:path.join(__dirname,'views'),
    partialsDir:path.join(__dirname,'views/partials')
}))
//calling router.js file
app.use('/',require('./server/router/router'));
/*app.get('/',(req,res)=>
{
    res.render("main")
})*/

app.listen(3000,()=>console.log(`Server is started on http://localhost:3000`));