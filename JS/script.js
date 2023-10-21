document.addEventListener("DOMContentLoaded", function() {
    const filmDetails = document.getElementById('film-details');
    const filmMenu = document.getElementById('films');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    // Simulated data from the JSON file
    const films = [
        {
            "id": "1",
            "title": "The Giant Gila Monster",
            "runtime": "108",
            "capacity": 30,
            "showtime": "04:00PM",
            "tickets_sold": 27,
            "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
            "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
        },
        
        
    ];

    // Function to update the movie details
    function updateMovieDetails(movie) {
        filmDetails.innerHTML = `
            <div>
                <img src="${movie.poster}" alt="${movie.title}" style="width: 200px; height: 300px;">
                <h2>${movie.title}</h2>
                <p>Runtime: ${movie.runtime} minutes</p>
                <p>Showtime: ${movie.showtime}</p>
                <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
                <p>Description: ${movie.description}</p>
                <button id="buyTicketBtn">Buy Ticket</button>
            </div>
        `;

        const buyTicketBtn = document.getElementById('buyTicketBtn');
        buyTicketBtn.addEventListener('click', () => {
            buyTicket(movie);
        });
    }

    // Function to update the film menu
    function updateFilmMenu(films) {
        filmMenu.innerHTML = '';
        films.forEach(film => {
            const li = document.createElement('li');
            li.classList.add('film', 'item');
            if (film.capacity === film.tickets_sold) {
                li.classList.add('sold-out');
            }
            li.textContent = film.title;
            li.addEventListener('click', () => {
                updateMovieDetails(film);
            });
            filmMenu.appendChild(li);
        });
    }

    // Function to handle ticket purchase
    function buyTicket(movie) {
        if (movie.capacity > movie.tickets_sold) {
            movie.tickets_sold++;
            updateMovieDetails(movie);
            // Simulating server update
            console.log(`Ticket bought for ${movie.title}`);
            if (movie.capacity === movie.tickets_sold) {
                const filmItems = filmMenu.getElementsByTagName('li');
                for (let item of filmItems) {
                    if (item.textContent === movie.title) {
                        item.classList.add('sold-out');
                    }
                }
            }
            displayModal();
        } else {
            alert('Sorry, the show is sold out!');
        }
    }

    // Function to display modal after purchasing a ticket
    function displayModal() {
        modal.style.display = 'block';
    }

    // Close modal on click
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Initialize the application
    updateMovieDetails(films[0]);
    updateFilmMenu(films);
});
