
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },  
];



const movieSelect = document.getElementById("selectMovie");
const seats = document.querySelectorAll("#seatCont .seat");
const continueButton = document.getElementById("proceedBtn");
const cancelButton = document.getElementById("cancelBtn");
const movieNameElement = document.getElementById("movieName");
const moviePriceElement = document.getElementById("moviePrice");
const totalPriceElement = document.getElementById("totalPrice");
const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
const numberOfSeatElement = document.getElementById("numberOfSeat");


let selectedSeats = [];

// Populate dropdown menu with movie options
moviesList.forEach((movie, index) => {
    let option = document.createElement("option");
    option.textContent = movie.movieName;
    option.value = index;
    movieSelect.appendChild(option);
});

// Default movie selection
movieSelect.selectedIndex = 0;
updateMovieInfo();

// Event listener for movie selection
movieSelect.addEventListener("change", function () {
    updateMovieInfo();
});

// Update movie information
function updateMovieInfo() {
    const selectedMovieIndex = movieSelect.selectedIndex;
    movieNameElement.textContent = moviesList[selectedMovieIndex].movieName;
    moviePriceElement.textContent = "$ " + moviesList[selectedMovieIndex].price;
    updateTotalPrice();
}

// Event listeners for unoccupied seats
seats.forEach(seat => {
    if (!seat.classList.contains("occupied")) {
        seat.addEventListener("click", function () {
            if (!seat.classList.contains("selected")) {
                selectedSeats.push(seat);
                seat.classList.add("selected");
            } else {
                selectedSeats = selectedSeats.filter(selectedSeat => selectedSeat !== seat);
                seat.classList.remove("selected");
            }
            updateTotalPrice();
            updateSelectedSeats();
        });
    }
});

// Event listener for continue button
continueButton.addEventListener("click", function () {
    if (selectedSeats.length === 0) {
        alert("Oops no seat Selected");
    } else {
        alert("Yayy! Your Seats have been booked");
        selectedSeats.forEach(selectedSeat => {
            selectedSeat.classList.remove("selected");
            selectedSeat.classList.add("occupied");
        });
        selectedSeats = [];
        updateTotalPrice();
        updateSelectedSeats();
    }
});

// Event listener for cancel button
cancelButton.addEventListener("click", function () {
    selectedSeats.forEach(selectedSeat => {
        selectedSeat.classList.remove("selected");
    });
    selectedSeats = [];
    updateTotalPrice();
    updateSelectedSeats();
});

// Function to update total price based on selected seats
function updateTotalPrice() {
    totalPriceElement.textContent = "$ " + (selectedSeats.length * parseInt(moviePriceElement.textContent.slice(2)));
    numberOfSeatElement.textContent = selectedSeats.length;
}

// Function to update selected seats display
function updateSelectedSeats() {
    selectedSeatsHolder.innerHTML = selectedSeats.length === 0 ? "<span class='noSelected'>No Seat Selected</span>" : selectedSeats.map(seat => "<div class='selectedSeat'>" + seat.dataset.seat + "</div>").join("");
}

