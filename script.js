const movie = {
 ps2: {
      name: "PS-2",
      price: 220,
      seats: {
        rows: 6,
        seatsPerRow: 8,
        booked: [
          [3, 4],
          [6, 7],
          [8, 9]
        ]
      }
    },
    leo: {
      name: "Leo",
      price: 320,
      seats: {
        rows: 6,
        seatsPerRow: 8,
        booked: [
          [0, 1],
          [4, 5],
          [7, 8],
          [15, 16],
          [23, 24]
        ]
      }
    },
    vaathi: {
      name: "Vaathi",
      price: 250,
      seats: {
        rows: 6,
        seatsPerRow: 8,
        booked: [
          [1, 2],
          [6, 7],
          [10, 11]
        ]
      }
    },
    jailer: {
      name: "Jailer",
      price: 260,
      seats: {
        rows: 6,
        seatsPerRow: 8,
        booked: [
          [0, 1],
          [4, 5],
          [7, 8],
          [15, 16],
          [23, 24]
        ]
      }
    }
  };
  const selectedMovie = document.querySelector('#movie').value;
// Create an empty array to store the available seat numbers
let availableSeats = [];
// Loop through the seat numbers and check if they are sold
for (let i = 1; i <= movie.totalSeats; i++) {
  if (!movie.seatSold.includes(i)) {
    // Calculate the row number and seat number
    const rowNum = Math.ceil(i / movie.seatsPerRow);
    const seatNum = i % movie.seatsPerRow || movie.seatsPerRow;
    // Create a string for the seat number
    const seatStr = `${rowNum}-${seatNum}`;
    // Add the available seat number to the array
    availableSeats.push(seatStr);
  }
}
// Update the UI with the available seat numbers
const seatSelect = document.querySelector('#seat-select');
seatSelect.innerHTML = '';
availableSeats.forEach(seat => {
  const option = document.createElement('option');
  option.value = seat;
  option.innerHTML = seat;
  seatSelect.appendChild(option);
});

function bookTicket() {
  alert("your Ticket has been booked ");
}
function reset() {
  alert("your booking has been cancelled ");
}
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populateUI();
let ticketPrice = +movieSelect.value;
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}
// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});
// Initial count and total set
updateSelectedCount();
// Set the time for the countdown
var countDownMinutes = 10;
// Calculate the end time of the countdown
var countDownDate = new Date();
countDownDate.setMinutes(countDownDate.getMinutes() + countDownMinutes);
// Update the count down every 1 second
var x = setInterval(function() {
  // Get the current date and time
  var now = new Date().getTime();  
  // Find the distance between now and the countdown date
  var distance = countDownDate - now;
  // Calculate the minutes and seconds remaining
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);  
  // Output the result in an element with id="countdown"
  document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s "; 
  // If the countdown is finished, clear the interval and display a message
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);

function bookTicket() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat");
    return;
  }
  // book the selected seats
  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.add("booked");
  });
  // update the number of selected seats and total price
  updateSelectedCount();
  // show booking confirmation message
  const totalPrice = selectedSeats.length * ticketPrice;
  const confirmationMessage = `Booking successful! You have booked ${selectedSeats.length} seat(s) for a total price of Rs.${totalPrice}.`;
  alert(confirmationMessage);
}
const genreFilter = document.getElementById("genre");
const genreButtons = genreFilter.querySelectorAll("filter-btn");
const movieCards = document.querySelectorAll(".movie-card");
genreButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const selectedGenre = button.getAttribute("data-genre");
    genreButtons.forEach(function(btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    movieCards.forEach(function(card) {
      const movieGenre = card.getAttribute("data-genre");
      if (selectedGenre === "all" || movieGenre === selectedGenre) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
    function filterMovies() {
      const genreFilter = document.getElementById("genre");
      const selectedGenre = genreFilter.value;
      const movieCards = document.querySelectorAll(".movie-card");
    
      movieCards.forEach(function(card) {
        const movieGenre = card.getAttribute("data-genre");
    
        if (selectedGenre === "all" || movieGenre === selectedGenre) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }); 
    }   });});
// Get the user's search input
const searchInput = document.querySelector('#search-input').value;
// Define an array of movie titles
const movieTitles = ['PS-2', 'Leo', 'Vaathi', 'Jailer'];
// Create an empty array to store the search results
let searchResults = [];
// Loop through the movie titles and check for a match
for (let i = 0; i < movieTitles.length; i++) {
  if (movieTitles[i].toLowerCase().includes(searchInput.toLowerCase())) {
    // Create an HTML element to display the movie title
    const movieTitleElement = document.createElement('div');
    movieTitleElement.innerHTML = movieTitles[i];
    // Append the HTML element to the search results section
    document.querySelector('#search-results').appendChild(movieTitleElement);
    // Add the movie title to the search results array
    searchResults.push(movieTitles[i]);
  }
}
// Display the search results count
const searchCountElement = document.querySelector('#search-count');
searchCountElement.innerHTML = searchResults.length;






