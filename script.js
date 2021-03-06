const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; //*adding + (or add parseInt. in front will change the value to number from string *//

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelecedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into an array
  // Map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //* ... inside an array is a spread operator, which copy elements in an array, in this case, everything in selectedSeats from line 11 into this array; seatsIndex is an array

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //* localStorage is built into the browser; .setItem takes key-value pair. seatsIndex is an array so we need to wrap seatsIndex with JSON.stringify

  const selectedSeatsCount = selectedSeats.length;  //* get number of elements in an array or nodeList *//
  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));  //*JSON.parse will change string back to array (just the opposite of JSON.stringify)

  if(selectedSeats !== null && selectedSeats.length > 0) { //*check to see if there are any selected seats stored in local storage
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) { //*if this is > -1, then it means the seats are there
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex !==null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie Select Event
movieSelect.addEventListener('change', evt => {   //* because it is from a select list, you don't want click event *//
  ticketPrice = +evt.target.value; //* the + sign change value from string to a number
  setMovieData(evt.target.selectedIndex, evt.target.value);
  updateSelecedCount();
}); 

// Seat Click Event
container.addEventListener('click', (evt) => { //* evt.target gives you the exact element you click on *//
  if(evt.target.classList.contains('seat') && !evt.target.classList.contains('occupied')) {  //* evt.target.classList -> check the class; .contains will look into the classList
    evt.target.classList.toggle('selected'); //*toggle between 'seat' and 'selected'

    updateSelecedCount();
  }
});

// Initial count and total set
updateSelecedCount();