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


function submitButton(e) {
    e.preventDefault()

    // let id = { id }
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

    // createNewEntry(bodyObj)
    addEntry(bodyObj)

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


// document.querySelector("#add-trip").addEventListener("submit", addTrip);
// const message = document.querySelector('#message')

// function addTrip(event) {
//   event.preventDefault();
//   let inputField = document.querySelector('input')

//   const nextTrip = document.createElement('li')

//   const cityState = document.createElement("span");
//   cityState.textContent = inputField.value;
//   nextTrip.appendChild(cityState)

//   const deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "Remove";
//   deleteBtn.addEventListener("click", deleteTrip);

//   const tripId = inputField.value.replace(/\s+/g, '');
//   deleteBtn.setAttribute('id', tripId);
//   nextTrip.appendChild(deleteBtn);

//   const list = document.querySelector("ul");
//   list.appendChild(nextTrip);

//   inputField.value = ''
// }

// function deleteTrip(event) {
//     event.target.parentNode.remove();
// }
