console.log('index.js called');
const app = require('./app');
const mongoose = require('./config/db');
const userModel = require('./model/users.model');
const port = 3000;

// app.get('/', (req, resp)=>{
//     resp.send({message: 'app is working properly'})
// })

app.listen(port, () => {
    console.log(`Your listing on http://localhost:${port}`)
  })