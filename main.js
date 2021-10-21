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


// function dragover(event) {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   }
  
//   function dragstart(event) {
//     event.dataTransfer.setData('location-pin-1', event.target.id);
//     event.dataTransfer.effectAllowed = 'move';
//   }
  
//   function drop(event) {
//     event.preventDefault();
//     let data = event.dataTransfer.getData('location-pin-1');
//     event.target.appendChild(document.getElementById(data));
//   }



  document.addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("location-pin-1", event.target.id);
    document.getElementById("location-pin-1").innerHTML = "Started to drag the pin.";
  });
  
//   // While dragging the p element, change the color of the output text
  document.ad 
  
  // Output some text when finished dragging the p element and reset the opacity
  document.addEventListener("dragend", function(event) {
    document.getElementById("location-pin-1").innerHTML = "Finished dragging the pin.";
  });
  
  /* Events fired on the drop target */
  
  // When the draggable p element enters the droptarget, change the DIVS's border style
  document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "map" ) {
      event.target.style.border = "3px dotted red";
    }
  });
  
  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
  
  // When the draggable p element leaves the droptarget, reset the DIVS's border style
  document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "map" ) {
    //   event.target.style.border = "";
    }
  });
  
  /* On drop - Prevent the browser default handling of the data (default is open as link on drop)
     Reset the color of the output text and DIV's border color
     Get the dragged data with the dataTransfer.getData() method
     The dragged data is the id of the dragged element ("drag1")
     Append the dragged element into the drop element
  */
  document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "map" ) {
      document.getElementById("location-pin-1").style.color = "";
      event.target.style.border = "";
      var data = event.dataTransfer.getData("location-pin-1");
      event.target.appendChild(document.getElementById(data));
    }
  });