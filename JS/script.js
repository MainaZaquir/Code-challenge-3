document.addEventListener("DOMContentLoaded", function() {
    const filmDetails = document.getElementById('film-details');
    const filmMenu = document.getElementById('films');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    // Fetching data from the server
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(data => {
        updateMovieDetails(data[0]);
        updateFilmMenu(data);
    });

    // Function to update movie details
    function updateMovieDetails(movie) {
        filmDetails.innerHTML = `
            <div>
                <img src="${movie.poster}" alt="${movie.title}" style="width: 300px; height: 400px;">
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
        event.preventDefault();
        if (movie.capacity > movie.tickets_sold) {
            movie.tickets_sold++;
            updateMovieDetails(movie);
           
            console.log(`Bought a ticket for ${movie.title}`);
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
            alert('Sorry, this show is currently sold out! Try another.');
        }
    }

    // Function to display the modal after purchasing a ticket
    function displayModal() {
        modal.style.display = 'block';
    }

    // Closing the modal on click
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
});

