const locationContainer = document.querySelector('#location-container');
const form = document.querySelector('form');

const baseURL = 'http://localhost:4000/diary'

const diaryEntries = ({ data: locations }) => showLocations(locations)

const getAllEntries = () => axios.get(baseURL)
    .then(diaryEntries)
    .catch(err => console.log(err))

const addEntry = body => axios.post(baseURL, body)
    .then(diaryEntries)
    .catch(err => console.log(err))

const deleteEntry = id => axios.delete(`${baseURL}/entry:${id}`)
    .then(diaryEntries)
    .catch(err => console.log(err))

const getReturnTrips = () => axios.get(`${baseURL}/return-trips`)
    .then(diaryEntries)
    .catch(err => console.log(err))


function futureTrip(){
    for (let i = 0; i < locations.length; i++) {
        if(locations.returning === "Absolutely!") {
            
        }
    }
}

function submitButton(e) {
    e.preventDefault()

    let city = document.querySelector('#city')
    let state = document.querySelector('#state')
    let image = document.querySelector('#image')
    let favorite = document.querySelector('#favorite-thing')
    let returning = document.querySelectorAll('input[name=return]:checked')

    let bodyObj = {
        city: city.value,
        state: state.value,
        image: image.value,
        favorite: favorite.value,
        returning: returning.value
    }

    createNewEntry(bodyObj)

    city.value = ''
    state.value = ''
    image.value = ''
    favorite.value = ''
    returning.value = false
};

function createNewEntry(location) {
    const locationCard = document.createElement('div')
    locationCard.classList.add('location-card')

    locationCard.innerHTML = `<p class="location-city-state">${location.city}, ${location.state}</p>
    <img alt='location image' src=${location.image} class="location-photo"/>
    <p class="location-favorite-thing">I loved ${location.favorite}</p>
    <p class="location-return">Return Trip? ${location.return}</p>
    <button onclick="deleteCard(${location.id})">Delete</button>
    `

    locationContainer.appendChild(locationCard)
};

function showLocations(arr) {
    locationContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createNewEntry(arr[i])
    }
};

form.addEventListener('submit', submitButton);
form.addEventListener('click', futureTrip);

getAllEntries();