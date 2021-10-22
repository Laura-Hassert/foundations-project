const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  });

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../styles.css'))
});

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../main.js'))
});

let id = 4;

const locations = [
    {
        "id": 1,
        "city": "San Diego",
        "state": "California",
        "favorite": "petting the seals!",
        "image": "https://tipsforfamilytrips.com/wp-content/uploads/2017/03/featuredseals.jpg",
        "returning": "Absolutely!"
    },
    {
        "id": 2,
        "city": "New Orleans",
        "state": "Louisiana", 
        "favorite": "Bourbon Street!!",
        "image": "https://images.fineartamerica.com/images-medium-large-5/bourbon-street-at-night-john-ullrick.jpg",
        "returning": "Maybe"
    },
    {
        "id": 3,
        "city": "New York",
        "state": "New York", 
        "favorite": "the High Line!",
        "image": "https://edc.nyc/sites/default/files/styles/1x1_md/public/2019-06/projects-the-highline-photo-brittany-petronella-nyc-and-company-05.jpg?h=56d0ca2e&itok=QtaAWDVi",
        "returning": "Absolutely!"
    }
]

app.get('/diary', (req, res) => {
    res.status(200).send(locations)
});

app.delete('/diary/:id', (req, res) => {

    const { id } = req.params;

    const tgtIndex = locations.findIndex(function(entryObj) {
        return entryObj.id === parseInt(id); 
    })

    if (tgtIndex === -1) {
        res.status(404).send('Entry not found')
    } else {
        locations.splice(tgtIndex, 1);
        res.status(200).send(locations);
    }
});

app.post('/diary', (req, res) => {
    const { city, state, favorite, image, returning } = req.body;

    const newEntry = {
        id,
        city,
        state,
        image,
        favorite,
        returning
    }

    id++
    locations.push(newEntry)
    res.status(200).send(locations)

});

// app.get('/diary/return-trip', (req, res) => {
//     let newArr = []
//     if(locations.returning.value === "Absolutely!") {
//         newArr.push()
//     } else {
//         res.status(400).send('No trips to display')
//     }

//     let random = Math.floor(Math.random() * newArr.length)
//     res.status(200).send(random)
// });


const port = process.env.PORT || 4000
app.listen(port, () => {console.log(`Your server is up on port ${port}`)});