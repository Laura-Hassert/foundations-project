const locationContainer = document.querySelector('#location-container');
const form = document.querySelector('form');

const baseURL = 'https://travel-diary-lh.herokuapp.com/diary'

const diaryEntries = (locations) => showLocations(locations)

const getAllEntries = () => axios.get(baseURL)
    .then((res) => {diaryEntries(res.data)})
    .catch(err => console.log(err))

const addEntry = body => axios.post(baseURL, body)
    .then((res) => {diaryEntries(res.data)})
    .catch(err => console.log(err))

const deleteEntry = id => axios.delete(`${baseURL}/${id}`)
    .then((res) => {diaryEntries(res.data)})
    .catch(err => console.log(err))

// const getReturnTrip = () => axios.get(`${baseURL}/return-trip`)
//     .then((res) => {diaryEntries(res.data)})
//     .catch(err => console.log(err))

const getMap = () => axios.get(baseURL)
    .then(initMap())
    .catch(err => console.log(err))


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

// function pickNextTrip(e) {
//     e.preventDefault()

//     parent.open(random)
// };

form.addEventListener('submit', submitButton);

// let nextTripButton = document.getElementById('#return-trip-button')
// nextTripButton.addEventListener('click', getReturnTrips);

getAllEntries();

function initMap() {
    const center = { lat: 39.8283, lng: 98.5795 };  
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 10,
        center: center,
      }
    );
    const sanDiego = { lat: 32.7157, lng: 117.1611 }; 
    const NewOrleans = { lat: 29.9511, lng: 90.0715 }; 
    const NewYork = { lat: 40.7128, lng: 74.0060 }; 
    
    const marker1 = new google.maps.Marker({
      position: sanDiego,
      map: map,
    });

    const marker2 = new google.maps.Marker({
        position: NewOrleans,
        map: map,
    });

    const marker3 = new google.maps.Marker({
        position: NewYork,
        map: map,
    });
};