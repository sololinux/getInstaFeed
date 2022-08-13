//Required packages
require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const path = require('path');

//Setting view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './templates')));

app.listen(3000, () => {
    console.log('Server running in port 3000');
})

//----------------------------------------------------------------------------------------//

//The main routing
app.get('/', async (req, res) => {

    function getPost() {
        return new Promise((resolve, reject) => {
            fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,caption,timestamp,children{media_type,media_url}&access_token=${process.env.token}`)
                .then(response => response.json())
                .then(data => resolve(data.data))
                .catch(err => reject(err))
        })
    }   

    //render the data from Display API to index
    res.render('index', { data: await getPost() });
});




