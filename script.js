const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value; //*adding + (or add parseInt. in front will change the value to number from string *//

// Update total and count
function updateSelecedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  const selectedSeatsCount = selectedSeats.length;  //* get number of elements in an array or nodeList *//
  
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Movie Select Event
movieSelect.addEventListener('change', evt => {   //* because it is from a select list, you don't want click event *//
  ticketPrice = +evt.target.value;
  updateSelecedCount();
}); 

// Seat Click Event
container.addEventListener('click', (evt) => { //* evt.target gives you the exact element you click on *//
  if(evt.target.classList.contains('seat') && !evt.target.classList.contains('occupied')) {  //* evt.target.classList -> check the class; .contains will look into the classList
    evt.target.classList.toggle('selected'); //*toggle between 'seat' and 'selected'

    updateSelecedCount();
  }
});
