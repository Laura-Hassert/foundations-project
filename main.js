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

const deleteEntry = id => axios.delete(`${baseURL}/${id}`)
    .then(diaryEntries)
    .catch(err => console.log(err))

// const getReturnTrips = () => axios.get(`${baseURL}/return-trips`)
//     .then(diaryEntries)
//     .catch(err => console.log(err))


function submitButton(e) {
    e.preventDefault()

    let city = document.querySelector('#city')
    let state = document.querySelector('#state')
    let image = document.querySelector('#picture')
    let favorite = document.querySelector('#favorite-thing')
    let returning = document.querySelector('input[name="returning"]:checked')

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
    returning.checked = false
};

function createNewEntry(location) {
    const locationEntry = document.createElement('div')
    locationEntry.classList.add('location-card')

    locationEntry.innerHTML = `<p class="location-city-state">${location.city}, ${location.state}</p>
    <img alt='location image' src=${location.image} class="location-photo"/>
    <p class="location-favorite-thing">I loved ${location.favorite}</p>
    <p class="location-return">Return Trip? ${location.returning}</p>
    <button onclick="deleteEntry(${location.id})">Delete</button>
    `

    locationContainer.appendChild(locationEntry)
};

function showLocations(arr) {
    locationContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createNewEntry(arr[i])
    }
};

// function pickNextTrip() {
//     for (let i = 0; i < locations.length; i++) {
//         if(locations.returning.value === "Absolutely!") {
//             let nextTrip = locations
//             console.log(nextTrip)
//         } else {
//             console.log('No entries meet this criteria')
//         }
//     }
// };

form.addEventListener('submit', submitButton);
// document.querySelector('#return-trip-button').addEventListener('click', getReturnTrips);

getAllEntries();