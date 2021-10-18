const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let id = 3;

const locations = [
    {
        "id": 1,
        "city": "San Diego",
        "state": "California",
        "favorite": "Petting the seals!",
        "image": "https://tipsforfamilytrips.com/wp-content/uploads/2017/03/featuredseals.jpg",
        "return": "Absolutely!"
    },
    {
        "id": 2,
        "city": "New Orleans",
        "state": "Louisiana", 
        "favorite": "Bourbon Street!!",
        "image": "https://images.fineartamerica.com/images-medium-large-5/bourbon-street-at-night-john-ullrick.jpg",
        "return": "Maybe"
    },
    {
        "id": 3,
        "city": "New York",
        "state": "New York", 
        "favorite": "The High Line!",
        "image": "https://edc.nyc/sites/default/files/styles/1x1_md/public/2019-06/projects-the-highline-photo-brittany-petronella-nyc-and-company-05.jpg?h=56d0ca2e&itok=QtaAWDVi",
        "return": "Absolutely!"
    }
]

app.get('/diary', (req, res) => {
    res.status(200).send(locations)
});

app.delete('/diary/entry:id', (req, res) => {
    const { id } = req.params;

    const tgtIndex = locations.findIndex(function(locationObj) {
        return locationObj.id === parseInt(id);
    })

    if (tgtIndex === -1) {
        res.status(404).send('Entry not found!')
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

    locations.push(newEntry);
    id++;
    res.status(200).send(locations)
});

app.get('/diary/return-trips', (req, res) => {
    if (returning.value === "Absolutely!") {
        res.status(200).send(locations)
    } else {
        res.status(400).send('No locations meet this criteria')
    }
});

const port = process.env.PORT || 4000
app.listen(port, () => {console.log(`Your server is up on port ${port}`)});